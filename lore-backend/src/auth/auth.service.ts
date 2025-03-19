import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async signIn(username: string, password: string) {
        const user = await this.usersService.findOne(username);
        console.log(user);
        if (!user || password !== user.password) {
            throw new HttpException("", HttpStatus.UNAUTHORIZED);
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
