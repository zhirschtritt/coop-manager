import { createCookieSessionStorage } from '@remix-run/node';

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [process.env.SESSION_SECRET!],
		secure: process.env.NODE_ENV === 'production' // enable this in prod only
	}
});

// async function getSession(request: Request) {
// 	const cookie = request.headers.get('Cookie');
// 	return await sessionStorage.getSession(cookie);
// }

// export async function logout(request: Request) {
// 	const session = await getSession(request);
// 	return redirect('/login', {
// 		headers: {
// 			'Set-Cookie': await sessionStorage.destroySession(session)
// 		}
// 	});
// }
