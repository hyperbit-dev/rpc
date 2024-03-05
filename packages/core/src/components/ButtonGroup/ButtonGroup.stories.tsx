import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { ButtonGroup } from "./ButtonGroup";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/ButtonGroup",
  // @ts-ignore
  component: ButtonGroup,
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
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

//👇 The ListTemplate construct will be spread to the existing stories.
const Template: Story = {
  render: ({ ...args }) => {
    return (
      <ButtonGroup {...args}>
        <Button variant="primary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="warning">Three</Button>
        <Button variant="danger">Four</Button>
      </ButtonGroup>
    );
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  ...Template,
  args: {
    flush: true,
    rounded: "md",
    size: "md",
    variant: "primary",
    outline: false,
  },
};

// export const Primary: Story = {
//   args: {
//     children: "Primary ButtonGroup",
//     variant: "primary",
//     onDismiss: undefined,
//     // primary: true,
//   },
// };

// export const Secondary: Story = {
//   args: {
//     children: "",
//   },
// };
