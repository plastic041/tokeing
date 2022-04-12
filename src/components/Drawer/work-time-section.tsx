import { Group, NumberInput } from "@mantine/core";

import Section from "./section";
import { useAtom } from "jotai";
import { workTimeAtom } from "../../stores/work-time";

const WorkTimeSection = () => {
  const [workTime, setWorkTime] = useAtom(workTimeAtom);

  return (
    <Section title="근무시간">
      <Group grow>
        <NumberInput
          defaultValue={workTime.hour}
          label="시간"
          min={1}
          value={workTime.hour}
          onChange={(value) => {
            if (value !== undefined) {
              setWorkTime({ ...workTime, hour: value });
            }
          }}
        />
        <NumberInput
          defaultValue={workTime.minute}
          label="분"
          min={0}
          max={59}
          value={workTime.minute}
          onChange={(value) => {
            if (value !== undefined) {
              setWorkTime({ ...workTime, minute: value });
            }
          }}
        />
      </Group>
    </Section>
  );
};

export default WorkTimeSection;
