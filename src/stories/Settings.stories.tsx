import type { Meta, StoryObj } from '@storybook/react';
import { Settings } from '../components/Settings';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Settings> = {
  title: 'COUNTER/Settings',
  component: Settings,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  //ore on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    setValues: {
      action: 'Current values is send',
      description: 'Set values'
    },
    setInputError: {
      action: 'Global error condition will be seted',
      description: 'Set error'
    },
    setIsSetButtonDisabled: {
      action: '"Set" button will be disabled',
      description: 'Disable "Set" button'
    }
  },
  args: {
    maxValue: '5',
    minValue: '0',
    setButtonDisabled: false
  }
}

export default meta;
type Story = StoryObj<typeof Settings>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    maxValue: '5',
    minValue: '0',
    setButtonDisabled: false
  }
}

export const Error: Story = {
  args: {
    maxValue: '0',
    minValue: '0',
    setButtonDisabled: true
  }
};

