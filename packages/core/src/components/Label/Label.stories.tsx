import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";
import { Input } from "..";
import { FormGroup } from "../FormGroup";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Label",
  // @ts-ignore
  component: Label,
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
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

//👇 The ListTemplate construct will be spread to the existing stories.
const Template: Story = {
  render: (args) => {
    return (
      <FormGroup>
        <Label {...args} />
        <Input />
      </FormGroup>
    );
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  ...Template,
  args: {
    children: "Last Name",
    size: "md",
  },
};
