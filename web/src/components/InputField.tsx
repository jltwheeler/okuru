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
  required?: boolean;
}

export const InputField = <T extends {}>({
  label,
  fieldName,
  placeHolder,
  type,
  register,
  formState,
  required = true,
}: InputFieldProps<T>) => {
  const validateField = (value: string): string | boolean => {
    if (!value) return `Please enter a ${label}`;
    return true;
  };

  const options = {};
  if (required) {
    options["validate"] = validateField;
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
