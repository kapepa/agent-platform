import { SignInView } from "@/app/modules/auth/ui/views/sign-in-view";
import { auth } from "@/lib/auth";
import { Routers } from "@/types/routers";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FC } from "react";

const SignIn: FC = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect(Routers.SignIn)
  }

  return (
    <SignInView />
  )
}

export default SignIn;