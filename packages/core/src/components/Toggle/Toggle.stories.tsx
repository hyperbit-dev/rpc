import type { Meta, StoryObj } from "@storybook/react";

import { Toggle } from "./Toggle";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Toggle",
  // @ts-ignore
  component: Toggle,
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
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Toggle',
    variant: 'secondary',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning'
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger'
  },
};

export const Info: Story = {
  args: {
    variant: 'info'
  },
};
