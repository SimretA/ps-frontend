import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import Box  from "@mui/material/Box";
import { blueGrey } from "@material-ui/core/colors";
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import CakeIcon from '@mui/icons-material/Cake';

function Login(props) {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const paperStyle={padding :20,width:280, margin:"25vh auto"}
    
    const login=(event)=>{
       
        setUser("fake_user");
        navigate("/");

    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' >
                    <Box padding={2} sx={{backgroundColor:"#000000", display:"inline"}} width={"100%"}>
                        <CakeIcon p={2} sx={{color:"#FFFFFF"}} /> 
                        <Typography variant="h5" style={{display:"inline",fontFamily:'Indie Flower',
                             color:"#FFFFFF", width:"0px"}}>Cake</Typography
                        ></Box>
                </Grid>
                <TextField style={{marginTop:30}} label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField style={{marginTop:10}} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>

                <Button type='submit' color='primary' variant="contained"  style={{marginTop:10, backgroundColor:"#000000"}} fullWidth onClick={login}>Log in</Button>


            </Paper>
        </Grid>
    )
}

export default {
    routeProps: {
      path: "/login",
      element: <Login />
    },
    name: 'auth'
  };