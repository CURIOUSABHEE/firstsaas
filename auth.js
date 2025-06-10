import NextAuth from "next-auth";

const config = {
  providers: [],
};

export const { handlers, signOut, signIn, auth } = NextAuth(config);
