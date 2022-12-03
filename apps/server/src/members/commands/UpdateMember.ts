import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JSONObjectResolver, UUIDResolver } from 'graphql-scalars';

@InputType()
export class UpdateMember implements Prisma.MemberUpdateInput {
  @Field(() => UUIDResolver)
  id!: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => JSONObjectResolver, { nullable: true })
  meta?: Prisma.InputJsonObject;
}
