import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { User } from "../users/entities/user.entity";
import { Post } from "../posts/entities/post.entity";

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
        const comment = await this.commentsRepository
            .createQueryBuilder("comment")
            .leftJoinAndSelect("comment.post", "post")
            .leftJoinAndSelect("comment.author", "author")
            .loadRelationIdAndMap("commentIds", "comment.children",
                "comment",
                qb => qb
                    .orderBy("comment.createdAt", "DESC")
            )
            .where("comment.id = :id", { id })
            .getOne();
        if (!comment) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
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
