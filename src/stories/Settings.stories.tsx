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
    onSetClickHandler: {
      action: 'Current values will be setted',
      description: 'Set values'
    },
    maxValueLocalOnChange: {
      action: 'Max value will be changed',
      description: 'Max value on change'
    },
    minValueLocalOnChange: {
      action: 'Min value will be changed',
      description: 'Min value on change'
    }
  },
  args: {
    maxValue: '5',
    minValue: '0',
    isMaxValueError: false,
    isMinValueError: false,
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
    isMaxValueError: false,
    isMinValueError: false,
    setButtonDisabled: false
  }
}

export const Error: Story = {
  args: {
    maxValue: '0',
    minValue: '0',
    isMaxValueError: true,
    isMinValueError: true,
    setButtonDisabled: true
  }
};

