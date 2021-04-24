import React from "react";
import { useUsersQuery } from "src/generated/graphql";

interface usersProps {}

const users: React.FC<usersProps> = ({}) => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data?.users.map(({ username, id }) => (
        <div key={id}>{username}</div>
      ))}
    </div>
  );
};

export default users;
