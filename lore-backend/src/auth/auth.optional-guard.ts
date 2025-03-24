import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import * as process from "node:process";
import { extractTokenFromHeader, Payload } from "./auth.guard";

@Injectable()
export class OptionalAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        const token = extractTokenFromHeader(request);
        if (!token) {
            return true;
        }
        try {
            const payload = await this.jwtService.verifyAsync<Payload>(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );
            console.log(payload);
            // Assign the payload to the request object here so that we can access it in our route handlers
            request["user"] = payload;
        } catch {
            throw new HttpException("", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
