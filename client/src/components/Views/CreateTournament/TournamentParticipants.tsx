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
import { Control, useFieldArray, useForm } from "react-hook-form";
import { Tournament, Participant } from "../../../app/services/tournament";
import SectionHeader from "../../Forms/SectionHeader";
import ParticipantRow from "./ParticipantRow";
import { string, object } from "yup";
import { FormCheckbox, FormTextField } from "../../Forms/FormComponents";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  control: Control<Tournament, object>;
}

const TournamentParticipants: React.FC<Props> = (props) => {
  const validationSchema = object().shape({
    participant_name: string().required("Name is required!"),
  });

  const parentControl = props.control;
  const { fields, append, remove } = useFieldArray({
    control: parentControl,
    name: "participants",
  });

  const { handleSubmit, control } = useForm<Participant>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((data: Participant) => {
      console.log(data);
      append(data);
    })(e);
  };
  return (
    <>
      <SectionHeader>Participants</SectionHeader>
      <Grid container spacing={1} marginBottom={1}>
        <Grid item xs={10}>
          <FormTextField
            control={control}
            fullWidth
            name="participant_name"
            label="Name"
          ></FormTextField>
        </Grid>
        <Grid item alignSelf="center" xs={2}>
          <Button onClick={onSubmit} fullWidth variant="contained">
            ADD
          </Button>
        </Grid>
      </Grid>

      {fields.length > 0 && (
        <TableContainer sx={{ maxHeight: 400, marginBottom: 1 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell width="10%">Seed</TableCell>
                <TableCell width="80%">Name</TableCell>
                <TableCell width="10%"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((item, index) => {
                return (
                  <ParticipantRow
                    key={item.id}
                    {...{ item, control: parentControl, remove, index }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <FormCheckbox
        name="is_seeded"
        control={parentControl}
        label="Include seeding"
      ></FormCheckbox>
    </>
  );
};

export default TournamentParticipants;
