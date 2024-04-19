import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { User } from "@prisma/client";
import { prisma } from "~/libs/db";
import bcrypt from "bcryptjs";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<Omit<User, "password">>(
  sessionStorage
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    if (!(email && password)) {
      throw new Error("Invalid Request");
    }
    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    });

    if (!user) {
      throw new AuthorizationError();
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    const passwordsMatch = await bcrypt.compare(String(password), userPassword);

    if (!passwordsMatch) {
      throw new AuthorizationError();
    }

    return userWithoutPassword;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
