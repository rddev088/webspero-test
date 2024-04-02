import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NearestUsersTable from "./NearestUsersTable";
import { useDispatch, useSelector } from "react-redux";
import { findNearestUsers, nearestUsersSelector } from "../features/userSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const nearest = useSelector(nearestUsersSelector);
  console.log({ nearest });

  React.useEffect(() => {
    console.log("sasas");
    dispatch(findNearestUsers());
  }, []);

  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Nearest Users
          <Link to={"/profile"}>Profile</Link>
        </Typography>
      </Box>
      <NearestUsersTable nearestUsers={nearest?.nearestUsers} />
    </>
  );
}
