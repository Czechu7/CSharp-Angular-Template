import { LuX, LuPlus, LuCheck } from "react-icons/lu";
import { Button as ShadCnButton } from "@/components/ui/button.tsx";
import clsx from "clsx";

type Props = {
  label: string;
  variant: "filled" | "outlined" | "outlinedGray";
  disabled: boolean;
  size: "actionButton";
  onClick: () => void;
  type: "save" | "cancel" | "confirm";
};

const icons = {
  save: <LuPlus />,
  cancel: <LuX />,
  confirm: <LuCheck />,
};

export const Button = ({
  label,
  variant,
  size,
  disabled,
  onClick,
  type,
}: Props) => {
  const icon = icons[type];

  return (
    <ShadCnButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && (
        <span
          className={clsx("mr-[0.85rem]", {
            "group-hover:text-white": variant === "outlined",
          })}
        >
          {icon}
        </span>
      )}
      {label}
    </ShadCnButton>
  );
};
