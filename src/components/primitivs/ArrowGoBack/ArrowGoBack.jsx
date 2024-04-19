import arrowLogo from "../../../assets/svg/arrow_back.svg";

export const ArrowGoBack = ({ className, href }) => {
  const spanStyle = {
    fontFamily: "Karla",
    marginLeft: "10px",
    color: "#000000",
    fontSize: "18px",
    fontWeight: "700",
  };
  return (
    <div className={className}>
      <a href={href}>
        <img src={arrowLogo} alt="arrow-back" />
        <span style={spanStyle}>GO BACK</span>
      </a>
    </div>
  );
};
