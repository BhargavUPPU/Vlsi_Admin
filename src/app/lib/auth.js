import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Type the email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log(existingUser);
        if (!existingUser) {
          return null;
        }

        const passwordValid = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordValid) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          userName: existingUser.name,
          role: existingUser.role, // Include the user's role
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.userName,
          role: user.role, // Include role in the JWT token
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role, // Include role in the session
        },
      };
    },
  },
};
