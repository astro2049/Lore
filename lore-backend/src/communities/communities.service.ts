import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Community } from "./entities/community.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CommunitiesService {
    constructor(
        @InjectRepository(Community)
        private readonly communitiesRepository: Repository<Community>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ) {
    }

    create(createCommunityDto: CreateCommunityDto) {
        const community = this.communitiesRepository.create(createCommunityDto);
        return this.communitiesRepository.save(community);
    }

    async findOne(id: string) {
        const community = await this.communitiesRepository.findOneBy({ id: id });
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

    async joinCommunity(id: string, userId: string) {
        if (await this.hasMember(id, userId)) {
            // Already a member, nothing to do
            return;
        }

        await this.communitiesRepository
            .createQueryBuilder()
            .relation(Community, "members")
            .of(id)
            .add(userId);
    }

    async leaveCommunity(id: string, userId: string): Promise<void> {
        if (!await this.hasMember(id, userId)) {
            // The user is not a member, nothing to remove
            return;
        }

        await this.communitiesRepository
            .createQueryBuilder()
            .relation(Community, "members")
            .of(id)
            .remove(userId);
    }

    private async hasMember(id: string, userId: string) {
        const count = await this.dataSource
            .createQueryBuilder()
            .from("user_communities_community", "members")
            .where("members.communityId = :id", { id })
            .andWhere("members.userId = :userId", { userId })
            .getCount();

        return count === 1;
    }
}
