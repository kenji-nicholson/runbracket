import { Close } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import React from "react";
import { Control, FieldArrayWithId } from "react-hook-form";
import { Tournament } from "../../../app/services/tournament";
import { FormTextField } from "../../Forms/FormComponents";

interface Props {
  item: FieldArrayWithId<Tournament, "participants", "id">;
  index: number;
  control: Control<Tournament, object>;
  remove: (index?: number | number[] | undefined) => void;
  is_seeded: boolean;
}

const CreateParticipantRow: React.FC<Props> = (props) => {
  const { item, control, remove, index, is_seeded } = props;
  return (
    <>
      <TableRow>
        {is_seeded && <TableCell>{index + 1}</TableCell>}
        <TableCell>
          <FormTextField
            required
            variant="standard"
            name={`participants.${index}.participant_name`}
            control={control}
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={() => remove(index)} size="small">
            <Close />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CreateParticipantRow;
