import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthenticatedRequest, AuthGuard } from "./auth.guard";
import { Response } from "express";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
        return this.authService.signIn(signInDto.username, signInDto.password, response);
    }

    @HttpCode(HttpStatus.OK)
    @Post("logout")
    logOut(@Res({ passthrough: true }) response: Response) {
        this.authService.logOut(response);
    }

    @UseGuards(AuthGuard)
    @Get("me")
    getProfile(@Req() req: AuthenticatedRequest) {
        return req.user;
    }
}
