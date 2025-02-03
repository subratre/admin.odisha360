import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = NextAuth({
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
    async signIn({ user, account, req }) {
      if (account.provider === "google") {
        // Fetch user's IP address
        let ipAddress = "Unknown IP";
        try {
          const ipRes = await fetch("https://api64.ipify.org?format=json");
          const ipData = await ipRes.json();
          ipAddress = ipData.ip;
        } catch (error) {
          console.error("Error fetching IP:", error);
        }

        // Extract user details
        const userData = {
          email: user.email,
          name: user.name,
          image: user.image,
          DeviceDetails: req?.headers["user-agent"] || "Unknown Device",
          IpAddress: ipAddress,
          IsMentor: true,
          IsStudentUi: false,
        };

        try {
          // Save user to the database
          const res = await fetch(
            `https://lmm-webapp.azurewebsites.net/api/Users/Login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            }
          );

          if (!res.ok) {
            throw new Error("Failed to save user");
          }
        } catch (error) {
          console.error("Error saving user:", error);
          return false; // Prevent sign-in if saving fails
        }
      }
      return true; // Allow sign-in
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/profile`; // Redirect to profile page after login
    },
  },
});

export { authOptions as GET, authOptions as POST };
