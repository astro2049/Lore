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
import { Comment } from "../comments/entities/comment.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        private readonly votesService: VotesService,
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>
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
        const post = await this.postsRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .innerJoinAndSelect("post.community", "community")
            .loadRelationCountAndMap("post.commentCount", "post.comments")
            .where("post.id = :id", { id })
            .getOne();

        if (!post) {
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }
        post.score = await this.votesService.getVotes(id, VoteType.Post);
        if (user) {
            post.vote = await this.votesService.getUserVote(id, VoteType.Post, user);
        }
        if (commentIds) {
            post.commentIds = await this.findComments(id);
        }
        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto) {
        await this.postsRepository.update(id, updatePostDto);
        return this.findOne(id);
    }

    async remove(id: string, user: User) {
        const post = await this.postsRepository.findOneBy({
            id: id
        });
        if (!post) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        if (!post.author || post.author.username !== user.username) {
            throw new HttpException("", HttpStatus.FORBIDDEN);
        }
        return this.postsRepository.delete(id);
    }

    async findComments(id: string) {
        const raw = await this.commentsRepository
            .createQueryBuilder("comment")
            .select("comment.id", "id")
            .where("comment.postId = :id", { id: id })
            .andWhere("comment.parentId is null")
            .orderBy("comment.createdAt", "DESC")
            .getRawMany();

        return raw.map(comment => comment.id);
    }

    async getFeed(user: User, page = 0, before: Date) {
        const posts = await this.postsRepository
            .createQueryBuilder("post")
            .select("post.id as id")
            .innerJoin("post.community", "community")
            .innerJoin("community.members", "member", "member.id = :userId", { userId: user.id })
            .where("post.createdAt between :oneDayAgo and :before", {
                oneDayAgo: new Date(before.getTime() - 1000 * 60 * 60 * 24),
                before: before
            })
            .orderBy("post.createdAt", "DESC")
            .offset(page * 3)
            .limit(3)
            .getRawMany();

        return posts.map(post => post.id);
    }
}
