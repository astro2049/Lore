import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Payload } from "../common/decorators/payload.decorator";
import { UserByTokenPipe } from "../common/pipes/user-by-token.pipe";
import { User } from "./entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { UsersService } from "./users.service";

@Controller("feed")
export class FeedController {
    constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(AuthGuard)
    @Get()
    findOne(@Param("page") page: number, @Payload(UserByTokenPipe) user: User) {
        return this.usersService.getFeed(user, page);
    }
}
