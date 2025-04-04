import {
    Column,
    CreateDateColumn, Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Post } from "../../posts/entities/post.entity";

@Entity()
export class Community {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    /* Relationships */
    @ManyToMany(() => User, (user) => user.communities)
    @JoinTable({ name: "community_members" })
    members: User[];

    @OneToMany(() => Post, (post) => post.community)
    posts: Post[];

    @ManyToOne(() => User, { eager: true })
    creator: User;
}
