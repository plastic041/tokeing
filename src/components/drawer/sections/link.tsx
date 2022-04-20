import { ActionIcon, Group } from "@mantine/core";
import { GitHub as IconGitHub } from "iconoir-react";
import React from "react";

type Link = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

const LINKS: Link[] = [
  {
    title: "GitHub",
    href: "https://github.com/plastic041/tokeing",
    icon: <IconGitHub />,
  },
];

const LinkSection = () => {
  return (
    <Group position="right">
      {LINKS.map(({ title, href, icon }) => (
        <ActionIcon
          component="a"
          size="lg"
          key={title}
          href={href}
          aria-label={title}
        >
          {icon}
        </ActionIcon>
      ))}
    </Group>
  );
};

export default LinkSection;
