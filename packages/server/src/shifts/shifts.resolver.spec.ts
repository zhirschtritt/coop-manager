import {Test, TestingModule} from '@nestjs/testing';
import {ShiftsResolver} from './shifts.resolver';

describe('ShiftsResolver', () => {
  let resolver: ShiftsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftsResolver],
    }).compile();

    resolver = module.get<ShiftsResolver>(ShiftsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
