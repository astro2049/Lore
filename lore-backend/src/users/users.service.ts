import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { Post } from "../posts/entities/post.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        let user = await this.findOne(createUserDto.username);
        if (user) {
            throw new HttpException("", HttpStatus.FORBIDDEN);
        }
        user = this.usersRepository.create(createUserDto);

        // Hash the password
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;

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

    async getFeed(user: User, page = 0) {
        const posts = await this.postsRepository
            .createQueryBuilder("post")
            .select("post.id as id")
            .innerJoin("post.community", "community")
            .innerJoin("community.members", "member", "member.id = :userId", { userId: user.id })
            .orderBy("post.createdAt", "DESC")
            .skip(page * 10)
            .take(10)
            .getRawMany();

        return posts.map(post => post.id);
    }
}
