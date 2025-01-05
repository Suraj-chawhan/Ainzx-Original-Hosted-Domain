import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import connectDB from "../../../../../Mogodb/Connect";
import bcrypt from "bcrypt";
import User from "../../../../../Mogodb/schema/userSchema";
import GoogleUser from "../../../../../Mogodb/schema/googleUserSchema";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this email.");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid credentials.");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      try {
        await connectDB();

        let accessToken;

        let type;
        let dbGoogleId;
        if (account?.provider === "credentials") {
          accessToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "7d" }
          );
          type = "user";
        } else if (account?.provider === "google") {
          const googleUser = await GoogleUser.findOne({ email: user.email });

          if (!googleUser) {
            const newUser = new GoogleUser({
              name: user.name,
              email: user.email,
              type: "google",
              subscription: { plan: "free" },
            });

            const a = await newUser.save();
            dbGoogleId = a._id;
          } else {
            dbGoogleId = googleUser._id;
          }
          accessToken = jwt.sign(
            { userId: dbGoogleId, email: user.email },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "7d" }
          );
          user.id = dbGoogleId;
          type = "google";
        }

        if (user) {
          token.userId = user.id;
          token.name = user.name;
          token.email = user.email;
          token.accessToken = accessToken;
          token.type = type;
        }

        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error.message);
        throw new Error(error.message);
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          userId: token.userId,
          name: token.name,
          email: token.email,
          accessToken: token.accessToken,
          type: token.type,
        };
      }

      return session;
    },
  },

  pages: {
    signIn: "/model",
    error: "/auth/error",
  },
});

export const GET = handler;
export const POST = handler;
