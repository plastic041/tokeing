import { nanoid } from "nanoid/non-secure";
import { useEffect, useState } from "react";
import store from "store2";

type Clock = {
  id: string;
  time: string;
};

const getClocks = () => {
  const clocks: Clock[] = JSON.parse(store.get("clocks") || "[]");
  return clocks;
};

const parseDatetime = (dateString: string) => {
  // parse Date to MM월 DD일 HH시 mm분
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${month}월 ${day}일: ${hour}시 ${minute}분`;
};

const App = () => {
  const [clocks, setClocks] = useState<Clock[]>(getClocks());
  const removeClock = (id: string) => {
    setClocks(clocks.filter((clock) => clock.id !== id));
  };

  const onClick = () => {
    setClocks([
      ...clocks,
      {
        id: nanoid(),
        time: new Date().toString(),
      },
    ]);
  };

  useEffect(() => {
    store.set("clocks", JSON.stringify(clocks));
  }, [clocks]);

  return (
    <div>
      <ul style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        {clocks.map((clock) => (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <li key={clock.id}>{parseDatetime(clock.time)}</li>
            <button type="button" onClick={() => removeClock(clock.id)}>
              ❌
            </button>
          </div>
        ))}
      </ul>
      <button onClick={onClick}>출근</button>
    </div>
  );
};

export default App;
