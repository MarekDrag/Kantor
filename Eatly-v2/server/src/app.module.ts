import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import postgresConfig from './db/postgresConfig';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, KnexModule.forRoot({ config: postgresConfig }), UsersModule],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: 'APP_PIPE',
      useValue: new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
