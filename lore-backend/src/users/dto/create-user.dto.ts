import { Length } from "class-validator";

export class CreateUserDto {
    @Length(1, 22)
    readonly username: string;

    @Length(1, 31)
    readonly password: string;
}
