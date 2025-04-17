import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {
    }

    async signIn(username: string, password: string) {
        const user = await this.usersRepository.findOne({
            where: {
                username: username
            },
            select: ["username", "password"]
        });
        console.log(user);
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new HttpException("", HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: user.id, username: user.username };
        return this.jwtService.signAsync(payload);
    }
}
