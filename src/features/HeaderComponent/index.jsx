import { AppBar, Typography } from "@material-ui/core";
import React from "react";
import { Stack } from "@mui/material";
import Settings from "../../sharedComponents/Menu";


export default function Header() {
      
    
      return <AppBar  color="inherit">
            <Stack direction={"row"} justifyContent="left"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{maxHeight:"10vh"}}
                  alignItems="center">
                  {/* <Typography>
                  This is where the magic happens</Typography> */}
                <Settings/>
            </Stack>
            </AppBar>;

    
}  