import { Module } from "@nestjs/common";
import { CommunitiesService } from "./communities.service";
import { CommunitiesController } from "./communities.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Community } from "./entities/community.entity";
import { UsersModule } from "../users/users.module";
import { Post } from "../posts/entities/post.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Community, Post]),
        UsersModule
    ],
    controllers: [CommunitiesController],
    providers: [CommunitiesService],
    exports: [CommunitiesService]
})
export class CommunitiesModule {
}
