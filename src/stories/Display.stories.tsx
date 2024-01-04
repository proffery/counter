import type { Meta, StoryObj } from '@storybook/react';
import { Display } from '../components/Display';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Display> = {
  title: 'COUNTER/Display',
  component: Display,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  //ore on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    increaseScreenValue: {
      action: 'Current screen value will be increased',
      description: 'Increase values'
    },
    resetScreenValue: {
      action: 'Current screen value will be reseted',
      description: 'Reset screen value'
    },
    setIsAddButtonDisabled: {
      action: '"Add" button will be disabled',
      description: 'Disable "Add" button'
    }
  },
  args: {
    maxValue: '5',
    screenValue: '0',
    inputError: false,
    setButtonDisabled: true,
    addButtonDisabled: true,
    resetButtonDisabled: true
  }
}

export default meta;
type Story = StoryObj<typeof Display>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ValuesIsNotSettedNoErrors: Story = {
  args: {
    maxValue: '5',
    screenValue: '0',
    inputError: false,
    setButtonDisabled: false,
    addButtonDisabled: true,
    resetButtonDisabled: true
  }
}
export const ValuesIsSettedNoErrors: Story = {
  args: {
    maxValue: '5',
    screenValue: '0',
    inputError: false,
    setButtonDisabled: true,
    addButtonDisabled: false,
    resetButtonDisabled: true
  }
}

export const MaxValueError: Story = {
  args: {
    maxValue: '5',
    screenValue: '5',
    inputError: true,
    setButtonDisabled: true,
    addButtonDisabled: true,
    resetButtonDisabled: false
  }
};

export const InputError: Story = {
  args: {
    inputError: true,
    setButtonDisabled: true,
    addButtonDisabled: true,
    resetButtonDisabled: true
  }
};

