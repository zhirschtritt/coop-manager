import {CoopEventScopeType} from '@bikecoop/common';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

import {CoopEventEntity} from './coop-event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(CoopEventEntity)
    private readonly eventRepo: Repository<CoopEventEntity>,
  ) {}

  async getEventsByScopeType(scopeType: CoopEventScopeType) {
    return await this.eventRepo.find({where: {scopeType}});
  }
}
