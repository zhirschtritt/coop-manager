import {Controller, Get} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {MemberEntity} from '../memberships';

@Controller('members')
export class MembersController {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepo: Repository<MemberEntity>,
  ) {}

  @Get()
  async findAll() {
    return await this.memberRepo.find();
  }
}
