import { List } from '@mantine/core';
import { LoaderFunctionArgs, redirect, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getRequestClient } from '~/lib/getRequestClient';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await authenticator.isAuthenticated(request);
	if (!user) {
		return redirect('/login');
	}

	const client = getRequestClient(user.id_token);

	const shifts = await client.shifts.GetAll({
		orgId: user.orgId,
		query: {
			to: new Date().toISOString(),
			from: new Date('1997').toISOString()
		}
	});

	return json(shifts);
}

export default function UserDashboard() {
	const data = useLoaderData<typeof loader>();
	console.log(data);

	return (
		<List>
			{data.results.map((shift) => {
				return (
					<List.Item key={shift.id}>
						{shift.id} - {shift.startsAt} - {shift.endsAt}
					</List.Item>
				);
			})}
		</List>
	);
}
