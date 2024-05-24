import { CircularProgress, Container } from "@mui/material";
import { selectIsInitialized } from "app/app.selectors";
import { ErrorSnackbar } from "common/components";
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./routes/Routing";
import { Header } from "./ui/Header";

function App() {
  const isInitialized = useSelector(selectIsInitialized);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <Header />
        <Container fixed>
          <Routing />
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
