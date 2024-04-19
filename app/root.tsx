import {
  Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import stylesheet from "./tailwind.css"; // <- 新規追加
import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Header } from "./components/Header";
import { authenticator } from "./services/auth.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet }, // <- 新規追加
  // ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []), // <- 既存のコードをコメントアウト
];

export const action = async ({request}: ActionFunctionArgs) => {
  return await authenticator.logout(request, { redirectTo: "/auth/login/"})
}


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Form method="POST">
          <button type="submit" name="action" value="logout">Logout</button>
        </Form>
        
        <div className="bg-[#FFF7EA]">
        {children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
