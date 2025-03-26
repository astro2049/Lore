import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { User } from "../users/entities/user.entity";
import { Community } from "../communities/entities/community.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) {
    }

    create(createPostDto: CreatePostDto, community: Community, author: User) {
        const post = this.postsRepository.create({
            title: createPostDto.title,
            content: createPostDto.content,
            community: community,
            author: author
        });
        return this.postsRepository.save(post);
    }

    async findOne(id: string) {
        const post = await this.postsRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.community", "community")
            .loadRelationIdAndMap("post.commentIds", "post.comments",
                "comment",
                qb => qb
                    .where("comment.parentId is null")
                    .orderBy("comment.createdAt", "DESC")
            )
            .where("post.id = :id", { id })
            .getOne();
        if (!post) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto) {
        await this.postsRepository.update(id, updatePostDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const result = await this.postsRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return result;
    }

    findComments(id: string) {
        return this.postsRepository
            .createQueryBuilder()
            .relation(Post, "comments")
            .of(id)
            .loadMany();
    }
}
