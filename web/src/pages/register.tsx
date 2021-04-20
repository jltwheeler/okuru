import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";

import { Wrapper } from "src/components/Wrapper";
import { InputField } from "src/components/InputField";
import { useRegisterMutation } from "src/generated/graphql";

interface registerProps {}

type LoginPayload = {
  username: string;
  password: string;
};
type loginField = "username" | "password";

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const {
    formState,
    handleSubmit,
    register,
    setError,
  } = useForm<LoginPayload>();
  const [registerUser] = useRegisterMutation();

  const onSubmit = async (values: LoginPayload) => {
    const response = await registerUser({ variables: { ...values } });

    if (response.data?.register.errors) {
      response.data.register.errors.forEach(({ field, message }) => {
        if (field === "username" || field === "password") {
          const typedField: loginField = field;
          setError(typedField, { message: message });
        }
      });
    } else if (response.data?.register.user) {
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
          Register
        </Button>
      </form>
    </Wrapper>
  );
};

export default Register;
