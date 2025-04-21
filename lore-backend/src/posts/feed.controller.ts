import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { Payload } from "../common/decorators/payload.decorator";
import { UserByTokenPipe } from "../common/pipes/user-by-token.pipe";
import { User } from "../users/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { PostsService } from "./posts.service";

@Controller("feed")
export class FeedController {
    constructor(private readonly postsService: PostsService) {
    }

    @UseGuards(AuthGuard)
    @Get()
    findOne(@Query("page") page: number,
            @Query("before") beforeStr: string,
            @Payload(UserByTokenPipe) user: User
    ) {
        return this.postsService.getFeed(user, page, new Date(beforeStr));
    }
}
