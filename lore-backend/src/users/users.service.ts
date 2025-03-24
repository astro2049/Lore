import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
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
}
