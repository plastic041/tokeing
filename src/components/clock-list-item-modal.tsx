import { Group, Modal, NumberInput, Text } from "@mantine/core";

import dayjs from "dayjs";

type Props = {
  opened: boolean;
  onClose: () => void;
  clockDate: Date;
  onChangeHour: (value: number) => void;
  onChangeMinute: (value: number) => void;
};

const ClockListItemModal = ({
  opened,
  onClose,
  clockDate,
  onChangeHour,
  onChangeMinute,
}: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group spacing={0}>
          <Text weight={700} color="blue">
            {dayjs(clockDate).locale("ko").format("M월 D일(ddd)")}
          </Text>
          <Text weight={500}>의 출근 시간 수정</Text>
        </Group>
      }
    >
      <Group noWrap>
        <NumberInput
          label="시"
          value={dayjs(clockDate).hour()}
          min={0}
          max={23}
          onChange={onChangeHour}
          stepHoldDelay={500}
          stepHoldInterval={100}
        />
        <NumberInput
          label="분"
          value={dayjs(clockDate).minute()}
          min={0}
          max={59}
          onChange={onChangeMinute}
          stepHoldDelay={500}
          stepHoldInterval={100}
        />
      </Group>
    </Modal>
  );
};

export default ClockListItemModal;
