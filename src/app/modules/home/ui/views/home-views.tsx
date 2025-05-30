"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Routers } from "@/types/routers";
import { useRouter } from "next/navigation";

function HomeView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div
      className="flex flex-col p-4 gap-y-4"
    >
      <p>Logged is as {session?.user.name}</p>
      <Button
        type="button"
        onClick={() => authClient.signOut({
          fetchOptions: {
            onSuccess: () => router.push(Routers.SignIn)
          }
        })}
      >
        Sign out
      </Button>
    </div>
  );
}

export { HomeView }