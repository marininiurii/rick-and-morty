
import { SelectField } from "../primitivs/Select/Select";
import { CardComponent } from "../primitivs/Card/Card";
import s from "./Body.module.css";
import TextField from "@mui/material/TextField";
import { BasicButton } from "../primitivs/Button/Button";

export const Body = () => {
  const getCardsComponent = () => {
    const cards = [];
    for (let i = 0; i < 8; i++) {
      cards.push(<CardComponent key={i} />);
    }
    return cards;
  }
  return (
    <main className={s.main}>
      <div className={s.logoSection}>
        <img src="./logo-general.svg" alt="Логотип" />
      </div>
      <div className={s.filtersSection}>
        <TextField
          id="outlined-basic"
          label="Filter by name"
          variant="outlined"
        />
        <SelectField>Species</SelectField>
        <SelectField>Gender</SelectField>
        <SelectField>Status</SelectField>
      </div>
      <div className={s.cardsSection}>
        {getCardsComponent()}
      </div>
      <div className={s.buttonSection}>
        <BasicButton>Load More</BasicButton>
      </div>
    </main>
  );
};
