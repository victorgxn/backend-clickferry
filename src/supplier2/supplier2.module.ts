import { Module } from '@nestjs/common';
import { Supplier2Service } from './supplier2.service';

@Module({
  providers: [Supplier2Service]
})
export class Supplier2Module {}
