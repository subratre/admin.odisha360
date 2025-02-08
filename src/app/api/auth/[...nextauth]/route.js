import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: account.provider,
            }),
          }
        );

        if (!res.ok) {
          console.error("API Response Error", res.statusText);
          return false;
        }

        const data = await res.json();
        user.apiToken = data.token; // Attach API token to the user object
        user.userId = data.userId;
        return true;
      } catch (error) {
        console.error("API Error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.apiToken = user.apiToken; // Store API token in JWT
        token.userId = user.userId;
      }
      return token;
    },

    async session({ session, token }) {
      session.apiToken = token.apiToken;
      session.userId = token.userId;
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/profile`;
    },
  },
});

export { authOptions as GET, authOptions as POST };
