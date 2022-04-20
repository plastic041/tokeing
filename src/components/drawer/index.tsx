import { Box, Divider, Drawer, Stack, createStyles } from "@mantine/core";

import DarkModeSection from "~/components/drawer/sections/dark-mode";
import LinkSection from "~/components/drawer/sections/link";
import UserSection from "~/components/drawer/sections/user";
import WorkTimeSection from "~/components/drawer/sections/work-time";
import { isDrawerOpenedAtom } from "~/stores/drawer";
import { useAtom } from "jotai";

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
          <UserSection />
        </Stack>
        <LinkSection />
      </Box>
    </Drawer>
  );
};

export default DrawerWrapper;
