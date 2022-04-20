import { db, writeClocks } from "~/firebase/rtdb";

import { Button } from "@mantine/core";
import { Clock } from "~/typings/clock";
import { User } from "firebase/auth";
import { auth } from "~/firebase/auth";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListVals } from "react-firebase-hooks/database";

const ClockInButton = () => {
  const [user] = useAuthState(auth);
  const [clocks] = useListVals<Clock>(
    ref(db, user ? `users/${user.uid}/` : undefined)
  );

  const onClick = () => {
    const newClocks = [
      ...(clocks as Clock[]),
      { id: nanoid(), date: dayjs().toISOString() },
    ];

    writeClocks((user as User).uid, newClocks);
  };

  return (
    <Button onClick={onClick} sx={() => ({ flexGrow: 1 })} size="lg">
      출근
    </Button>
  );
};

export default ClockInButton;
