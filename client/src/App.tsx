import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route exact component={LoginView} path="/login" />
      <Route exact component={RegisterView} path="/register" />
    </Switch>
  );
};

export default App;
