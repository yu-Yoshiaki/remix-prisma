import { Link } from "@remix-run/react";
import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <div>
        <h1 className="text-2xl">Header</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
