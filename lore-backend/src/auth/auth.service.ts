import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import * as process from "node:process";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {
    }

    async signIn(username: string, password: string, response: Response) {
        const user = await this.usersRepository.findOne({
            where: {
                username: username
            },
            select: ["username", "password"]
        });
        if (process.env.NODE_ENV === "development") {
            console.log(user);
        }
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new HttpException("", HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: user.id, username: user.username };
        const accessToken = await this.jwtService.signAsync(payload);
        response.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
    }

    logOut(response: Response) {
        response.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
    }
}
