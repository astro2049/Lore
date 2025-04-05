import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vote } from "./entities/vote.entity";
import { Repository } from "typeorm";
import { VoteDto } from "./dto/vote.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class VotesService {
    constructor(
        @InjectRepository(Vote)
        private voteRepository: Repository<Vote>
    ) {
    }

    async vote(voteDto: VoteDto, user: User) {
        // Ensure value is valid (only +1 or -1)
        if (![1, -1].includes(voteDto.value)) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }

        // Find if an existing vote exists
        let vote = await this.voteRepository.findOneBy({
            targetId: voteDto.targetId,
            targetType: voteDto.targetType,
            user: user
        });

        // If vote exists, remove the vote (yep)
        if (vote) {
            return this.voteRepository.remove(vote);
        }

        // Otherwise, create a new vote
        vote = this.voteRepository.create({
            targetId: voteDto.targetId,
            targetType: voteDto.targetType,
            value: voteDto.value,
            user: user
        });
        return this.voteRepository.save(vote);
    }
}
