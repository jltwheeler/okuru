import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";

import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { useLoginMutation } from "src/generated/graphql";
import { setAccessToken } from "src/utils/accessToken";

interface loginProps {}

type LoginPayload = {
  username: string;
  password: string;
};
type loginField = "username" | "password";

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const {
    formState,
    handleSubmit,
    register,
    setError,
  } = useForm<LoginPayload>();
  const [login] = useLoginMutation();

  const onSubmit = async (values: LoginPayload) => {
    const response = await login({ variables: { ...values } });

    if (response.data?.login.errors) {
      response.data.login.errors.forEach(({ field, message }) => {
        if (field === "username" || field === "password") {
          const typedField: loginField = field;
          setError(typedField, { message: message });
        }
      });
    } else if (response.data?.login.access_token) {
      setAccessToken(response.data.login.access_token);
      router.push("/");
    }
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
          Login
        </Button>
      </form>
    </Wrapper>
  );
};

export default Login;
