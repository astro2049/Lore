import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class UserByUsernamePipe implements PipeTransform {
    constructor(private readonly usersService: UsersService) {
    }

    async transform(username: string, metadata: ArgumentMetadata) {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return user;
    }
}
