import { Member } from '@bikecoop/common';
import { Tooltip, Avatar } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons';

type MemberSubset = Pick<Member, 'firstName' | 'lastName' | 'image'>;

export function MemberAvatar(props: { member: MemberSubset }) {
  const { member } = props;
  return (
    <Tooltip withinPortal label={`${member.firstName} ${member.lastName}`} withArrow>
      <Avatar variant="light" radius="xl" color="teal" src={member.image}>
        {!member.image ? `${member.firstName[0]}${member.lastName[0]}` : null}
      </Avatar>
    </Tooltip>
  );
}

export function MemberAvatarGroup({ members }: { members: MemberSubset[] }) {
  if (!members.length) {
    return (
      <Avatar variant="light" radius="xl">
        <IconCirclePlus />
      </Avatar>
    );
  }

  return (
    <Avatar.Group>
      {members.map((m) => (
        <MemberAvatar member={m} />
      ))}
    </Avatar.Group>
  );
}
