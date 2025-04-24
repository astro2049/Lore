import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    HttpCode,
    HttpStatus,
    HttpException
} from "@nestjs/common";
import { CommunitiesService } from "./communities.service";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";
import { Payload } from "../common/decorators/payload.decorator";
import { AuthGuard } from "../auth/auth.guard";
import { OptionalAuthGuard } from "../auth/auth.optional-guard";
import { CommunityByNamePipe } from "../common/pipes/community-by-name.pipe";
import { Community } from "./entities/community.entity";
import { User } from "../users/entities/user.entity";
import { UserByTokenPipe } from "../common/pipes/user-by-token.pipe";

@Controller("communities")
export class CommunitiesController {
    constructor(private readonly communitiesService: CommunitiesService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createCommunityDto: CreateCommunityDto, @Payload(UserByTokenPipe) user: User) {
        return this.communitiesService.create(createCommunityDto, user);
    }

    @Get()
    findAll() {
        return this.communitiesService.findAll();
    }

    @UseGuards(OptionalAuthGuard)
    @Get(":name")
    async findOne(@Param("name", CommunityByNamePipe) community: Community, @Payload(UserByTokenPipe) user?: User) {
        if (user) {
            community["isMember"] = await this.communitiesService.hasMember(community, user);
        }
        return community;
    }

    @UseGuards(AuthGuard)
    @Patch(":name")
    update(@Body() updateCommunityDto: UpdateCommunityDto,
           @Param("name", CommunityByNamePipe) community: Community,
           @Payload(UserByTokenPipe) user: User
    ) {
        if (!community.creator || community.creator.username != user.username) {
            throw new HttpException("", HttpStatus.FORBIDDEN);
        }
        return this.communitiesService.update(updateCommunityDto, community);
    }

    @UseGuards(AuthGuard)
    @Delete(":name")
    remove(@Param("name", CommunityByNamePipe) community: Community, @Payload(UserByTokenPipe) user: User) {
        if (!community.creator || community.creator.username !== user.username) {
            throw new HttpException("", HttpStatus.FORBIDDEN);
        }
        return this.communitiesService.remove(community);
    }

    // Join a community
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post(":name/join")
    async joinCommunity(@Param("name", CommunityByNamePipe) community: Community, @Payload(UserByTokenPipe) user: User) {
        return this.communitiesService.joinCommunity(community, user);
    }

    // Leave a community
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post(":name/leave")
    async leaveCommunity(@Param("name", CommunityByNamePipe) community: Community, @Payload(UserByTokenPipe) user: User) {
        return this.communitiesService.leaveCommunity(community, user);
    }

    // Find posts of this community
    @Get(":name/posts")
    findPosts(@Param("name", CommunityByNamePipe) community: Community) {
        return this.communitiesService.findPosts(community);
    }
}
