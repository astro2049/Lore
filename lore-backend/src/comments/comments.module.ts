import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { PostsModule } from "../posts/posts.module";
import { UsersModule } from "../users/users.module";
import { VotesModule } from "../votes/votes.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        PostsModule,
        UsersModule,
        VotesModule
    ],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {
}
