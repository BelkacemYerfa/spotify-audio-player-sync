import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Search from "../../pages/Search";
import { useState } from "react";

export const AnimatedRoutes = () => {
  const location = useLocation();
  const [playing, setPlaying] = useState<boolean>(false);
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route element={<Search />} path="/" />
      </Routes>
    </AnimatePresence>
  );
};
