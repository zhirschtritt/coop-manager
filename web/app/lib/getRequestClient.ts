import Client, { Environment } from '~/lib/client';

export const getRequestClient = (authToken: string) => {
	const env =
		process.env.NODE_ENV === 'development'
			? 'http://127.0.0.1:4000'
			: Environment('staging');

	return new Client(env, { auth: authToken });
};
