import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { UserResolver } from './UserResolver';

@Module({
  providers: [UserResolver, UserService],
})
export class UserModule {}
