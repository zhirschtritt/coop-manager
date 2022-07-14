import {ObjectType, Field} from '@nestjs/graphql';
import {CoopEvent, PrismaClient} from '@prisma/client';
import {JSONObjectResolver} from 'graphql-scalars';

export type Transaction = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];

@ObjectType()
export class CommandResponse {
  @Field(() => [JSONObjectResolver])
  events!: CoopEvent[];
}
