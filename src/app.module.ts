import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entity/todo.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:(configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'pR0103@',
        database: 'todo',
        entities: [User, Todo],
        synchronize: true,

      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}
