import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { Payload } from "../../auth/auth.guard";

@Injectable()
export class UserByTokenPipe implements PipeTransform {
    constructor(private readonly usersService: UsersService) {
    }

    async transform(payload: Payload, metadata: ArgumentMetadata) {
        if (!payload) {
            return undefined;
        }
        const user = await this.usersService.findOne(payload.username);
        if (!user) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
