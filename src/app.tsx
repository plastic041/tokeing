import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Global,
} from "@mantine/core";
import { useAtom } from "jotai";
import Body from "~/components/body";
import { colorSchemeAtom } from "~/stores/color-scheme";

const App = () => {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <Global
          styles={(theme) => ({
            body: {
              backgroundColor:
                colorScheme === "dark"
                  ? theme.colors.dark[7]
                  : theme.colors.gray[2],
            },
          })}
        />
        <Body />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
