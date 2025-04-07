import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Vote, VoteType } from "./entities/vote.entity";
import { Repository } from "typeorm";
import { VoteDto } from "./dto/vote.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class VotesService {
    constructor(
        @InjectRepository(Vote)
        private votesRepository: Repository<Vote>
    ) {
    }

    async vote(voteDto: VoteDto, user: User) {
        // Ensure value is valid (only +1 or -1)
        if (![1, -1].includes(voteDto.value)) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }

        // Find if an existing vote exists
        let vote = await this.votesRepository.findOneBy({
            targetId: voteDto.targetId,
            targetType: voteDto.targetType,
            user: { id: user.id }
        });

        // If vote exists, remove the vote (yep)
        if (vote) {
            return this.votesRepository.remove(vote);
        }

        // Otherwise, create a new vote
        vote = this.votesRepository.create({
            targetId: voteDto.targetId,
            targetType: voteDto.targetType,
            value: voteDto.value,
            user: user
        });
        return this.votesRepository.save(vote);
    }

    async getVotes(targetId: string, targetType: VoteType) {
        const raw = await this.votesRepository
            .createQueryBuilder("vote")
            .select("coalesce(sum(vote.value), 0)", "score")
            .where("vote.targetId = :targetId", { targetId: targetId })
            .andWhere("vote.targetType = :targetType", { targetType: targetType })
            .getRawOne();

        return parseInt(raw.score);
    }

    async getUserVote(targetId: string, targetType: VoteType, user: User) {
        const raw = await this.votesRepository
            .createQueryBuilder("vote")
            .select("vote.value", "vote")
            .where("vote.targetId = :targetId", { targetId: targetId })
            .andWhere("vote.targetType = :targetType", { targetType: targetType })
            .andWhere("vote.userId = :userId", { userId: user.id })
            .getRawOne();

        return raw ? parseInt(raw.vote) : 0;
    }
}
