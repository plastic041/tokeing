import {
  ActionIcon,
  Box,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { Settings as IconSettings, X as IconX } from "tabler-icons-react";
import {
  addHour as addTime,
  getClocks,
  isDateSame,
  parseDatePrimary,
  parseDateSecondary,
} from "../utils/date";
import { useEffect, useState } from "react";

import type { Clock } from "../typings/clock";
import { nanoid } from "nanoid/non-secure";
import store from "store2";
import DrawerWrapper from "./Drawer";
import { useAtom } from "jotai";
import { colorSchemeAtom } from "../stores/colorScheme";
import { workTimeAtom } from "../stores/workTime";

const TODAY = new Date();

const Body = () => {
  const [colorScheme] = useAtom(colorSchemeAtom);
  const dark = colorScheme === "dark";

  const [workTime, setWorkTime] = useAtom(workTimeAtom);

  const [opened, setOpened] = useState(false);

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
    <>
      <DrawerWrapper opened={opened} setOpened={setOpened} />
      <Container size="xs" p="xs">
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.xs,
          })}
        >
          <Group spacing="xs">
            <Button
              onClick={onClick}
              sx={(theme) => ({ flexGrow: 1 })}
              size="lg"
            >
              출근
            </Button>
            <ActionIcon onClick={() => setOpened(true)} size="lg">
              <IconSettings />
            </ActionIcon>
          </Group>
          {clocks.length !== 0 && (
            <Paper
              sx={(theme) => ({
                overflow: "hidden",
                backgroundColor: dark ? theme.colors.gray[9] : "white",
              })}
              shadow="xs"
              p="md"
              withBorder={dark}
            >
              <Box
                sx={(theme) => ({
                  display: "flex",
                  flexDirection: "column",
                })}
              >
                {clocks.map((clock, index) => {
                  const clockDate = new Date(clock.date);
                  return (
                    <>
                      <Box
                        key={clock.id}
                        sx={(theme) => ({
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        })}
                      >
                        <Box
                          sx={(theme) => ({
                            display: "flex",
                            flexDirection: "column",
                          })}
                        >
                          <Text
                            weight={isDateSame(TODAY, clockDate) ? 700 : 500}
                          >
                            {parseDatePrimary(clockDate)}
                          </Text>
                          {isDateSame(TODAY, clockDate) && (
                            <Text>
                              +{workTime.hour}:
                              {workTime.minute.toString().padStart(2, "0")}{" "}
                              {parseDateSecondary(
                                addTime(
                                  clockDate,
                                  workTime.hour,
                                  workTime.minute
                                )
                              )}
                            </Text>
                          )}
                        </Box>
                        <ActionIcon
                          size="xl"
                          radius="xl"
                          aria-label="delete"
                          onClick={() => removeClock(clock.id)}
                        >
                          <IconX />
                        </ActionIcon>
                      </Box>
                      {index !== clocks.length - 1 && (
                        <Divider my="xs" variant="dotted" />
                      )}
                    </>
                  );
                })}
              </Box>
            </Paper>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Body;
