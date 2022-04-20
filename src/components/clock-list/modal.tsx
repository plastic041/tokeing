import {
  Button,
  Center,
  Group,
  Loader,
  Modal,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";

import { Clock } from "~/typings/clock";
import { auth } from "~/firebase/auth";
import dayjs from "dayjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListVals } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { db, writeClocks } from "~/firebase/rtdb";
import { useState } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
  clock: Clock;
};

const ClockListItemModal = ({ opened, onClose, clock }: Props) => {
  const { id, date } = clock;
  const _clock = dayjs(date);
  const [hour, setHour] = useState(_clock.hour());
  const [minute, setMinute] = useState(_clock.minute());

  const [user, userLoading] = useAuthState(auth);
  const [clocks, clocksLoading, clocksError] = useListVals<Clock>(
    ref(db, user ? `users/${user.uid}/` : undefined)
  );

  if (clocksError) return <div>정보를 불러오는 중 에러가 발생했습니다.</div>;
  if (!clocks) return <></>;
  if (!user || userLoading) {
    return <Loader />;
  }

  const onSubmit = () => {
    const newDate = _clock.hour(hour).minute(minute).toISOString();
    const newClock = {
      ...clock,
      date: newDate,
    };

    const newClocks = clocks.map((clock) => {
      if (clock.id === id) {
        return newClock;
      }
      return clock;
    });

    writeClocks(user.uid, newClocks as Clock[]);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      title={
        <Group spacing={0}>
          <Text weight={700} color="blue">
            {_clock.locale("ko").format("M월 D일(ddd)")}
          </Text>
          <Text weight={500}>의 출근 시간 수정</Text>
        </Group>
      }
    >
      {clocksLoading && (
        <Center>
          <Loader />
        </Center>
      )}
      <Stack>
        <Group noWrap>
          <NumberInput
            label="시"
            value={hour}
            min={0}
            max={23}
            onChange={(value) => setHour(value as number)}
            stepHoldDelay={500}
            stepHoldInterval={100}
          />
          <NumberInput
            label="분"
            value={minute}
            min={0}
            max={59}
            onChange={(value) => setMinute(value as number)}
            stepHoldDelay={500}
            stepHoldInterval={100}
          />
        </Group>
        <Group>
          <Button variant="default" onClick={onClose}>
            취소
          </Button>
          <Button variant="filled" onClick={onSubmit}>
            저장
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ClockListItemModal;
