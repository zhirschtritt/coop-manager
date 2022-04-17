import {Actor} from '@bikecoop/common';
import {Field, InputType} from '@nestjs/graphql';
import {UUIDResolver, DateResolver, JSONObjectResolver} from 'graphql-scalars';

// TODO: extend command interface from common
@InputType()
export class CreateMembershipCommand {
  @Field(() => UUIDResolver, {nullable: true})
  id?: string | undefined;

  @Field(() => UUIDResolver)
  requestId!: string;

  @Field(() => DateResolver)
  startDate!: Date;

  @Field(() => DateResolver)
  endDate!: Date;

  @Field(() => UUIDResolver)
  memberId!: string;

  @Field(() => UUIDResolver)
  membershipTypeId!: string;

  @Field(() => JSONObjectResolver)
  actor!: Actor;
}
