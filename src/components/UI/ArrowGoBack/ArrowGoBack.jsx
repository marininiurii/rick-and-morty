import arrowLogo from "../../../assets/svg/arrow_back.svg";
import { STYLES } from "./constants";

export const ArrowGoBack = ({ className, href }) => {
  return (
    <div className={className}>
      <a href={href}>
        <img src={arrowLogo} alt="arrow-back" />
        <span style={STYLES}>GO BACK</span>
      </a>
    </div>
  );
};
