import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";
import { MyJwtModule } from './jwt/my-jwt.module';

@Module({
  imports: [AuthModule, UserModule, InvoiceModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), MyJwtModule],
})
export class AppModule {}
