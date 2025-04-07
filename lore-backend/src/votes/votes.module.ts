import { Module } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { VotesController } from "./votes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vote } from "./entities/vote.entity";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote]),
        UsersModule
    ],
    controllers: [VotesController],
    providers: [VotesService],
    exports: [VotesService]
})
export class VotesModule {
}
