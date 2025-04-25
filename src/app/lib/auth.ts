import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          redirect_uri:
            "https://furirachatia.vercel.app/api/auth/callback/google",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
