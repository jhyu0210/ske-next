import { redirect } from "next/navigation";
import { auth } from "~/auth";
import LoginForm from "~/components/LoginForm";

const loginForm = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <LoginForm />;
};

export default loginForm;
