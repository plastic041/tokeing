import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Global,
} from "@mantine/core";
import Body from "./components/Body";
import { useAtom } from "jotai";
import { colorSchemeAtom } from "./stores/colorScheme";

const App = () => {
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme, fontFamily: "Pretendard, 'sans-serif'" }}
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
