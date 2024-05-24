import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { selectAppStatus } from "app/app.selectors";
import { useActions } from "common/hooks/useActions";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { authThunks } from "features/auth/model/authSlice";
import React from "react";
import { useSelector } from "react-redux";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectAppStatus);

  const { logout } = useActions(authThunks);

  const logoutHandler = () => logout();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TaskTrove
        </Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  );
};
