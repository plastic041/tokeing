import {
  Box,
  Center,
  Divider,
  Loader,
  Paper,
  ScrollArea,
  createStyles,
  Transition,
} from "@mantine/core";
import { db, writeClocks } from "~/firebase/rtdb";

import { Clock } from "~/typings/clock";
import ClockListItem from "~/components/clock-list/item";
import { Fragment } from "react";
import { User } from "firebase/auth";
import { auth } from "~/firebase/auth";
import { colorSchemeAtom } from "~/stores/color-scheme";
import { ref } from "firebase/database";
import { useAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListVals } from "react-firebase-hooks/database";

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

  const { classes } = useStyles();

  const [user] = useAuthState(auth);
  const [clocks, clocksLoading, clocksError] = useListVals<Clock>(
    ref(db, user ? `users/${user.uid}/` : undefined)
  );

  if (clocksError) return <div>Error loading clocks</div>;
  if (!clocks) return <></>;

  const onRemove = (id: string) => {
    const newClocks = clocks.filter((clock) => clock.id !== id);
    writeClocks(user!.uid, newClocks);
  };

  return (
    <ScrollArea sx={{ flexGrow: 1 }}>
      <Paper className={classes.wrapper} shadow="xs" p="md" withBorder={dark}>
        {clocksLoading ? (
          <Center>
            <Loader />
          </Center>
        ) : clocks.length === 0 ? (
          <Center>
            <Box sx={{ fontSize: "lg" }}>출근 버튼을 눌러주세요.</Box>
          </Center>
        ) : (
          <Box className={classes.box}>
            {clocks.map((clock, index) => (
              <Fragment key={clock.id}>
                <ClockListItem
                  clock={clock}
                  userId={(user as User).uid}
                  onRemove={onRemove}
                />
                {index !== clocks.length - 1 && <Divider my="xs" />}
              </Fragment>
            ))}
          </Box>
        )}
      </Paper>
    </ScrollArea>
  );
};

export default ClockList;
