import { CardComponent } from "../../Card/Card";
import { SelectField } from "../Select/Select";
import s from "./Body.module.css";
import TextField from "@mui/material/TextField";

export const Body = () => {
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
        <CardComponent />
      </div>
      <div className={s.buttonSection}></div>
    </main>
  );
};
