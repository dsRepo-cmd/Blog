import React, { memo, useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import cls from "./StarRating.module.scss";

import StarIcon from "@/shared/assets/icons/star-fill.svg";
import { Icon } from "../Icon/Icon";

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}
const stars = [1, 2, 3, 4, 5];
const StarRating: React.FC<StarRatingProps> = ({
  className,
  size = 30,
  selectedStars = 0,
  onSelect,
}) => {
  const [currentStarsCount, setCurrentStarsCount] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((starNum) => (
        <Icon
          className={classNames(cls.starIcon, { [cls.selected]: isSelected }, [
            currentStarsCount >= starNum ? cls.hovered : cls.normal,
          ])}
          Svg={StarIcon}
          key={starNum}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNum)}
          onClick={onClick(starNum)}
        />
      ))}
    </div>
  );
};

export default memo(StarRating);
