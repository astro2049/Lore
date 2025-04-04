import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FeedController } from "./feed.controller";
import { Post } from "../posts/entities/post.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Post])
    ],
    controllers: [UsersController, FeedController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
