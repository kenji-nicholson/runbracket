import { List, ListItem } from "@material-ui/core";
import React from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { Tournament } from "../../../app/services/tournament";
import { FormTextField } from "../../Forms/FormComponents";
import ParticipantRow from "./ParticipantRow";

interface Props {
  control: Control<Tournament, object>;
}

const TournamentParticipants: React.FC<Props> = (props) => {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  return (
    <>
      <List>
        {fields.map((item, index) => {
          return (
            <ListItem key={item.id}>
              <ParticipantRow {...{ control, remove, index }} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default TournamentParticipants;
