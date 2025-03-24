import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    HttpException,
    HttpStatus,
    UseGuards
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { OptionalAuthGuard } from "../auth/auth.optional-guard";
import { ParsePresencePipe } from "../common/pipes/parse-presence.pipe";
import { UserByTokenPipe } from "../common/pipes/user-by-token.pipe";
import { User } from "./entities/user.entity";
import { Payload } from "../common/decorators/payload.decorator";
import { UserByUsernamePipe } from "../common/pipes/user-by-username.pipe";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(OptionalAuthGuard)
    @Get(":username")
    findOne(@Param("username", UserByUsernamePipe) user: User, @Payload(UserByTokenPipe) loggedInUser: User, @Query("communities", ParsePresencePipe) communities?: boolean) {
        if (communities && user.username !== loggedInUser.username) {
            throw new HttpException("", HttpStatus.FORBIDDEN);
        }
        return this.usersService.findOne(user.username, communities ? ["communities"] : undefined);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usersService.remove(id);
    }
}
