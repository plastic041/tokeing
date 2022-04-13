import {
  ActionIcon,
  Box,
  Text,
  createStyles,
  Transition,
  Group,
  Modal,
  NumberInput,
} from "@mantine/core";
import {
  addTime,
  isDateSame,
  parseDatePrimary,
  parseDateSecondary,
} from "../utils/date";

import { Clock } from "../typings/clock";
import {
  Cancel as IconCancel,
  EditPencil as IconEditPencil,
} from "iconoir-react";
import { TODAY } from "../stores/date";
import { clocksAtom } from "../stores/clocks";
import { useAtom } from "jotai";
import { workTimeAtom } from "../stores/work-time";
import { useState } from "react";

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

  const [workTime] = useAtom(workTimeAtom);
  const [clocks, setClocks] = useAtom(clocksAtom);

  const { classes } = useStyles();

  const removeClock = (id: string) => {
    setClocks(clocks.filter((clock) => clock.id !== id));
  };

  const editClock = (id: string) => {};

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
      <Group>
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
          <IconCancel />
        </ActionIcon>
      </Group>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
        <Group noWrap>
          <NumberInput label="시" />
          <NumberInput label="분" />
        </Group>
      </Modal>
    </Box>
  );
};

export default ClockListItem;
