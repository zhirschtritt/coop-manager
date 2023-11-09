import { Authenticator } from 'remix-auth';
import { sessionStorage } from '~/services/session.server';
import type { users } from '~/lib/client';
import { OIDCExtraParams, ZitadelStrategy } from './zitadelAuthStrategy.server';

export const authenticator = new Authenticator<users.UserData & OIDCExtraParams>(sessionStorage);

authenticator.use(new ZitadelStrategy(), 'zitadel');
