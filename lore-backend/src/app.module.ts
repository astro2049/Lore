import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { CommunitiesModule } from "./communities/communities.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";

@Module({
    imports: [UsersModule, CommunitiesModule, PostsModule, CommentsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
