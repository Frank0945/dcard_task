import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'repo',
                },
            },
        }),
    ],
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            console.log("NEXTAUTH_URL", process.env.NEXTAUTH_URL);
            session.accessToken = token.accessToken as string;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true
});