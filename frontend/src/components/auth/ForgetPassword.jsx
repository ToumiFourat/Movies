import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import CustomLink from "../CustomLink";
import Submit from "../form/Submit";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/Theme";

export default function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96 "}>
          <Title>Please Enter Your Email</Title>
          <FormInput label="Email" placeholder="fourattoumi021@gmail.com" />

          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
