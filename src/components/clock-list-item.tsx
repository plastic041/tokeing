import { ActionIcon, Box, Text, createStyles } from "@mantine/core";
import {
  addTime,
  isDateSame,
  parseDatePrimary,
  parseDateSecondary,
} from "../utils/date";

import { Clock } from "../typings/clock";
import { Cancel as IconCancel } from "iconoir-react";
import { TODAY } from "../stores/date";
import { clocksAtom } from "../stores/clocks";
import { useAtom } from "jotai";
import { workTimeAtom } from "../stores/work-time";

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
  },
}));

type Props = {
  clock: Clock;
};

const ClockListItem = ({ clock }: Props) => {
  const clockDate = new Date(clock.date);

  const [workTime] = useAtom(workTimeAtom);

  const [clocks, setClocks] = useAtom(clocksAtom);

  const removeClock = (id: string) => {
    setClocks(clocks.filter((clock) => clock.id !== id));
  };

  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.box}>
        <Text weight={isDateSame(TODAY, clockDate) ? 700 : 500}>
          {parseDatePrimary(clockDate)}
        </Text>
        {isDateSame(TODAY, clockDate) && (
          <Text>
            +{workTime.hour}:{workTime.minute.toString().padStart(2, "0")}{" "}
            {parseDateSecondary(
              addTime(clockDate, workTime.hour, workTime.minute)
            )}
          </Text>
        )}
      </Box>
      <ActionIcon
        size="xl"
        radius="xl"
        aria-label="delete"
        onClick={() => {
          removeClock(clock.id);
        }}
      >
        <IconCancel />
      </ActionIcon>
    </Box>
  );
};

export default ClockListItem;
