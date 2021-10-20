import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./auth";
import PaginatedData, { PaginationArguments } from "./pagination";

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
  winner_id: null | number;
}

export type Tournaments = Tournament[];

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
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tournament"],
  endpoints: (builder) => ({
    tournament: builder.mutation<Tournament, Tournament>({
      query: (tournament) => ({
        url: "tournaments/",
        method: "POST",
        body: tournament,
      }),
      invalidatesTags: ["Tournament"],
    }),
    getTournaments: builder.query<
      PaginatedData<Tournament>,
      PaginationArguments
    >({
      query: (arg) => {
        const { page } = arg;
        return {
          url: "tournaments/",
          params: { page },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ tournament_id }) => ({
                type: "Tournament" as const,
                tournament_id,
              })),
              { type: "Tournament", tournament_id: "LIST" },
            ]
          : [{ type: "Tournament", tournament_id: "LIST" }],
    }),
    getTournament: builder.query<Tournament, string>({
      query: (id) => `tournaments/${id}`,
      providesTags: (result, error, tournament_id) => [
        { type: "Tournament", tournament_id },
      ],
    }),
    getTournamentsByUserId: builder.query<
      PaginatedData<Tournament>,
      { user_id: number }
    >({
      query: (arg) => {
        const { user_id } = arg;
        return {
          url: "tournaments/",
          params: { user_id },
        };
      },
    }),
  }),
});

export const {
  useTournamentMutation,
  useGetTournamentsByUserIdQuery,
  useGetTournamentsQuery,
  useGetTournamentQuery,
} = tournamentApi;
