import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService} from "@nestjs/config";

@Injectable()
export class MyJwtService {

    constructor(private jwt: JwtService, private config: ConfigService) {}

    async signToken(userId: number, email: string, fullName?: string) {
        const data = {
            sub: userId,
            email: email,
            fullName: fullName
        }

        return this.jwt.signAsync(data, {
            expiresIn: this.config.get('JWT_TOKEN_EXPIRATION'),
            secret: this.config.get('JWT_SECRET_TOKEN_KEY'),
            issuer: "me :)",
        })
    }

    async signRefreshToken(userId: number, email: string) {
        const data = {
            sub: userId,
            email: email,
        }

        return this.jwt.signAsync(data, {
            expiresIn: this.config.get('JWT_REFRESH_EXPIRATION'),
            secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
            issuer: "me :)",
        })
    }

    verifyToken(token: string) {

        return this.jwt.verifyAsync(token, {
            secret: this.config.get('JWT_SECRET_TOKEN_KEY'),
            issuer: "me :)",
        })
    }

    verifyRefreshToken(token: string) {
        return this.jwt.verifyAsync(token, {
            secret: this.config.get('JWT_SECRET_REFRESH_KEY'),
            issuer: "me :)",
        })
    }

}
