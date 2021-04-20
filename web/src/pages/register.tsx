import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { gql } from "@apollo/client";
import { useRegisterMutation } from "src/generated/graphql";

interface registerProps {}

type LoginPayload = {
  username: string;
  password: string;
};

const Register: React.FC<registerProps> = ({}) => {
  const { formState, handleSubmit, register } = useForm<LoginPayload>();
  const [registerUser] = useRegisterMutation();

  const validateName = (value: string): string | boolean => {
    if (!value) return "Enter a valueeee 😱 !";
    return true;
  };

  const onSubmit = async (values: LoginPayload) => {
    const response = await registerUser({ variables: { ...values } });
    return response;
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField<LoginPayload>
          label="Username"
          fieldName="username"
          placeHolder="username"
          register={register}
          formState={formState}
          validateFunc={validateName}
        />
        <Box mt={4}>
          <InputField<LoginPayload>
            label="Password"
            fieldName="password"
            placeHolder="password"
            type="password"
            register={register}
            formState={formState}
          />
        </Box>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Register
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
