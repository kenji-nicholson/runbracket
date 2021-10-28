import LoginView from "./components/Views/LoginView";
import RegisterView from "./components/Views/RegisterView";
import HomeView from "./components/Views/Home/HomeView";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import CreateTournamentView from "./components/Views/CreateTournament/CreateTournamentView";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UserProfileView } from "./components/Views/UserProfile/UserProfileView";
import TournamentsView from "./components/Views/Tournaments/TournamentsView";
import TournamentView from "./components/Views/Tournament/TournamentView";
import UsersView from "./components/Views/Users/Users";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <NavigationBar></NavigationBar>
      <Switch>
        <Route exact component={LoginView} path="/login" />
        <Route exact component={RegisterView} path="/register" />
        <Route exact component={HomeView} path="/" />
        <Route exact component={TournamentsView} path="/tournaments" />
        <Route exact component={UsersView} path="/users" />
        <ProtectedRoute
          exact
          component={CreateTournamentView}
          path="/tournaments/new"
        />
        <ProtectedRoute exact component={UserProfileView} path="/users/:id" />
        <Route exact component={TournamentView} path="/tournaments/:id" />
      </Switch>
    </>
  );
};

export default App;
