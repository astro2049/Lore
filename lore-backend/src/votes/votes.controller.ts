import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, Get, Query } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { AuthGuard } from "../auth/auth.guard";
import { VoteDto } from "./dto/vote.dto";
import { Payload } from "../common/decorators/payload.decorator";
import { User } from "../users/entities/user.entity";
import { UserByTokenPipe } from "../common/pipes/user-by-token.pipe";
import { VoteType } from "./entities/vote.entity";

@Controller("votes")
export class VotesController {
    constructor(private readonly votesService: VotesService) {
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post()
    vote(@Body() voteDto: VoteDto, @Payload(UserByTokenPipe) user: User) {
        return this.votesService.vote(voteDto, user);
    }

    // For testing purposes only
    @UseGuards(AuthGuard)
    @Get()
    async getVotes(@Query("targetId") targetId: string, @Query("targetType") targetType: VoteType, @Payload(UserByTokenPipe) user: User) {
        return {
            score: await this.votesService.getVotes(targetId, targetType),
            vote: this.votesService.getUserVote(targetId, targetType, user)
        };
    }
}
