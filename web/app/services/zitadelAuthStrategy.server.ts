import { SessionStorage } from '@remix-run/node';
import { AuthenticateOptions } from 'remix-auth';
import { OAuth2Profile, OAuth2Strategy } from 'remix-auth-oauth2-pkce';
import type { users } from '~/lib/client';
import { getRequestClient } from '~/lib/getRequestClient';

export type OIDCExtraParams = Record<string, unknown> & {
	id_token: string;
};

export class ZitadelStrategy extends OAuth2Strategy<
	users.UserData & OIDCExtraParams,
	OAuth2Profile,
	OIDCExtraParams
> {
	readonly name = 'zitadel';

	constructor() {
		if (
			!process.env.ZITADEL_ISSUER ||
			!process.env.ZITADEL_CLIENT_ID ||
			!process.env.AUTH_CALLBACK_URL
		) {
			throw new Error('ZITADEL_ISSUER, ZITADEL_CLIENT_ID and AUTH_CALLBACK_URL must be set');
		}

		super(
			{
				authorizationURL: `${process.env.ZITADEL_ISSUER!}/oauth/v2/authorize`,
				tokenURL: `${process.env.ZITADEL_ISSUER}/oauth/v2/token`,
				clientID: process.env.ZITADEL_CLIENT_ID,
				callbackURL: '/auth/callback',
				// more scopes: https://zitadel.com/docs/apis/openidoauth/scopes
				scope: [
					'profile',
					'email',
					'openid',
					'offline_access',
					'urn:zitadel:iam:user:resourceowner'
				]
			},
			async (user) => {
				const client = getRequestClient(user.accessToken);
				// here you can use the params above to get the user and return it
				// what you do inside this and how you find the user is up to you
				const res = await client.users.GetMyUser();
				return { ...res.providerData, id_token: user.accessToken };
			}
		);
	}

	async authenticate(
		request: Request,
		sessionStorage: SessionStorage,
		options: AuthenticateOptions
	) {
		return await super.authenticate(request, sessionStorage, options);
	}

	protected async userProfile(
		accessToken: string,
		_params: OIDCExtraParams
	): Promise<OAuth2Profile> {
		const response = await fetch(`${process.env.ZITADEL_ISSUER}/oidc/v1/userinfo`, {
			headers: {
				authorization: `Bearer ${accessToken}`
			}
		});
		if (!response.ok) {
			try {
				let body = await response.text();
				throw new Response(body, { status: 401 });
			} catch (error) {
				throw new Response((error as Error).message, { status: 401 });
			}
		}
		const data: users.UserData = await response.json();

		return {
			provider: 'zitadel',
			id: data.id,
			emails: [{ value: data.email }],
			displayName: data.userName,
			name: {
				familyName: data.lastName,
				givenName: data.firstName
			}
		};
	}
}
