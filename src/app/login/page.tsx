import { redirect } from "next/navigation";
import { auth } from "~/auth";
import LoginForm from "~/app/login/LoginForm";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";

const loginForm = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <MaxWidthWrapper>
      <LoginForm />;
    </MaxWidthWrapper>
  );
};

export default loginForm;
