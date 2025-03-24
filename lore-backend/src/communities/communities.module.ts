import { Module } from "@nestjs/common";
import { CommunitiesService } from "./communities.service";
import { CommunitiesController } from "./communities.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Community } from "./entities/community.entity";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Community, User]),
        UsersModule
    ],
    controllers: [CommunitiesController],
    providers: [CommunitiesService]
})
export class CommunitiesModule {
}
