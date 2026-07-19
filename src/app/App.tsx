import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Shell } from "../layouts/Shell";
import { AppRouter } from "./router";

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Shell>
          <AppRouter />
        </Shell>
      </BrowserRouter>
    </HelmetProvider>
  );
};
