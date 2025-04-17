import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { User } from "../users/entities/user.entity";
import { Post } from "../posts/entities/post.entity";
import { VotesService } from "../votes/votes.service";
import { VoteType } from "../votes/entities/vote.entity";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
        private readonly votesService: VotesService
    ) {
    }

    create(content: string, parentProperty: { post?: Post, parent?: Comment }, author: User) {
        const comment = this.commentsRepository.create({
            content: content,
            author: author,
            ...parentProperty
        });
        return this.commentsRepository.save(comment);
    }

    async findOne(id: string, user?: User) {
        const comment = await this.commentsRepository
            .createQueryBuilder("comment")
            .innerJoinAndSelect("comment.post", "post")
            .innerJoinAndSelect("comment.author", "author")
            .loadRelationIdAndMap("commentIds", "comment.children",
                "comment",
                qb => {
                    return qb.orderBy("comment.createdAt", "DESC");
                }
            )
            .where("comment.id = :id", { id })
            .getOne();

        if (!comment) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        comment.score = await this.votesService.getVotes(id, VoteType.Comment);
        if (user) {
            comment.vote = await this.votesService.getUserVote(id, VoteType.Comment, user);
        }
        return comment;
    }

    async update(id: string, updateCommentDto: UpdateCommentDto) {
        await this.commentsRepository.update(id, updateCommentDto);
        return this.findOne(id);
    }

    async remove(id: string, user: User) {
        const comment = await this.commentsRepository.findOneBy({
            id: id
        });
        if (!comment) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        if (comment.author.username !== user.username) {
            throw new HttpException("", HttpStatus.FORBIDDEN);
        }
        return this.commentsRepository.delete(id);
    }
}
