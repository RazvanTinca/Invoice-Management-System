import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET_TOKEN_KEY') || ""
        });
    }

    async validate(payload: any) {
        return this.prisma.user.findUnique({
            where:{
                id: payload.sub,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
            }
        });

    }
}