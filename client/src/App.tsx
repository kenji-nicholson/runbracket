import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import HomeView from "./components/HomeView";
import NavigationBar from "./components/NavigationBar";
import { Switch, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
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
