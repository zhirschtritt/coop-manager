import { LoaderFunctionArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderFunctionArgs) {
	await authenticator.authenticate('zitadel', request, {
		successRedirect: '/dashboard',
		failureRedirect: '/login'
	});
}
