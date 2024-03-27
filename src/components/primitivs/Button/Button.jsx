import Button from '@mui/material/Button';
import s from './Button.module.css'

export const BasicButton = ({onClick, children}) => {
  return (
    <Button onClick={onClick} className={s.button} variant="contained">{children}</Button>
  );
}