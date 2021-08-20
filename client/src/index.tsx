import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import theme from "./theme";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
        <App />

        </ThemeProvider>
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);
