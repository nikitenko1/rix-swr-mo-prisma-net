// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth";
import { User } from "./intefaces";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User;
  }
}
