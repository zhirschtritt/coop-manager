import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JSONObjectResolver, EmailAddressResolver, UUIDResolver } from 'graphql-scalars';

@InputType()
export class CreateNewMember implements Prisma.MemberCreateInput {
  @Field(() => UUIDResolver, { nullable: true })
  id?: string | undefined;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => EmailAddressResolver)
  email!: string;

  @Field(() => JSONObjectResolver, { nullable: true })
  meta?: Prisma.InputJsonObject;
}
