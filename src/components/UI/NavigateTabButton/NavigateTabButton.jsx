import Link from "@mui/material/Link";

export const NavigateTabButton = ({ children, path }) => {
  return (
    <Link href={`${path}`} color="#000000" underline="none">
      {children}
    </Link>
  );
};
