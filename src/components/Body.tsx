import { Box, Container, Group } from "@mantine/core";

import CallDrawerButton from "./call-drawer-button";
import ClockInButton from "./clock-in-button";
import ClockList from "./clock-list";
import DrawerWrapper from "./drawer";
import { clocksAtom } from "../stores/clocks";
import { useAtom } from "jotai";

const Body = () => {
  const [clocks] = useAtom(clocksAtom);

  return (
    <>
      <DrawerWrapper />
      <Container size="xs" p="xs">
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.xs,
          })}
        >
          <Group spacing="xs">
            <ClockInButton />
            <CallDrawerButton />
          </Group>
          {clocks.length > 0 && <ClockList />}
        </Box>
      </Container>
    </>
  );
};

export default Body;
