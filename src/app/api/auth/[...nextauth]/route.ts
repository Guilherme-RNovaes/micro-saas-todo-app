import { db } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

const { handler, auth, sighIn, sighOut } = NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app',
  },
});

export { handler as GET, handler as POST, auth, sighIn, sighOut };
