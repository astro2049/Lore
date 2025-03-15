import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CommunitiesService } from "./communities.service";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";

@Controller("communities")
export class CommunitiesController {
    constructor(private readonly communitiesService: CommunitiesService) {
    }

    @Post()
    async create(@Body() createCommunityDto: CreateCommunityDto) {
        return this.communitiesService.create(createCommunityDto);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.communitiesService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
        return this.communitiesService.update(id, updateCommunityDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.communitiesService.remove(id);
    }

    // Join a community
    @Post(":id/join")
    async joinCommunity(@Param("id") id: string, @Body("userId") userId: string) {
        return this.communitiesService.joinCommunity(id, userId);
    }

    // Leave a community
    @Post(":id/leave")
    async leaveCommunity(@Param("id") id: string, @Body("userId") userId: string) {
        return this.communitiesService.leaveCommunity(id, userId);
    }
}
