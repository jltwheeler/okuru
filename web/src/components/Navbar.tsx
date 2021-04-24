import React from "react";
import NextLink from "next/link";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useLogoutMutation, useWhoAmIQuery } from "src/generated/graphql";
import { setAccessToken } from "src/utils/accessToken";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [logout, { client }] = useLogoutMutation();
  const { data, loading, error } = useWhoAmIQuery({
    // Remove handling of unauth error
    errorPolicy: "ignore",
  });

  let body = null;
  if (loading) {
    console.log("loading");
  } else if (error || !data?.whoAmI) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr={2}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.whoAmI.username}</Box>
        <NextLink href="/users">
          <Link color="white" mr={2}>
            Users
          </Link>
        </NextLink>
        <Button
          variant="link"
          onClick={async () => {
            await logout();
            setAccessToken("");
            await client.resetStore();
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
