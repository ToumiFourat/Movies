import React from "react";
import { useAuth } from "../hooks";
import Container from "./Container";

export default function Home() {
  const { authInfo } = useAuth();
  console.log(authInfo);
  return (
    <Container>
      <p className="text-lg text-center bg-blue-50 p-2">
        It looks like you haven't verified your account,{" "}
        <button className="text-blue-500 font-semibold hover:underline">
          click here to verify your account
        </button>
      </p>
    </Container>
  );
}
