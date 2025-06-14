import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtGuard} from "../auth/guard";
import {User} from "../auth/decorator";
import {User as UserEntity} from "@prisma/client";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get("/me")
    getMe(@User() user: UserEntity) {
        return user;
    }

}
