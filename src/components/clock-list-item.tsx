import { ActionIcon, Box, Group, Text, createStyles } from "@mantine/core";
import {
  Cancel as IconCancel,
  EditPencil as IconEditPencil,
} from "iconoir-react";
import {
  addTime,
  isDateSame,
  parseDatePrimary,
  parseDateSecondary,
} from "../utils/date";

import { Clock } from "../typings/clock";
import { TODAY } from "../stores/date";
import { clocksAtom } from "../stores/clocks";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useState } from "react";
import { workTimeAtom } from "../stores/work-time";
import ClockListItemModal from "./clock-list-item-modal";

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
  const [modalOpened, setModalOpened] = useState(false);

  const clockDate = new Date(clock.date);

  const isToday = isDateSame(clockDate, TODAY);

  const [workTime] = useAtom(workTimeAtom);
  const [_, setClocks] = useAtom(clocksAtom);

  const { classes } = useStyles();

  const removeClock = (id: string) => {
    setClocks((clocks) => clocks.filter((clock) => clock.id !== id));
  };

  const onChangeHour = (value: number) => {
    setClocks((clocks) =>
      clocks.map((c) => {
        if (c.id === clock.id) {
          return {
            ...c,
            date: dayjs(clock.date).hour(value).toISOString(),
          };
        }
        return clock;
      })
    );
  };

  const onChangeMinute = (value: number) => {
    setClocks((clocks) =>
      clocks.map((c) => {
        if (c.id === clock.id) {
          return {
            ...c,
            date: dayjs(clock.date).minute(value).toISOString(),
          };
        }
        return clock;
      })
    );
  };

  return (
    <Box className={classes.wrapper}>
      <ClockListItemModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        clockDate={clockDate}
        onChangeHour={onChangeHour}
        onChangeMinute={onChangeMinute}
      />
      <Box className={classes.box}>
        <Text weight={isToday ? 700 : 500}>{parseDatePrimary(clockDate)}</Text>
        {isToday && (
          <Text>
            +{workTime.hour}:{workTime.minute.toString().padStart(2, "0")}{" "}
            {parseDateSecondary(
              addTime(clockDate, workTime.hour, workTime.minute)
            )}
          </Text>
        )}
      </Box>
      <Group spacing="xs">
        <ActionIcon
          size="xl"
          radius="xl"
          aria-label="edit"
          onClick={() => setModalOpened(true)}
        >
          <IconEditPencil />
        </ActionIcon>
        <ActionIcon
          size="xl"
          radius="xl"
          aria-label="delete"
          onClick={() => {
            removeClock(clock.id);
          }}
        >
          <IconCancel height={30} width={30} />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default ClockListItem;
