import * as cookie from 'cookie';

export function cookieParse(req, cookieName: string): string {
    if (req.headers.cookie) {
        const allCookies = cookie.parse(req.headers.cookie);
        return allCookies[cookieName];
    } else return undefined;
}
