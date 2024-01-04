import type { Meta, StoryObj } from '@storybook/react';
import { Screen } from '../components/Screen';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta:  Meta<typeof Screen> = {
  title: 'COUNTER/Screen',
  component: Screen,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    displayValue: {
      defaultValue: '0',
      description: 'Visible text'
    },
    isInputError: {
      defaultValue: false,
      description: "Error condition"
    }
  }
}

export default meta;
type Story = StoryObj<typeof Screen>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    displayValue: 'Normal condition',
    isInputError: false
  },
}

export const Error: Story = {
  args: {
    displayValue: 'Input error',
    isInputError: true
  },
};

