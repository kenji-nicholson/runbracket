import LoginView from "./components/Views/LoginView";
import RegisterView from "./components/Views/RegisterView";
import HomeView from "./components/Views/Home/HomeView";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import CreateTournamentView from "./components/Views/CreateTournament/CreateTournamentView";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProfileView } from "./components/Views/UserProfile/UserProfileView";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar></NavigationBar>
      <Switch>
        <Route exact component={LoginView} path="/login" />
        <Route exact component={RegisterView} path="/register" />
        <Route exact component={HomeView} path="/" />
        <ProtectedRoute
          exact
          component={CreateTournamentView}
          path="/tournaments/new"
        />
        <ProtectedRoute exact component={UserProfileView} path="/users/:id" />
      </Switch>
    </>
  );
};

export default App;
