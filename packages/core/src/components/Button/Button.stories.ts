import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Button",
  // @ts-ignore
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const PrimaryOutline: Story = {
  args: {
    children: "Primary Outline Button",
    variant: "primary",
    outline: true,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const SecondaryOutline: Story = {
  args: {
    children: "Secondary Outline Button",
    variant: "secondary",
    outline: true,
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Button",
    variant: "warning",
  },
};

export const WarningOutline: Story = {
  args: {
    children: "Warning Outline Button",
    variant: "warning",
    outline: true,
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

export const DangerOutline: Story = {
  args: {
    children: "Danger Outline Button",
    variant: "danger",
    outline: true,
  },
};

export const Info: Story = {
  args: {
    children: "Info Button",
    variant: "info",
  },
};

export const InfoOutline: Story = {
  args: {
    children: "Info Outline Button",
    variant: "info",
    outline: true,
  },
};

export const Dark: Story = {
  args: {
    children: "Dark Button",
    variant: "dark",
  },
};

export const DarkOutline: Story = {
  args: {
    children: "Dark Outline Button",
    variant: "dark",
    outline: true,
  },
};

export const Light: Story = {
  args: {
    children: "Light Button",
    variant: "light",
  },
};

export const LightOutline: Story = {
  args: {
    children: "Light Outline Button",
    variant: "light",
    outline: true,
  },
};

export const Large: Story = {
  args: {
    children: "Button",
    size: "lg",
  },
};

export const Small: Story = {
  args: {
    children: "Button",
    size: "sm",
  },
};
