import React, { useState, useEffect } from "react";
import { User as UserComponent } from "../components";
import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

function User() {
  const { users, loading } = useUsers();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Convert id to a number before comparison, assuming user.id is a number
    setUser(users?.find((u) => u.id === Number(id)));
  }, [users, loading, id]);

  return <UserComponent user={user} />;
}

export default User;
