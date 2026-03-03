import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#146ee2",
    textPrimary: "#f1f1f1",
    textSecondary: "#bdbdbd",
    backgroundPrimary: "black",
    backgroundSecondary: "#161616",
  },
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </StrictMode>,
);
