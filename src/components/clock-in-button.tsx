import { Button } from "@mantine/core";
import { clocksAtom } from "../stores/clocks";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useAtom } from "jotai";

const ClockInButton = () => {
  const [clocks, setClocks] = useAtom(clocksAtom);

  const onClick = () => {
    setClocks([
      ...clocks,
      {
        id: nanoid(),
        date: dayjs().toISOString(),
      },
    ]);
  };

  return (
    <Button onClick={onClick} sx={() => ({ flexGrow: 1 })} size="lg">
      출근
    </Button>
  );
};

export default ClockInButton;
