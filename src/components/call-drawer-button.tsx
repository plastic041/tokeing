import { ActionIcon } from "@mantine/core";
import { Settings as IconSettings } from "iconoir-react";
import { isDrawerOpenedAtom } from "../stores/drawer";
import { useAtom } from "jotai";

const CallDrawerButton = () => {
  const [_, setIsDrawerOpened] = useAtom(isDrawerOpenedAtom);

  return (
    <ActionIcon
      onClick={() => {
        setIsDrawerOpened(true);
      }}
      size="lg"
    >
      <IconSettings />
    </ActionIcon>
  );
};

export default CallDrawerButton;
