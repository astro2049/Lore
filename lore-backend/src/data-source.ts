import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./users/entities/user.entity";
import { Community } from "./communities/entities/community.entity";
import { Post } from "./posts/entities/post.entity";
import { Comment } from "./comments/entities/comment.entity";
import { Vote } from "./votes/entities/vote.entity";

export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User, Community, Post, Comment, Vote
    ],
    migrations: [
        "src/migrations/*{.ts,.js}"
    ]
});
