import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import stylesheet from "./tailwind.css?url"; // <- 新規追加
import { LinksFunction } from "@remix-run/node";
import { Header } from "./components/Header";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet }, // <- 新規追加
  // ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []), // <- 既存のコードをコメントアウト
];

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
        <div className="bg-[#FFF7EA]">{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
