import React from "react";
import { BsSunFill } from "react-icons/bs";
import Container from "../Container";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "./../../hooks/index";

export default function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-500 ">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <img src="./logo.png" alt="" width="80px" />
          </Link>

          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded"
              >
                <BsSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <input
                type=""
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white "
                placeholder="search..."
              />
            </li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white font-semibold text-lg"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/auth/signin"
                className="text-white font-semibold text-lg"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
}
