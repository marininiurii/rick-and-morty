import s from './Body.module.css'

export const Body = () => {
    return (
        <main className={s.main}>
         <div className={s.logoSection}>
         <img src="./logo-general.svg" alt="Логотип" />
         </div>
        <div className={s.filtersSection}></div>
        <div className={s.cardsSection}></div>
        <div className={s.buttonSection}></div>
        </main>
       
    )
}