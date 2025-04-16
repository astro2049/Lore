import { Controller, Get, HttpException, HttpStatus, Query } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CommunitiesService } from "../communities/communities.service";

@Controller()
export class UtilitiesController {
    constructor(
        private readonly usersService: UsersService,
        private readonly communitiesService: CommunitiesService
    ) {
    }

    @Get("search")
    async search(@Query("username") username?: string, @Query("community") communityName?: string) {
        if ((!username && !communityName) || (username && communityName)) {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }
        if (username) {
            const user = await this.usersService.findOne(username);
            return user ? "yes" : "no";
        } else if (communityName) {
            const community = await this.communitiesService.findOne(communityName);
            return community ? "yes" : "no";
        }
    }
}
