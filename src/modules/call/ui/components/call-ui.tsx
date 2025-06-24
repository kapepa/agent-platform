import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { FC, useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface CallUIProps {
  meetingName: string,
}

const CallUI: FC<CallUIProps> = (props) => {
  const { meetingName } = props;
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handlerJoin = async () => {
    if (!call) return;
    await call.join();
    setShow("call");
  }

  const handleLeave = () => {
    if (!call) return;
    call.endCall();
    setShow("ended");
  }

  return (
    <StreamTheme>
      {show === "lobby" && <CallLobby onJoin={handlerJoin} />}
      {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  )
}

export { CallUI }