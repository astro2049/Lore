import { VoteType } from "../entities/vote.entity";

export class VoteDto {
    targetId: string;
    targetType: VoteType;
    value: number;
}
