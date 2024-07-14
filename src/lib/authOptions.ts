import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();
          const user = await User.findOne({ name: credentials?.name });
          if (user && credentials?.password) {
            const isValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isValid) {
              return user;
            }
          }

          return null;
        } catch (error) {
          console.error("MongoDB authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  // adapter: MongoDBAdapter(dbConnect),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Срок действия сессии в секундах (30 дней)
    updateAge: 24 * 60 * 60, // Время обновления сессии в секундах (24 часа)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
};
