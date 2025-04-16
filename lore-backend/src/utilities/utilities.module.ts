import { Module } from "@nestjs/common";
import { UtilitiesController } from "./utilities.controller";
import { UsersModule } from "../users/users.module";
import { CommunitiesModule } from "../communities/communities.module";

@Module({
    imports: [
        UsersModule,
        CommunitiesModule
    ],
    controllers: [UtilitiesController]
})
export class UtilitiesModule {
}
