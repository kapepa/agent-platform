"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const {
    data: session,
  } = authClient.useSession()

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlerReset = () => {
    setName("");
    setEmail("");
    setPassword("")
  }

  const handlerSubbmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        alert("Success");
        handlerReset()
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    });
  }

  const handlerLogin = () => {
    authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: (ctx) => {
        alert("Success");
        handlerReset()
      },
      onError: (ctx) => {
        // display the error message
        alert(ctx.error.message);
      },
    });
  }

  if (session) {
    return (
      <div
        className="flex flex-col p-4 gap-y-4"
      >
        <p>Logged in as {session.user.name}</p>
        <Button
          type="button"
          onClick={() => authClient.signOut()}
        >
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col gap-y-10"
    >
      <div
        className="p-4 flex flex-col gap-y-4"
      >
        <Input
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          onClick={handlerSubbmit}
        >
          Create user
        </Button>
      </div>
      <div
        className="p-4 flex flex-col gap-y-4"
      >
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          onClick={handlerLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
