import Button from '@mui/material/Button';
import s from './Button.module.css'

export const BasicButton = ({children}) => {
  return (
    <Button className={s.button} variant="contained">{children}</Button>
  );
}