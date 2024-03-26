import { Body } from '../../Body/Body';
import { Footer } from '../../Footer/Footer';
import { Header } from '../../Header/Header';
import s from './Characters.module.css'

export const Characters = () => {
    return (
        <div className={s.body}>
         <Header />
         <Body />
         <Footer />
        </div>
      );
}