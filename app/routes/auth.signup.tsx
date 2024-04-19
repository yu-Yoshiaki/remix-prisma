import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { createUser } from "~/services/signup.server";

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen() {
  return (
    <Form method="post">
      <input type="email" name="email" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Sign up</button>
    </Form>
  );
}

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.clone().formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const errors: { [key: string]: string } = {};

  if (typeof email !== "string" || typeof password !== "string") {
    return json({ error: "Invalid Form Data", form: action }, { status: 400 });
  }

  const result = await createUser({ email, password });

  if (result.error) {
    errors.email = result.error.message;
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/auth/signup",
    context: { formData },
  });
}

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not
export async function loader({ request }: LoaderFunctionArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}
