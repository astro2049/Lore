import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { CommunitiesModule } from "../communities/communities.module";
import { UsersModule } from "../users/users.module";
import { VotesModule } from "../votes/votes.module";
import { Comment } from "../comments/entities/comment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, Comment]),
        UsersModule,
        CommunitiesModule,
        VotesModule
    ],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule {
}
