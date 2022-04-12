import { Stack, Text } from "@mantine/core";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <Stack spacing="xs">
    <Text size="sm" color="gray">
      {title}
    </Text>
    {children}
  </Stack>
);

export default Section;
