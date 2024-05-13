import styles from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MainCharacters } from "./components/MainComponents/MainCharacters/MainCharacters";
import { MainLocations } from "./components/MainComponents/MainLocations/MainLocations";
import { MainEpisodes } from "./components/MainComponents/MainEpisodes/MainEpisodes";
import { MainCharactersDetails } from "./components/MainComponents/MainCharactersDetails/MainCharactersDetails";
import { MainLocationDetails } from "./components/MainComponents/MainLocationDetails/MainLocationDetails";
import { MainEpisodesDetails } from "./components/MainComponents/MainEpisodesDetails/MainEpisodesDetails";

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.body}>
        <Routes>
          <Route path="/" element={<MainCharacters />} />

          <Route path="/locations" element={<MainLocations />} />
          <Route path="/episodes" element={<MainEpisodes />} />
          <Route path="/characters/:id" element={<MainCharactersDetails />} />
          <Route path="/locations/:id" element={<MainLocationDetails />} />
          <Route path="/episodes/:id" element={<MainEpisodesDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
