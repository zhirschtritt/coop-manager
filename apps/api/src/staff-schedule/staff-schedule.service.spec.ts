import { Test, TestingModule } from '@nestjs/testing';
import { StaffScheduleService } from './staff-schedule.service';

describe('StaffScheduleService', () => {
  let service: StaffScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffScheduleService],
    }).compile();

    service = module.get<StaffScheduleService>(StaffScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
