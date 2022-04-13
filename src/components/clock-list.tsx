import { Box, Divider, Paper, createStyles, ScrollArea } from "@mantine/core";

import ClockListItem from "./clock-list-item";
import { clocksAtom } from "../stores/clocks";
import { colorSchemeAtom } from "../stores/color-scheme";
import { useAtom } from "jotai";
import { Fragment } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    overflow: "hidden",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.gray[9] : "#fff",
  },
  box: {
    display: "flex",
    flexDirection: "column",
  },
}));

const ClockList = () => {
  const [colorScheme] = useAtom(colorSchemeAtom);
  const dark = colorScheme === "dark";

  const [clocks] = useAtom(clocksAtom);

  const { classes } = useStyles();

  return (
    <ScrollArea sx={{ flexGrow: 1 }}>
      <Paper className={classes.wrapper} shadow="xs" p="md" withBorder={dark}>
        <Box className={classes.box}>
          {clocks.map((clock, index) => (
            <Fragment key={clock.id}>
              <ClockListItem clock={clock} />
              {index !== clocks.length - 1 && <Divider my="xs" />}
            </Fragment>
          ))}
        </Box>
      </Paper>
    </ScrollArea>
  );
};

export default ClockList;
