import { Box, Center } from "@chakra-ui/layout";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Center>
      <Box mt={8} maxW={variant === "regular" ? "800px" : "400px"} w="100%">
        {children}
      </Box>
    </Center>
  );
};
