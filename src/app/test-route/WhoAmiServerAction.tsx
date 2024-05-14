// import React from 'react'
"use client";

import { useEffect, useState } from "react";

const WhoAmiServerAction = ({
  onGetUserAction,
}: {
  onGetUserAction: () => Promise<string | null>;
}) => {
  const [user, setUser] = useState<string | null>();
  useEffect(() => {
    onGetUserAction().then((user) => setUser(user));
  }, []);
  return <div className="mt-5">WhoAm I? (server action): {user}</div>;
};

export default WhoAmiServerAction;
