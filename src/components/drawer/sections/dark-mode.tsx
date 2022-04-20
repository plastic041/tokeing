import { Button, Group } from "@mantine/core";
import {
  HalfMoon as IconHalfMoon,
  SunLight as IconSunLight,
} from "iconoir-react";

import Section from "~/components/drawer/sections/section";
import { colorSchemeAtom } from "~/stores/color-scheme";
import { useAtom } from "jotai";

const DarkModeSection = () => {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);
  const dark = colorScheme === "dark";

  return (
    <Section title="모드">
      <Group grow>
        <Button
          p="xs"
          leftIcon={<IconSunLight />}
          onClick={() => {
            setColorScheme("light");
          }}
          variant={dark ? "subtle" : "outline"}
        >
          밝은 모드
        </Button>
        <Button
          p="xs"
          leftIcon={<IconHalfMoon />}
          onClick={() => {
            setColorScheme("dark");
          }}
          variant={dark ? "outline" : "subtle"}
        >
          어두운 모드
        </Button>
      </Group>
    </Section>
  );
};

export default DarkModeSection;
