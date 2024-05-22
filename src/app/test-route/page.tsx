import React from "react";

import { auth } from "~/auth";
import WhoAmiServerAction from "./WhoAmiServerAction";

const TestRoute = async () => {
  const session = await auth();
  async function onGetUserAction() {
    "use server";
    const session = await auth();
    return session?.user?.name ?? null;
  }

  return (
    <div>
      <h1>Test Route</h1>
      <div>User: {session?.user?.name}</div>
      <div>
        <WhoAmiServerAction onGetUserAction={onGetUserAction} />
      </div>
    </div>
  );
};

export default TestRoute;
