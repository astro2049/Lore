import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { User } from "../users/entities/user.entity";
import { Community } from "../communities/entities/community.entity";
import { Vote, VoteType } from "../votes/entities/vote.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) {
    }

    create(createPostDto: CreatePostDto, community: Community, author: User) {
        const post = this.postsRepository.create({
            title: createPostDto.title,
            content: createPostDto.content,
            community: community,
            author: author
        });
        return this.postsRepository.save(post);
    }

    async findOne(id: string) {
        const { entities, raw } = await this.postsRepository
            .createQueryBuilder("post")
            .innerJoinAndSelect("post.author", "author")
            .innerJoinAndSelect("post.community", "community")
            .addSelect(qb => {
                return qb
                    .select("coalesce(sum(vote.value), 0)")
                    .from(Vote, "vote")
                    .where("vote.targetId = post.id")
                    .andWhere("vote.targetType = :voteType", { voteType: VoteType.Post });
            }, "score")
            .loadRelationIdAndMap("post.commentIds", "post.comments", "comment",
                qb => {
                    return qb
                        .where("comment.parentId IS NULL").orderBy("comment.createdAt", "DESC");
                }
            )
            .loadRelationCountAndMap("post.commentCount", "post.comments")
            .where("post.id = :id", { id })
            .getRawAndEntities();

        if (entities.length === 0) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }
        const post = entities[0];
        post.score = parseInt(raw[0].score);
        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto) {
        await this.postsRepository.update(id, updatePostDto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const result = await this.postsRepository.delete(id);
        if (result.affected === 0) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return result;
    }

    findComments(id: string) {
        return this.postsRepository
            .createQueryBuilder()
            .relation(Post, "comments")
            .of(id)
            .loadMany();
    }
}
