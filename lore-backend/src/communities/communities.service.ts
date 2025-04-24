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
        let community = await this.communitiesRepository.findOneBy({
            name: createCommunityDto.name
        });
        if (community) {
            throw new HttpException("", HttpStatus.FORBIDDEN);
        }
        community = this.communitiesRepository.create(createCommunityDto);
        community.members = [user];
        community.creator = user;
        return this.communitiesRepository.save(community);
    }

    findAll() {
        return this.communitiesRepository.find();
    }

    async findOne(name: string) {
        const community = await this.communitiesRepository
            .createQueryBuilder("community")
            .where("community.name = :name", { name: name })
            .leftJoinAndSelect("community.creator", "creator")
            .loadRelationCountAndMap("community.memberCount", "community.members")
            .getOne();
        return community;
    }

    async update(updateCommunityDto: UpdateCommunityDto, community: Community) {
        await this.communitiesRepository.update(community.id, updateCommunityDto);
        return this.findOne(community.name);
    }

    remove(community: Community) {
        return this.communitiesRepository.delete(community.id);
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
            .from("communities_users", "member")
            .where("member.communityId = :id", { id: community.id })
            .andWhere("member.userId = :userId", { userId: user.id })
            .getCount();

        return count === 1;
    }

    async findPosts(community: Community) {
        const posts = await this.postsRepository
            .createQueryBuilder()
            .select("id")
            .where("communityId = :communityId", { communityId: community.id })
            .orderBy("createdAt", "DESC")
            .getRawMany();

        return posts.map(post => post.id);
    }
}
