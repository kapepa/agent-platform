import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface AvatarUriProps {
  seed: string,
  variant: "botttsNeutral" | "initials",
}

export const generateAvatarUri = (props: AvatarUriProps) => {
  let avatar;
  const { seed, variant } = props;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });
  }

  return avatar.toDataUri();
}