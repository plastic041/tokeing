import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import { nanoid } from "nanoid/non-secure";
import store from "store2";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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
    <Container>
      <Button variant="contained" onClick={onClick}>
        출근
      </Button>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {clocks.map((clock) => (
          <ListItem
            key={clock.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeClock(clock.id)}
              >
                <ClearIcon />
              </IconButton>
            }
          >
            <ListItemText primary={parseDatetime(clock.time)} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
