import { createApi } from "@reduxjs/toolkit/query/react";
import { match } from "assert";
import { baseQueryWithReauth } from "./auth";
import PaginatedData, { PaginationArguments } from "./pagination";

export enum StatusEnum {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Participant {
  participant_id: null | number;
  participant_name: string;
  seed: null | number;
}

export interface Match {
  tournament_id: null | number;
  match_id: null | number;
  round: number;
  date: Date;
  status: StatusEnum;
  participant_a_score: number;
  participant_b_score: number;
  participant_a: Participant;
  participant_b: Participant;
  winner_id: null | number;
}

export interface UpdateMatchRequest {
  match: Match;
  winner: Participant | null;
}

export type Tournaments = Tournament[];

export interface Tournament {
  user_id: null | number;
  tournament_id: null | number;
  tournament_status: null | StatusEnum;
  tournament_name: string;
  tournament_description: string;
  is_seeded: boolean;
  has_thug_finals: boolean;
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
        return {
          url: "tournaments/",
          params: { ...arg },
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
      PaginationArguments
    >({
      query: (arg) => {
        return {
          url: "tournaments/",
          params: { ...arg },
        };
      },
    }),
    updateMatch: builder.mutation<Match, Match>({
      query: (arg) => ({
        url: `tournaments/${arg.tournament_id}/matches/${arg.match_id}`,
        method: "PUT",
        body: arg,
      }),
      invalidatesTags: (result, error) => [
        { type: "Tournament", tournament_id: result?.tournament_id },
      ],
    }),
  }),
});

export const {
  useTournamentMutation,
  useGetTournamentsByUserIdQuery,
  useGetTournamentsQuery,
  useGetTournamentQuery,
  useUpdateMatchMutation,
} = tournamentApi;
