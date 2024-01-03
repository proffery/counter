import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta:  Meta<typeof Button> = {
  title: 'COUNTER/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: {
      description: 'Button clicked',
      action: 'clicked'
    }
  },
}

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Enabled: Story = {
  args: {
    name: "Enabled",
    isDisabled: false,
    type: 'button'
  },
};

export const Disabled: Story = {
  args: {
    name: "Disabled",
    isDisabled: true,
    type: 'button'
  },
};
