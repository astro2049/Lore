import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { AuthGuard } from "../auth/auth.guard";
import { VoteDto } from "./dto/vote.dto";
import { Payload } from "../common/decorators/payload.decorator";
import { UserByUsernamePipe } from "../common/pipes/user-by-username.pipe";
import { User } from "../users/entities/user.entity";

@Controller("votes")
export class VotesController {
    constructor(private readonly votesService: VotesService) {
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post()
    vote(@Body() voteDto: VoteDto, @Payload(UserByUsernamePipe) user: User) {
        return this.votesService.vote(voteDto, user);
    }
}
