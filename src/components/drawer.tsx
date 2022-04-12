import { Drawer, Stack } from "@mantine/core";

import DarkModeSection from "./Drawer/dark-mode-section";
import WorkTimeSection from "./drawer/work-time-section";
import { isDrawerOpenedAtom } from "../stores/drawer";
import { useAtom } from "jotai";

const DrawerWrapper = () => {
  const [opened, setOpened] = useAtom(isDrawerOpenedAtom);

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title="설정"
      padding="md"
      size="md"
    >
      <Stack spacing="xl">
        <DarkModeSection />
        <WorkTimeSection />
      </Stack>
    </Drawer>
  );
};

export default DrawerWrapper;
