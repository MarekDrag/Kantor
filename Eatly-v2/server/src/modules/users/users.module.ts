import { Module } from '@nestjs/common';
import { UsersControllers } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
@Module({
  controllers: [UsersControllers],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
