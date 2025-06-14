import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MyJwtModule} from "../jwt/my-jwt.module";
import {JwtStrategy} from "./strategy";


@Module({
    imports: [MyJwtModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {

}