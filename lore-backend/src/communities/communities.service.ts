import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Community } from "./entities/community.entity";
import { DataSource, Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Post } from "../posts/entities/post.entity";

@Injectable()
export class CommunitiesService {
    constructor(
        @InjectRepository(Community)
        private readonly communitiesRepository: Repository<Community>,
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {
    }

    async create(createCommunityDto: CreateCommunityDto, user: User) {
        const community = this.communitiesRepository.create(createCommunityDto);
        community.members = [user];
        community.creator = user;
        return this.communitiesRepository.save(community);
    }

    findAll() {
        return this.communitiesRepository.find();
    }

    async findOne(name: string) {
        const community = await this.communitiesRepository.findOneBy({ name: name });
        if (!community) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return community;
    }

    async update(id: string, updateCommunityDto: UpdateCommunityDto) {
        await this.communitiesRepository.update(id, updateCommunityDto);
        return this.findOne(id);
    }

    remove(id: string) {
        return this.communitiesRepository.delete(id);
    }

    async joinCommunity(community: Community, user: User) {
        if (await this.hasMember(community, user)) {
            // Already a member, nothing to do
            return;
        }

        await this.communitiesRepository
            .createQueryBuilder()
            .relation(Community, "members")
            .of(community.id)
            .add(user.id);
    }

    async leaveCommunity(community: Community, user: User) {
        if (!await this.hasMember(community, user)) {
            // The user is not a member, nothing to remove
            return;
        }

        await this.communitiesRepository
            .createQueryBuilder()
            .relation(Community, "members")
            .of(community.id)
            .remove(user.id);
    }

    async hasMember(community: Community, user: User) {
        const count = await this.dataSource
            .createQueryBuilder()
            .from("user_communities_community", "members")
            .where("members.communityId = :id", { id: community.id })
            .andWhere("members.userId = :userId", { userId: user.id })
            .getCount();

        return count === 1;
    }

    findPosts(community: Community) {
        return this.postsRepository
            .createQueryBuilder("post")
            .loadRelationCountAndMap("post.commentCount", "post.comments")
            .where("post.communityId = :communityId", { communityId: community.id })
            .orderBy("post.createdAt", "DESC")
            .innerJoinAndSelect("post.author", "author")
            .getMany();
    }
}
