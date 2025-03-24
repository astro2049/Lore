import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class UserByUsernamePipe implements PipeTransform {
    constructor(private readonly usersService: UsersService) {
    }

    async transform(username: string, metadata: ArgumentMetadata) {
        return this.usersService.findOne(username);
    }
}
