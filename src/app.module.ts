// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Supplier1Service } from './supplier1/supplier1.service';
import { Supplier2Service } from './supplier2/supplier2.service';
import { AggregationService } from './aggregation/aggregation.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StatusController } from './status.controller';
import { RedisModule } from './redis.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
  ],
  controllers: [AppController, StatusController],
  providers: [Supplier1Service, Supplier2Service, AggregationService],
})
export class AppModule {}
