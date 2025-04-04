import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { Post } from "../posts/entities/post.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) {
    }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    findOne(username: string, relations?: string[]): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { username: username },
            relations: relations
        });
    }

    remove(id: string): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }

    getFeed(user: User, page = 0) {
        return this.postsRepository
            .createQueryBuilder("post")
            .innerJoinAndSelect("post.community", "community")
            .innerJoin("community.members", "member", "member.id = :userId", { userId: user.id })
            .loadRelationCountAndMap("post.commentCount", "post.comments")
            .innerJoinAndSelect("post.author", "author")
            .orderBy("post.createdAt", "DESC")
            .skip(page * 10)
            .take(10)
            .getMany();
    }
}
