import {
  ActionIcon,
  Stack,
  Drawer,
  useMantineColorScheme,
  Text,
  Group,
  Button,
  NumberInput,
} from "@mantine/core";
import { useAtom } from "jotai";
import { MoonStars as IconMoonStars, Sun as IconSun } from "tabler-icons-react";
import { colorSchemeAtom } from "../stores/colorScheme";
import { workTimeAtom } from "../stores/workTime";

type Props = {
  opened: boolean;
  setOpened: (flag: boolean) => void;
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};
const Section = ({ title, children }: SectionProps) => {
  return (
    <Stack spacing="xs">
      <Text size="sm" color="gray">
        {title}
      </Text>
      {children}
    </Stack>
  );
};

const DrawerWrapper = ({ opened, setOpened }: Props) => {
  const [workTime, setWorkTime] = useAtom(workTimeAtom);

  // TODO: atom localStorage
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);
  const dark = colorScheme === "dark";

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="설정"
      padding="md"
      size="md"
    >
      <Stack spacing="xl">
        <Section title="모드">
          <Group grow>
            <Button
              p="xs"
              leftIcon={<IconSun size={16} />}
              onClick={() => setColorScheme("light")}
              variant={dark ? "subtle" : "outline"}
            >
              밝은 모드
            </Button>
            <Button
              p="xs"
              leftIcon={<IconMoonStars size={16} />}
              onClick={() => setColorScheme("dark")}
              variant={dark ? "outline" : "subtle"}
            >
              어두운 모드
            </Button>
          </Group>
        </Section>
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
      </Stack>
    </Drawer>
  );
};

export default DrawerWrapper;
