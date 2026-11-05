import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        ssl: {
          rejectUnauthorized: false
        }
      })
    })

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
