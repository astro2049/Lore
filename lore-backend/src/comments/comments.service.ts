import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>
    ) {
    }

    create(createCommentDto: CreateCommentDto) {
        const comment = this.commentsRepository.create(createCommentDto);
        return this.commentsRepository.save(comment);
    }

    async findOne(id: string) {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ["author", "children", "parent"]
        });
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
