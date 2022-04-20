import { Avatar, Button, Group, Text } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signIn, signOut } from "~/firebase/auth";

const UserInfo = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Button onClick={signIn}>로그인</Button>;
  }

  const displayName = user.displayName || user.email || "";
  const photoUrl = user.photoURL;
  return (
    <Group sx={{ justifyContent: "space-between" }}>
      <Group>
        <Avatar src={photoUrl}>{displayName.slice(0, 3)}</Avatar>
        <Text>{displayName}</Text>
      </Group>
      <Button onClick={signOut} variant="outline">
        로그아웃
      </Button>
    </Group>
  );
};

export default UserInfo;
