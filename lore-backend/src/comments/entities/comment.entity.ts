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
import { Post } from "../../posts/entities/post.entity";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    /* Relationships */
    @ManyToOne(() => User, (user) => user.comments, { eager: true })
    author: User;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
    post: Post;

    // Threaded comments
    @ManyToOne(() => Comment, (comment) => comment.children, { nullable: true, onDelete: "CASCADE" })
    parent: Comment;

    @OneToMany(() => Comment, (comment) => comment.parent)
    children: Comment[];

    /* Computed Properties */
    // vote score
    score?: number;

    // user's vote
    vote?: number;
}
