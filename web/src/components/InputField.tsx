import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { FormState, Path, UseFormRegister } from "react-hook-form";

interface InputFieldProps<T> {
  label: string;
  fieldName: Path<T>;
  placeHolder?: string;
  type?: string;
  formState: FormState<T>;
  register: UseFormRegister<T>;
  validateFunc?: any;
}

export const InputField = <T extends {}>({
  label,
  fieldName,
  placeHolder,
  type,
  register,
  formState,
  validateFunc,
}: InputFieldProps<T>) => {
  const options = {};
  if (validateFunc) {
    options["validate"] = validateFunc;
  }

  return (
    <FormControl isInvalid={formState.errors[`${fieldName}`] ? true : false}>
      <FormLabel htmlFor="name">{label}</FormLabel>
      <Input
        {...register(fieldName, { ...options })}
        placeholder={placeHolder ? placeHolder : label}
        type={type ? type : "text"}
      />
      <FormErrorMessage>
        {formState.errors[`${fieldName}`] &&
          formState.errors[`${fieldName}`].message}
      </FormErrorMessage>
    </FormControl>
  );
};
