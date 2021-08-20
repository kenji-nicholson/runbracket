import {createTheme, Theme} from "@material-ui/core/styles"
import { indigo } from "@material-ui/core/colors"

const theme: Theme= createTheme({
    palette: {
        primary: {
        main: indigo[800]
        }
    }
});

export default theme;