import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Community } from "../../communities/entities/community.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Vote } from "../../votes/entities/vote.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true,
        length: 31,
        collation: "utf8mb4_0900_as_cs"
    })
    username: string;

    @Column({
        collation: "utf8mb4_0900_as_cs",
        select: false
    })
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
