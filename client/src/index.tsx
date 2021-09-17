import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import theme from "./theme";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
