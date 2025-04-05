import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { CommunitiesModule } from "./communities/communities.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { VotesModule } from './votes/votes.module';
import * as process from "node:process";

@Module({
    imports: [
        UsersModule,
        CommunitiesModule,
        PostsModule,
        CommentsModule,
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true
        }),
        AuthModule,
        VotesModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
