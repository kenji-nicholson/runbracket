import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export enum Status {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Participant {
  participant_id: null | number;
  participant_name: string;
  seed: null | number;
}

export interface Match {
  match_id: null | number;
  match_status: Status;
  round: number;
  date: Date;
  participant_a_score: number;
  participant_b_score: number;
  participant_a: Participant;
  participant_b: Participant;
}

export interface Tournament {
  user_id: null | number;
  tournament_id: null | number;
  tournament_status: null | Status;
  tournament_name: string;
  tournament_description: string;
  is_seeded: boolean;
  date: null | Date;
  matches: null | Match[];
  participants: Participant[];
}

export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    tournament: builder.mutation<Tournament, Tournament>({
      query: (tournament) => ({
        url: "tournaments/",
        method: "POST",
        body: tournament,
      }),
    }),
  }),
});

export const { useTournamentMutation } = tournamentApi;
