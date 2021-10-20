import * as React from "react";
import { Link, MemoryRouter, Route } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

interface PaginationProps {
  baseLink: string;
  count: number | undefined;
}
export const PaginationLink: React.FC<PaginationProps> = (props) => {
  const { baseLink, count } = props;
  return (
    <Route>
      {({ location }) => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get("page") || "1", 10);
        return (
          <Pagination
            page={page}
            count={count ? count : 1}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`${baseLink}${item.page === 1 ? "" : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        );
      }}
    </Route>
  );
};
