import {Global, Module} from '@nestjs/common';
import { MyJwtService } from './my-jwt.service';
import { JwtModule as JM } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JM.register({})],
  providers: [MyJwtService],
  exports: [MyJwtService],
})
export class MyJwtModule {}
