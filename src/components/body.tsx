import { Box, Center, Container, Group, Loader, Text } from "@mantine/core";
import { auth } from "~/firebase/auth";

import CallDrawerButton from "~/components/drawer/call-drawer-button";
import ClockInButton from "~/components/clock-in-button";
import ClockList from "~/components/clock-list";
import DrawerWrapper from "~/components/drawer";
import UserInfo from "~/components/user/user-info";
import { useAuthState } from "react-firebase-hooks/auth";

const Body = () => {
  const [user, userLoading, userError] = useAuthState(auth);

  if (userLoading)
    return (
      <Center sx={{ width: "100vw", height: "100vh" }}>
        <Group spacing="sm">
          <Loader />
          <Text component="div">Loading user...</Text>
        </Group>
      </Center>
    );

  if (!user)
    return (
      <Center sx={{ width: "100vw", height: "100vh" }}>
        <UserInfo />
      </Center>
    );
  return (
    <>
      <DrawerWrapper />
      <Container size="xs" p="xs" sx={{ height: "100vh" }}>
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing.xs,
            flexGrow: 1,
            height: "100%",
          })}
        >
          <UserInfo />
          <>
            <Group spacing="xs">
              <ClockInButton />
              <CallDrawerButton />
            </Group>
            <ClockList />
          </>
        </Box>
      </Container>
    </>
  );
};

export default Body;
