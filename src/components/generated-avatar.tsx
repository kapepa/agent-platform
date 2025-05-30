import { FC } from "react";
import { createAvatar } from "@dicebear/core";
import { initials, botttsNeutral } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface GeneratedAvatarProps {
  seed: string,
  className?: string,
  variant: "initials" | "botttsNeutral"
}

const GeneratedAvatar: FC<GeneratedAvatarProps> = (props) => {
  let avatar;
  const { seed, variant, className } = props;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(
      initials,
      {
        seed,
        fontWeight: 500,
        fontSize: 42,
      }
    )
  }

  return (
    <Avatar
      className={cn(className)}
    >
      <AvatarImage
        src={avatar.toDataUri()}
        alt="avatar"
      />
      <AvatarFallback>
        {seed.charAt(0).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}

export { GeneratedAvatar }