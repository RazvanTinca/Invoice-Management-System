import {Body, Controller, ForbiddenException, HttpCode, HttpStatus, Patch, Post, Req, Res} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {Request, Response} from "express";
import {AuthResponseDTO, LoginDto, RegisterDTO} from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, ) {
    }

    @Post('register')
    async register(@Body() dto: RegisterDTO, @Res({passthrough: true}) res: Response): Promise<AuthResponseDTO> {
        const tokens = await this.authService.register(dto)

        res.cookie("refresh_token", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: 'strict', // Adjust as necessary for your application
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        return {accessToken: tokens.token};
    }

    @Post('login')
    async login(@Body() dto: LoginDto, @Res({passthrough: true}) res: Response): Promise<AuthResponseDTO> {
        const tokens = await this.authService.login(dto)

        res.cookie("refresh_token", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: 'strict', // Adjust as necessary for your application
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        return {accessToken: tokens.token};
    }

    @Patch('refresh')
    async refresh(@Req() req: Request) : Promise<AuthResponseDTO> {

        const token = req.cookies['refresh_token'];

        if (!token) {
            throw new Error('No token provided');
        }

        const signedToken = await this.authService.refresh(token)
        return {accessToken: signedToken};
    }


}
