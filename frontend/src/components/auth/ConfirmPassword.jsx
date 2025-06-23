import React, { useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/Theme";
import { useSearchParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";

export default function ConfirmPassword() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  // isValid, isVerifying, !isValid

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex space-x-2 items-center">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait we are verifying your token!
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96 "}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="confirmPassword"
            type="password"
          />

          <Submit value="Confirm Password" />
          <div className="flex justify-between"></div>
        </form>
      </Container>
    </FormContainer>
  );
}
