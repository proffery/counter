import type { Meta, StoryObj } from '@storybook/react';
import { Display } from '../components/Display';
import { ERROR_MSG } from '../AppWithReduxCounter';


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

  },
  args: {
    displayValue: '0',
    inputError: false,
    addButtonDisabled: true,
    resetButtonDisabled: true
  }
}

export default meta;
type Story = StoryObj<typeof Display>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ValuesIsNotSettedNoErrors: Story = {
  args: {
    displayValue: '0',
    inputError: false,
    addButtonDisabled: true,
    resetButtonDisabled: true
  }
}
export const ValuesIsSettedNoErrors: Story = {
  args: {
    displayValue: '0',
    inputError: false,
    addButtonDisabled: false,
    resetButtonDisabled: true
  }
}

export const MaxValueError: Story = {
  args: {
    displayValue: '5',
    inputError: true,
    addButtonDisabled: true,
    resetButtonDisabled: false
  }
};

export const InputError: Story = {
  args: {
    displayValue: ERROR_MSG,
    inputError: true,
    addButtonDisabled: true,
    resetButtonDisabled: true
  }
};

