import { ActionIcon, Box, Group, Text, createStyles } from "@mantine/core";
import {
  Cancel as IconCancel,
  EditPencil as IconEditPencil,
} from "iconoir-react";
import { addTime, parseDatePrimary, parseDateSecondary } from "~/utils/date";

import { Clock } from "~/typings/clock";
import ClockListItemModal from "./modal";
import { TODAY } from "~/stores/date";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useState } from "react";
import { workTimeAtom } from "~/stores/work-time";

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

type ClockListItemProps = {
  clock: Clock;
  userId: string;
  onRemove: (id: string) => void;
};

const ClockListItem = ({ clock, onRemove }: ClockListItemProps) => {
  const { classes } = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const [workTime] = useAtom(workTimeAtom);

  const dayjsClock = dayjs(clock.date);
  const isToday = dayjsClock.isSame(TODAY, "day");

  return (
    <Box className={classes.wrapper}>
      <ClockListItemModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        clock={clock}
      />
      <Box className={classes.box}>
        <Text weight={isToday ? 700 : 500}>{parseDatePrimary(dayjsClock)}</Text>
        {isToday && (
          <Text>
            +{workTime.hour}:{workTime.minute.toString().padStart(2, "0")}{" "}
            {parseDateSecondary(
              addTime(dayjsClock, workTime.hour, workTime.minute)
            )}
          </Text>
        )}
      </Box>
      <Group spacing="xs">
        <ActionIcon
          size="xl"
          radius="xl"
          aria-label="delete"
          onClick={() => setModalOpen(true)}
        >
          <IconEditPencil height={30} width={30} />
        </ActionIcon>
        <ActionIcon
          size="xl"
          radius="xl"
          aria-label="delete"
          onClick={() => onRemove(clock.id)}
        >
          <IconCancel height={30} width={30} />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default ClockListItem;
