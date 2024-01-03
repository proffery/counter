import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta:  Meta<typeof Input> = {
  title: 'COUNTER/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onChange: {
      description: 'Value changed',
      action: 'changed'
    }
  },
}

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    label: "Normal",
    isInputError: false,
    value: '1'
  },
}

export const Error: Story = {
  args: {
    label: "With Error",
    isInputError: true,
    value: '-1'
  },
};

