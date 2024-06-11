import { Test, TestingModule } from '@nestjs/testing';
import { Supplier1Service } from './supplier1.service';

describe('Supplier1Service', () => {
  let service: Supplier1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Supplier1Service],
    }).compile();

    service = module.get<Supplier1Service>(Supplier1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
