import NextAuth from "next-auth";

import GooleProvider from "next-auth/providers/google";

console.log(process.env.GOOGLE_ID);

const authOptions = NextAuth({
  providers: [
    GooleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, user, trigger, token }) {
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/profile`; // Allow internal redirects
      }
      return `${baseUrl}/profile`;
    },
  },
});

export { authOptions as GET, authOptions as POST };
