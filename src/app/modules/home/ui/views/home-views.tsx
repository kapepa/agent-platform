"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { Routers } from "@/types/routers";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function HomeView() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Karma" }))

  return (
    <div
      className="flex flex-col p-4 gap-y-4"
    >

    </div>
  );
}

export { HomeView }