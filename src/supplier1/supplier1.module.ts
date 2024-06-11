import { Module } from '@nestjs/common';
import { Supplier1Service } from './supplier1.service';

@Module({
  providers: [Supplier1Service]
})
export class Supplier1Module {}
