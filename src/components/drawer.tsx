import { ActionIcon, Box, Divider, Drawer, Group, Stack } from "@mantine/core";

import DarkModeSection from "./drawer/dark-mode-section";
import WorkTimeSection from "./drawer/work-time-section";
import { isDrawerOpenedAtom } from "../stores/drawer";
import { useAtom } from "jotai";
import { GitHub as IconGitHub } from "iconoir-react";

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
      sx={{
        "& > .mantine-Drawer-drawer": {
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing="xl">
          <Divider />
          <DarkModeSection />
          <WorkTimeSection />
        </Stack>
        <Group position="right">
          <ActionIcon size="lg">
            <IconGitHub />
          </ActionIcon>
        </Group>
      </Box>
    </Drawer>
  );
};

export default DrawerWrapper;
