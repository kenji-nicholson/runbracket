import { createTheme, Theme, adaptV4Theme } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors"

const theme: Theme= createTheme(adaptV4Theme({
    palette: {
        primary: {
        main: indigo[800]
        }
    }
}));

export default theme;