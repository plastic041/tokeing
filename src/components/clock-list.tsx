import { Box, Divider, Paper, createStyles } from "@mantine/core";

import ClockListItem from "./clock-list-item";
import { clocksAtom } from "../stores/clocks";
import { colorSchemeAtom } from "../stores/color-scheme";
import { useAtom } from "jotai";

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
    <Paper className={classes.wrapper} shadow="xs" p="md" withBorder={dark}>
      <Box className={classes.box}>
        {clocks.map((clock, index) => (
          <>
            <ClockListItem key={clock.id} clock={clock} />
            {index !== clocks.length - 1 && (
              <Divider my="xs" variant="dotted" />
            )}
          </>
        ))}
      </Box>
    </Paper>
  );
};

export default ClockList;
