import { Length } from "class-validator";

export class CreateCommunityDto {
    @Length(1, 22)
    name: string;

    description: string;
}
