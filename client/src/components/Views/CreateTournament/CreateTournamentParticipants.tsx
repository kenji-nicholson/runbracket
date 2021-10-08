import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { BaseSyntheticEvent, useState } from "react";
import { Control, useFieldArray, useForm, UseFormWatch } from "react-hook-form";
import { Tournament, Participant } from "../../../app/services/tournament";
import SectionHeader from "../../Forms/SectionHeader";
import ParticipantRow from "./ParticipantRow";
import { string, object } from "yup";
import { FormCheckbox, FormTextField } from "../../Forms/FormComponents";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  control: Control<Tournament, object>;
  watch: UseFormWatch<Tournament>;
}

const CreateTournamentParticipants: React.FC<Props> = (props) => {
  const { control, watch } = props;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "participants",
  });

  const is_seeded = watch("is_seeded", true);
  const defaultParticipant = {
    participant_id: null,
    participant_name: "",
    seed: null,
  };
  const [participant, setParticipant] =
    useState<Participant>(defaultParticipant);

  const addParticipant = () => {
    if (participant.participant_name) {
      append(participant);
      setParticipant(defaultParticipant);
    }
  };

  return (
    <>
      <SectionHeader>Participants</SectionHeader>
      <Grid container spacing={1} marginBottom={1}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Name"
            onChange={(e) =>
              setParticipant({
                ...participant,
                participant_name: e.target.value,
              })
            }
            value={participant.participant_name}
          ></TextField>
        </Grid>
        <Grid item alignSelf="center" xs={2}>
          <Button onClick={addParticipant} fullWidth variant="contained">
            ADD
          </Button>
        </Grid>
      </Grid>

      {fields.length > 0 && (
        <TableContainer sx={{ maxHeight: 400, marginBottom: 1 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {is_seeded && <TableCell width="10%">Seed</TableCell>}
                <TableCell width="80%">Name</TableCell>
                <TableCell width="10%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) => {
                return (
                  <ParticipantRow
                    key={item.id}
                    {...{ item, control: control, remove, index, is_seeded }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <FormCheckbox
        name="is_seeded"
        control={control}
        label="Include seeding"
      ></FormCheckbox>
    </>
  );
};

export default CreateTournamentParticipants;
