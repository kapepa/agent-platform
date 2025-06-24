
import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { Routers } from "@/types/routers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";

const SignUp: FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect(Routers.SignIn)
  }

  return (
    <SignUpView />
  )
}

export default SignUp;