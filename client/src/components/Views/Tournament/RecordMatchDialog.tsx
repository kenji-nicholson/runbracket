import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Match,
  Participant,
  UpdateMatchRequest,
} from "../../../app/services/tournament";
import {
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Close } from "@mui/icons-material";
import { FormTextField } from "../../Forms/FormComponents";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  match: Match;
}

export const RecordMatchDialog: React.FC<DialogProps> = (props) => {
  const { open, onClose, match } = props;

  const { handleSubmit, control, getValues, setValue } =
    useForm<UpdateMatchRequest>({
      defaultValues: { match: match, winner: null },
    });

  const onSubmit = async (data: UpdateMatchRequest) => {};

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            Record Match
            {
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            }
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill out each participant's score and select a winner.
            </DialogContentText>
            <Grid container spacing={3} paddingTop={2}>
              <Grid item xs={12}>
                <Typography>Score</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormTextField
                  name="match.participant_a_score"
                  control={control}
                  label={match.participant_a.participant_name}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormTextField
                  name="match.participant_b_score"
                  control={control}
                  label={match.participant_b.participant_name}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Winner</Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      value={getValues("winner")}
                      onChange={(
                        event: React.MouseEvent,
                        newAlignment: Participant | null
                      ) => {
                        setValue("winner", newAlignment);
                      }}
                    >
                      <ToggleButton
                        value={match.participant_a}
                        key="participant_a"
                      >
                        {match.participant_a.participant_name}
                      </ToggleButton>
                      <ToggleButton value={null} key="none">
                        N/A
                      </ToggleButton>
                      <ToggleButton
                        value={match.participant_b}
                        key="participant_b"
                      >
                        {match.participant_b.participant_name}
                      </ToggleButton>
                    </ToggleButtonGroup>
                  )}
                  name="winner"
                  control={control}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default RecordMatchDialog;
