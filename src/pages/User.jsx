import React, { useState, useEffect } from "react";
import { User as UserComponent } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function User() {
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setUser(users?.find((u) => u.id === Number(id)));
  }, [users, id]);

  return <UserComponent user={user} />;
}

export default User;
