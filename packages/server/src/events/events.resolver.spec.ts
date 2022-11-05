import { Test, TestingModule } from '@nestjs/testing';
import { EventsResolver } from './events.resolver';

describe('EventsResolver', () => {
  let resolver: EventsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsResolver],
    }).compile();

    resolver = module.get<EventsResolver>(EventsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
