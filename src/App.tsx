import {
  addHour,
  getClocks,
  isDateSame,
  parseDatePrimary,
  parseDateSecondary,
} from "./utils/date";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import type { Clock } from "./typings/clock";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid/non-secure";
import store from "store2";

const TODAY = new Date();
const WORK_HOUR = 9;

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
        date: new Date().toString(),
      },
    ]);
  };

  useEffect(() => {
    store.set("clocks", JSON.stringify(clocks));
  }, [clocks]);

  return (
    <Container
      maxWidth="xs"
      sx={(theme) => ({
        padding: theme.spacing(1),
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        })}
      >
        <Button
          variant="contained"
          onClick={onClick}
          sx={{ width: "100%" }}
          size="large"
        >
          출근
        </Button>
        {clocks.length !== 0 && (
          <Paper sx={{ overflow: "hidden" }}>
            <List
              sx={(theme) => ({
                width: "100%",
                bgcolor: theme.palette.background.paper,
              })}
            >
              {clocks.map((clock) => {
                const clockDate = new Date(clock.date);
                return (
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
                    <ListItemText
                      primary={parseDatePrimary(clockDate)}
                      primaryTypographyProps={{
                        fontWeight: isDateSame(TODAY, clockDate)
                          ? "fontWeightBold"
                          : "fontWeightRegular",
                      }}
                      secondary={
                        isDateSame(TODAY, clockDate) &&
                        `+${WORK_HOUR}:00 ${parseDateSecondary(
                          addHour(clockDate, WORK_HOUR)
                        )}`
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default App;
