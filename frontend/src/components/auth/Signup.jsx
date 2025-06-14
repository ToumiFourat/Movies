import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/Theme";
import FormContainer from "../form/FormContainer";

export default function Signup() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput label="Name" placeholder="Toumi Fourat" name="name" />
          <FormInput
            label="Email"
            placeholder="fourattoumi021@gmail.com"
            name="email"
          />
          <FormInput label="Password" placeholder="********" name="password" />
          <Submit value="Sign in" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
