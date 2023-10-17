import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "./Alert";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Alert",
  // @ts-ignore
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "padded",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // variant: { control: "color" },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: "Alert",
    variant: "primary",
    justify: "center",
    onDismiss: () => {},
    // primary: true,
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Alert",
    variant: "primary",
    onDismiss: undefined,
    // primary: true,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Alert",
    variant: "secondary",
    onDismiss: undefined,
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Alert",
    variant: "warning",
    onDismiss: undefined,
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Alert",
    variant: "danger",
    onDismiss: undefined,
  },
};

export const Info: Story = {
  args: {
    children: "Info Alert",
    variant: "info",
    onDismiss: undefined,
  },
};

export const Dark: Story = {
  args: {
    children: "Dark Alert",
    variant: "dark",
    onDismiss: undefined,
  },
};

export const Light: Story = {
  args: {
    children: "Light Alert",
    variant: "light",
    onDismiss: undefined,
  },
};

export const Large: Story = {
  args: {
    children: "Alert",
    size: "lg",
    onDismiss: () => {},
  },
};

export const Small: Story = {
  args: {
    children: "Alert",
    size: "sm",
    onDismiss: () => {},
  },
};
