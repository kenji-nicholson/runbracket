import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CurrentUser, User } from "../services/auth";
import { Match } from "../services/tournament";

type TournamentViewState = {
  dialogOpen: boolean;
  selectedMatch: Match | null;
  hasPermission: boolean;
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState: {
    dialogOpen: false,
    selectedMatch: null,
    hasPermission: false,
  } as TournamentViewState,
  reducers: {
    showDialogForMatch: (state, { payload: match }: PayloadAction<Match>) => {
      state.selectedMatch = match;
      state.dialogOpen = true;
    },
    closeDialog: (state) => {
      state.dialogOpen = false;
    },
    setPermission: (
      state,
      { payload: hasPermission }: PayloadAction<boolean>
    ) => {
      state.hasPermission = hasPermission;
    },
  },
});

export const { showDialogForMatch, closeDialog, setPermission } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
