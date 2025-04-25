import type { Meta, StoryObj } from "@storybook/react";
import { ActionButton } from "./ActionButton";
import { Icon } from "../../enums";

const meta = {
  title: "Components/ActionButtons",
  component: ActionButton,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteActionButton: Story = {
  args: {
    icon: Icon.Delete,
    onClick: () => console.log("onClick"),
  },
};
export const AddActionButton: Story = {
  args: {
    icon: Icon.Add,
    onClick: () => console.log("onClick"),
  },
};
export const EditActionButton: Story = {
  args: {
    icon: Icon.Edit,
    onClick: () => console.log("onClick"),
  },
};
export const FilterActionButton: Story = {
  args: {
    icon: Icon.Filter,
    onClick: () => console.log("onClick"),
  },
};
export const CollapseActionButton: Story = {
  args: {
    icon: Icon.Collapse,
    onClick: () => console.log("onClick"),
  },
};
export const HideActionButton: Story = {
  args: {
    icon: Icon.Hide,
    onClick: () => console.log("onClick"),
  },
};
export const ShowActionButton: Story = {
  args: {
    icon: Icon.Show,
    onClick: () => console.log("onClick"),
  },
};

