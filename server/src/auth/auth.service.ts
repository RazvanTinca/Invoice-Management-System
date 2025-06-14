import {ForbiddenException, Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {LoginDto, RegisterDTO, TokensDTO} from "./dto";
import * as argon from 'argon2'
import {MyJwtService} from "../jwt/my-jwt.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: MyJwtService) {
    }


    async register(registerDTO: RegisterDTO) {
        const passHash = await argon.hash(registerDTO.password);

        try {

            const user = await this.prisma.user.create({
                data: {
                    firstName: registerDTO.firstName,
                    lastName: registerDTO.lastName,
                    email: registerDTO.email,
                    passwordHash: passHash,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                    firstName: true,
                    lastName: true,
                }
            })

            const token = await this.jwt.signToken(user.id, user.email, `${user.firstName} ${user.lastName}`);
            const refreshToken = await this.jwt.signRefreshToken(user.id, user.email);

            return {token, refreshToken};

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists.');
                }
            }
            console.error('Error during user registration:', error);
            throw error;
        }
    }

    async login(loginDTO: LoginDto): Promise<TokensDTO> {

        const user = await this.prisma.user.findUnique({
            where: {
                email: loginDTO.email,
            },
            select: {
                id: true,
                email: true,
                passwordHash: true,
                firstName: true,
                lastName: true,
            }
        })

        if (!user) {
            throw new ForbiddenException('Invalid credentials.');
        }

        const isPasswordValid = await argon.verify(user.passwordHash, loginDTO.password);

        if (!isPasswordValid) {
            throw new ForbiddenException('Invalid credentials.');
        }


        const token = await this.jwt.signToken(user.id, user.email, `${user.firstName} ${user.lastName}`);
        const refreshToken = await this.jwt.signRefreshToken(user.id, user.email);

        return {token, refreshToken};

    }

    async refresh(token: string): Promise<string> {
        const payload = await this.jwt.verifyRefreshToken(token);

        if (!payload) {
            throw new ForbiddenException('Invalid token.');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            }
        });

        if (!user) {
            throw new ForbiddenException('User not found.');
        }

        return this.jwt.signToken(user.id, user.email, `${user.firstName} ${user.lastName}`);
    }
}
