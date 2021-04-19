import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";

interface registerProps {}

type LoginPayload = {
  username: string;
  password: string;
};

const Register: React.FC<registerProps> = ({}) => {
  const { formState, handleSubmit, register } = useForm<LoginPayload>();

  const validateName = (value: string): string | boolean => {
    if (!value) return "Enter a valueeee 😱 !";
    return true;
  };

  const onSubmit = (values: LoginPayload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve(true);
      }, 1000);
    });
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
