import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";

export enum VoteType {
    Post = "post",
    Comment = "comment",
}

@Entity("votes")
export class Vote {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    targetId: string;

    @Column({ type: "enum", enum: VoteType })
    targetType: VoteType;

    // 1 for upvote, -1 for downvote
    @Column()
    value: number;

    @ManyToOne(() => User, (user) => user.votes, { onDelete: "CASCADE" })
    user: User;
}
