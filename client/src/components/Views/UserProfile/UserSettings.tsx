import { Grid } from "@mui/material";
import React from "react";
import { User } from "../../../app/services/auth";
import SectionHeader from "../../Forms/SectionHeader";

interface Props {
  user: User;
}

const UserSettings: React.FC<Props> = (props) => {
  const { user } = props;
  const validationSchema = object().shape({
    first_name: string().required("First name is required."),
    last_name: string().required("Last name is required."),
    display_name: string().required("Field is required."),
    email: string()
      .required("Email address is required.")
      .email("Not a valid email."),
    password: string().required("Password is required."),
  });

  const { push } = useHistory();

  const { handleSubmit, control } = useForm<RegisterRequest>({
    resolver: yupResolver(validationSchema),
  });

  const [signUp] = useAddUserMutation();

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const response = await signUp(data).unwrap();
      console.log(response);
      push("/");
    } catch (err) {
      console.log(err);
      setOpen(true);
    }
  };
  return (
    <Grid container>
      <Grid item>
        <SectionHeader>Account Information</SectionHeader>
      </Grid>
    </Grid>
  );
};

export default UserSettings;
