import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { CommunitiesService } from "../../communities/communities.service";

@Injectable()
export class CommunityByNamePipe implements PipeTransform {
    constructor(private readonly communitiesService: CommunitiesService) {
    }

    async transform(name: string, metadata: ArgumentMetadata) {
        const community = await this.communitiesService.findOne(name);
        if (!community) {
            throw new HttpException("", HttpStatus.NOT_FOUND);
        }
        return community;
    }
}
