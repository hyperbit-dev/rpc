import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../Input";
import { InputGroup } from "./InputGroup";
import { InputGroupAppend } from "./InputGroupAppend";
import { InputGroupPrepend } from "./InputGroupPrepend";
import { Button } from "..";
import { FormGroup } from "../FormGroup";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/InputGroup",
  // @ts-ignore
  component: InputGroup,
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
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

//👇 The ListTemplate construct will be spread to the existing stories.
const Template: Story = {
  render: ({ ...args }) => {
    return (
      <>
        <FormGroup>
          <InputGroup {...args} flush={false}>
            <Input />
            <Button>{`flush="false"`}</Button>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup {...args} flush={false}>
            <InputGroupAppend>$</InputGroupAppend>
            <Input />
            <InputGroupPrepend>Not Flush</InputGroupPrepend>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup {...args}>
            <InputGroupAppend>$</InputGroupAppend>
            <Input />
            <InputGroupPrepend>%</InputGroupPrepend>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup {...args} inset>
            <InputGroupAppend>$</InputGroupAppend>
            <Input />
            <InputGroupPrepend>%</InputGroupPrepend>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup variant="primary" {...args}>
            <InputGroupAppend>$</InputGroupAppend>
            <Input />
            <InputGroupPrepend>%</InputGroupPrepend>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup variant="primary" {...args} inset>
            <InputGroupAppend>$</InputGroupAppend>
            <Input />
            <InputGroupPrepend>%</InputGroupPrepend>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup {...args}>
            <InputGroupAppend>$</InputGroupAppend>
            <InputGroupAppend>$</InputGroupAppend>
            <Input />
            <InputGroupPrepend>%</InputGroupPrepend>
            <InputGroupPrepend>%</InputGroupPrepend>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup {...args}>
            <Button variant="warning">Button</Button>
            <InputGroupAppend>$</InputGroupAppend>
            <Button variant="light">Button</Button>
            <Input />
            <InputGroupPrepend>%</InputGroupPrepend>
            <Button variant="secondary">Button</Button>
            <Button variant="primary">Button</Button>
            <Button variant="dark">Button</Button>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup {...args}>
            <Button outline variant="warning">
              Button
            </Button>
            <InputGroupAppend>$</InputGroupAppend>
            <Button outline variant="light">
              Button
            </Button>
            <Input />
            <InputGroupPrepend>%</InputGroupPrepend>
            <Button outline variant="secondary">
              Button
            </Button>
            <Button outline variant="primary">
              Button
            </Button>
            <Button outline variant="dark">
              Button
            </Button>
          </InputGroup>
        </FormGroup>
      </>
    );
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  ...Template,
  args: {
    size: "md",
  },
};

// export const Primary: Story = {
//   args: {
//     children: "Primary InputGroup",
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
