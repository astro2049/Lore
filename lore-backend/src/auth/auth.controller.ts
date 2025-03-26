import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { AuthenticatedRequest, AuthGuard } from "./auth.guard";
import { Response } from "express";
import * as process from "node:process";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
        const accessToken = await this.authService.signIn(signInDto.username, signInDto.password);
        response.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
    }

    @HttpCode(HttpStatus.OK)
    @Post("logout")
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });
    }

    @UseGuards(AuthGuard)
    @Get("me")
    getProfile(@Req() req: AuthenticatedRequest) {
        return req.user;
    }
}
