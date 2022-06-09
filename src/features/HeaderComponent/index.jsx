import { AppBar, Typography } from "@material-ui/core";
import React from "react";
import { Stack } from "@mui/material";
import Settings from "../../sharedComponents/Menu";

export default function Header() {
    
      return <AppBar  color="inherit">
            <Stack direction={"row"} justifyContent="right"
            spacing={{ xs: 1, sm: 2, md: 4 }}
                  alignItems="center">
                  <Typography>
                  This is where the magic happens</Typography>
                <Settings/>
            </Stack>
            </AppBar>;

    
}  