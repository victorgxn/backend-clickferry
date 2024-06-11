import { Test, TestingModule } from '@nestjs/testing';
import { Supplier2Service } from './supplier2.service';

describe('Supplier2Service', () => {
  let service: Supplier2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Supplier2Service],
    }).compile();

    service = module.get<Supplier2Service>(Supplier2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
