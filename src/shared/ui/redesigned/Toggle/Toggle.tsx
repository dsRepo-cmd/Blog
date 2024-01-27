import React, { useState } from "react";
import cls from "./Toggle.module.scss";

import { classNames } from "@/shared/lib/classNames";
import { HStack } from "../Stack";
import Text from "../Text/Text";

interface ToggleProps {
  className?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  name?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  defaultChecked = false,
  onChange,
  label,
  className,
  name = "name",
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <HStack gap={"8"}>
      <Text text={label} />
      <div className={classNames(cls.Toggle, {}, [className])}>
        <input
          onChange={handleToggle}
          type="checkbox"
          className={cls.checkbox}
          name={name}
          id={name}
          checked={checked}
        />
        <label className={cls.label} htmlFor={name}>
          <span className={cls.switch} />
        </label>
      </div>
    </HStack>
  );
};

export default Toggle;
