import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) {
    }

    async create(createPostDto: CreatePostDto) {
        const post = this.postsRepository.create(createPostDto);
        return await this.postsRepository.save(post);
    }

    async findOne(id: string) {
        const post = await this.postsRepository.findOne({
            where: { id },
            relations: ["author", "community", "comments"]
        });
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
