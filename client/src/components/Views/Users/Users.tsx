import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { useGetUsersQuery } from "../../../app/services/user";
import useQuery from "../../../hooks/routing";
import { PageSection, PageTitle } from "../../Forms/SectionHeader";
import { UserInfoContainer } from "../../Forms/userInfoStyles";
import { PaginationLink } from "../../Pagination/PaginationLink";
import { greyBackgroundColor } from "../../Theme/theme";
import TournamentRow from "../UserProfile/Tournaments/TournamentRow";
import UserProfileInformation from "../UserProfile/UserProfileInformation";

const UsersView = () => {
  let query = useQuery();
  const page = query.get("page") || "1";
  const { data, isLoading } = useGetUsersQuery({
    page: parseInt(page),
    per_page: 5,
  });
  const { push } = useHistory();

  if (isLoading) {
    return (
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: greyBackgroundColor,
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container>
        <UserInfoContainer>
          <Helmet>
            <title>Tournaments - RunBracket</title>
          </Helmet>
          <Grid container spacing={3} paddingBottom={1}>
            <Grid item xs={12} sm={9}>
              <PageTitle>Users</PageTitle>
            </Grid>
            <Grid item xs={12}>
              <PageSection>
                <List>
                  {data &&
                    data.items.map((user) => {
                      return (
                        <ListItemButton
                          onClick={() => push(`/users/${user.user_id}`)}
                        >
                          <UserProfileInformation user={user} />
                        </ListItemButton>
                      );
                    })}
                </List>
              </PageSection>
            </Grid>
          </Grid>
          <PaginationLink
            baseLink="/users"
            count={data?._meta.total_pages}
          ></PaginationLink>
        </UserInfoContainer>
      </Container>
    </Box>
  );
};

export default UsersView;
