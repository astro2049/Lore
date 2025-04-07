import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { User } from "../users/entities/user.entity";
import { Community } from "../communities/entities/community.entity";
import { VotesService } from "../votes/votes.service";
import { VoteType } from "../votes/entities/vote.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        private readonly votesService: VotesService
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

    async findOne(id: string, commentIds?: boolean, user?: User) {
        let query = this.postsRepository
            .createQueryBuilder("post")
            .innerJoinAndSelect("post.author", "author")
            .innerJoinAndSelect("post.community", "community")
            .loadRelationCountAndMap("post.commentCount", "post.comments");
        if (commentIds) {
            query = query.loadRelationIdAndMap("post.commentIds", "post.comments", "comment",
                qb => {
                    return qb
                        .where("comment.parentId IS NULL").orderBy("comment.createdAt", "DESC");
                }
            );
        }
        const post = await query
            .where("post.id = :id", { id })
            .getOne();

        if (!post) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }
        post.score = await this.votesService.getVotes(id, VoteType.Post);
        if (user) {
            post.vote = await this.votesService.getUserVote(id, VoteType.Post, user);
        }
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
