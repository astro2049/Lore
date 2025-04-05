import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Community } from "../../communities/entities/community.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Vote } from "../../votes/entities/vote.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    /* Relationships */
    @ManyToMany(() => Community, (community) => community.members)
    communities: Community[];

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];

    @OneToMany(() => Vote, (vote) => vote.user)
    votes: Vote[];
}
