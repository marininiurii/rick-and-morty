import Link from "@mui/material/Link";

export const NavigateTabButton = ({ path }) => {
  const pathNameToUpperCase = path.charAt(0).toUpperCase() + path.slice(1);
  return (
    <Link href={`/${path}`} color="#000000" underline="none">
      {pathNameToUpperCase}
    </Link>
  );
};
