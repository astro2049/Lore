import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectDataSource()
        private readonly dataSource: DataSource
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

    async remove(user: User) {
        await this.dataSource.transaction(async (manager) => {
            // Leave all joined communities
            await manager
                .createQueryBuilder()
                .delete()
                .from("communities_users")
                .where("userId = :userId", { userId: user.id })
                .execute();

            // Delete user; set post/comment/community FKs to NULL and remove votes
            await manager.delete(User, user.id);
        });
    }
}
