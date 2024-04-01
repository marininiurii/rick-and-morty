import Button from '@mui/material/Button';

export const BasicButton = ({onClick, children, className}) => {
  return (
    <Button onClick={onClick} className={className} variant="contained">{children}</Button>
  );
}

