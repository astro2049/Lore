import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpException,
    HttpStatus, Query
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Payload } from "../common/decorators/payload.decorator";
import { UserByTokenPipe } from "../common/pipes/user-by-token.pipe";
import { User } from "../users/entities/user.entity";
import { CommunitiesService } from "../communities/communities.service";
import { ParsePresencePipe } from "../common/pipes/parse-presence.pipe";

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService, private readonly communitiesService: CommunitiesService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createPostDto: CreatePostDto, @Payload(UserByTokenPipe) user: User) {
        const community = await this.communitiesService.findOne(createPostDto.communityName);
        if (!community) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return this.postsService.create(createPostDto, community, user);
    }

    @Get(":id")
    findOne(@Param("id") id: string, @Query("commentIds", ParsePresencePipe) commentIds?: boolean) {
        return this.postsService.findOne(id, commentIds);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(id, updatePostDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.postsService.remove(id);
    }

    @Get(":id/comments")
    findComments(@Param("id") id: string) {
        return this.postsService.findComments(id);
    }
}
