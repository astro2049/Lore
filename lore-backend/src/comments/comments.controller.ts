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
    HttpStatus
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PostsService } from "../posts/posts.service";
import { Payload } from "../common/decorators/payload.decorator";
import { UserByTokenPipe } from "../common/pipes/user-by-token.pipe";
import { User } from "../users/entities/user.entity";
import { AuthGuard } from "../auth/auth.guard";
import { Comment } from "./entities/comment.entity";
import { Post as PostEntity } from "../posts/entities/post.entity";
import { OptionalAuthGuard } from "../auth/auth.optional-guard";

@Controller("comments")
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly postsService: PostsService
    ) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        // Takes in either a post id or a parent comment id
        @Body() createCommentDto: CreateCommentDto,
        @Payload(UserByTokenPipe) user: User
    ) {
        if ((createCommentDto.postId && createCommentDto.parentId) || (!createCommentDto.postId && !createCommentDto.parentId)) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }
        let parentProperties: { post: PostEntity, parent?: Comment };
        if (createCommentDto.parentId) {
            const comment = await this.commentsService.findOne(createCommentDto.parentId);
            if (!comment) {
                throw new HttpException("", HttpStatus.NOT_FOUND);
            }
            parentProperties = {
                post: comment.post,
                parent: comment
            };
        } else {
            const post = await this.postsService.findOne(createCommentDto.postId!);
            if (!post) {
                throw new HttpException("", HttpStatus.NOT_FOUND);
            }
            parentProperties = {
                post: post
            };
        }
        return this.commentsService.create(createCommentDto.content, parentProperties, user);
    }

    // Get a single comment by ID
    @UseGuards(OptionalAuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string, @Payload(UserByTokenPipe) user?: User) {
        return this.commentsService.findOne(id, user);
    }

    // Update a comment (only by the original author)
    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    //     return this.commentsService.update(id, updateCommentDto);
    // }

    // Delete a comment
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.commentsService.remove(id);
    }
}
