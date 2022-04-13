import {
  ActionIcon,
  Box,
  createStyles,
  Divider,
  Drawer,
  Group,
  Stack,
} from "@mantine/core";

import DarkModeSection from "./drawer/dark-mode-section";
import WorkTimeSection from "./drawer/work-time-section";
import { isDrawerOpenedAtom } from "../stores/drawer";
import { useAtom } from "jotai";
import LinkSection from "./drawer/link-section";

const useStyles = createStyles({
  drawer: {
    "& > .mantine-Drawer-drawer": {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
    },
  },

  box: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const DrawerWrapper = () => {
  const [opened, setOpened] = useAtom(isDrawerOpenedAtom);
  const { classes } = useStyles();

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title="설정"
      padding="md"
      size="md"
      className={classes.drawer}
    >
      <Box className={classes.box}>
        <Stack spacing="xl">
          <Divider />
          <DarkModeSection />
          <WorkTimeSection />
        </Stack>
        <LinkSection />
      </Box>
    </Drawer>
  );
};

export default DrawerWrapper;
