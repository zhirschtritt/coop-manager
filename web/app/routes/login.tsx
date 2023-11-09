import { Button, Paper } from '@mantine/core';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
	// If the user is already authenticated redirect to /dashboard directly
	return await authenticator.isAuthenticated(request, {
		successRedirect: '/dashboard'
	});
}

export default function Login() {
	return (
		<Paper>
			<h1>Login</h1>
			<Form method="post">
				<Button type="submit">Login</Button>
			</Form>
		</Paper>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	return await authenticator.authenticate('zitadel', request, {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
		throwOnError: true
	});
}
