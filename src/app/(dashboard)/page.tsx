import { auth } from "@/lib/auth";
import { HomeView } from "../modules/home/ui/views/home-views";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Routers } from "@/types/routers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routers.SignIn)
  }

  return (
    <HomeView />
  );
}
