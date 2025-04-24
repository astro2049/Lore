import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Community } from "../../communities/entities/community.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    /* Relationships */
    @ManyToOne(() => User, (user) => user.posts, {
        eager: true,
        onDelete: "SET NULL",
        nullable: true
    })
    author: User | null;

    @ManyToOne(() => Community, (community) => community.posts, { eager: true, onDelete: "CASCADE" })
    community: Community;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    /* Computed Properties */
    // vote score
    score?: number;

    // user's vote
    vote?: number;

    // comment ids
    commentIds?: string[];
}
