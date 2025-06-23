import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/Theme";
import { useSearchParams } from "react-router-dom";
export default function ConfirmPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  console.log(token, id);

  //  http://localhost:3000/reset-password?
  //  token=792429ab5dc05feaf02b9d389401e442bc2911cc28b2ec31a17f1a22382f&
  //  id=6850616ccd93c7e1ed087630
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
