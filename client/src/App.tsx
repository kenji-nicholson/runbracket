import LoginView from "./components/Views/LoginView";
import RegisterView from "./components/Views/RegisterView";
import HomeView from "./components/Views/Home/HomeView";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar></NavigationBar>
      <Switch>
        <Route exact component={LoginView} path="/login" />
        <Route exact component={RegisterView} path="/register" />
        <Route exact component={HomeView} path="/" />
      </Switch>
    </>
  );
};

export default App;
