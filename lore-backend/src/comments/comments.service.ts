import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { User } from "../users/entities/user.entity";
import { Post } from "../posts/entities/post.entity";
import { Vote, VoteType } from "../votes/entities/vote.entity";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>
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

    async findOne(id: string) {
        const { entities, raw } = await this.commentsRepository
            .createQueryBuilder("comment")
            .innerJoinAndSelect("comment.post", "post")
            .innerJoinAndSelect("comment.author", "author")
            .addSelect(qb => {
                return qb
                    .select("coalesce(sum(vote.value), 0)")
                    .from(Vote, "vote")
                    .where("vote.targetId = comment.id")
                    .andWhere("vote.targetType = :voteType", { voteType: VoteType.Comment });
            }, "score")
            .loadRelationIdAndMap("commentIds", "comment.children",
                "comment",
                qb => {
                    return qb.orderBy("comment.createdAt", "DESC");
                }
            )
            .where("comment.id = :id", { id })
            .getRawAndEntities();

        if (entities.length === 0) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        const comment = entities[0];
        comment.score = parseInt(raw[0].score);
        return comment;
    }

    async update(id: string, updateCommentDto: UpdateCommentDto) {
        await this.commentsRepository.update(id, updateCommentDto);
        return this.findOne(id);
    }

    remove(id: string) {
        return this.commentsRepository.delete(id);
    }
}
