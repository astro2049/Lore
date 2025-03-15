import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity";
import { Community } from "../../communities/entities/community.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
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
    @JoinTable()
    communities: Community[];

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];
}
