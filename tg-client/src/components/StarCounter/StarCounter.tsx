import { FC } from "react";

import "./StarCounter.scss";
import { IoIosStarOutline } from "react-icons/io";

interface StarCounterProps {
  stars: number;
  calcStars: (e: any) => void;
}

const StarCounter: FC<StarCounterProps> = ({ stars, calcStars }) => {
  return (
    <div className="star-counter">
      <div className="star-counter__stars">
        {stars}
        <IoIosStarOutline />
      </div>
      <label className="star-counter__label">
        <input placeholder="Укажи сумму доната" min={0} onChange={calcStars} type="number" />
      </label>
    </div>
  );
};

export default StarCounter;
