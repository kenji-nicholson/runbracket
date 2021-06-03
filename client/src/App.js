import { Button } from "@material-ui/core";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Button contained>This is a button</Button>
    </div>
  );
};

export default App;
