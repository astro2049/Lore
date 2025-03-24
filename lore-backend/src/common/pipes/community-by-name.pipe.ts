import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { CommunitiesService } from "../../communities/communities.service";

@Injectable()
export class CommunityByNamePipe implements PipeTransform {
    constructor(private readonly communitiesService: CommunitiesService) {
    }

    async transform(name: string, metadata: ArgumentMetadata) {
        return this.communitiesService.findOne(name);
    }
}
