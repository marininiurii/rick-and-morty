import { Body } from '../../Body/Body';
import { Header } from '../../Header/Header';
import s from './Characters.module.css'

export const Characters = () => {
    return (
        <div className={s.body}>
         <Header />
         <Body />
        </div>
      );
}