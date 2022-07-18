import { AppBar, Typography } from "@material-ui/core";
import React from "react";
import { Stack } from "@mui/material";
import Settings from "../../sharedComponents/Menu";
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { Box } from "@material-ui/core";
import LinearProgress from '@mui/material/LinearProgress';
import ProgressButton from "../../sharedComponents/ProgressButton";
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';

export default function Header(props) {
      
      
    
      return <AppBar  sx={{maxHeight:"8vh"}} ml={2} color="inherit">
            <Stack direction={"rowx"} ml={2} justifyContent="left"
            
            sx={{maxHeight:"8vh"}}
                  alignItems="center">
                  {/* <Typography>
                  This is where the magic happens</Typography> */}
                <Settings/>


            <Divider orientation="vertical" variant="middle" flexItem />
                  
            <ProgressButton retrain={props.retrain} value={((props.userAnnotationCount%props.annotationPerRetrain)/props.annotationPerRetrain)*100}/>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Stack  sx={{ alignContent:"center", alignItems:"center" ,justifyContent:"center"}} ml={2} mr={2} direction={"row"} spacing={1} >
                  {/* <Typography >Progress:</Typography> */}
                  

                  <Stack p={2} sx={{ alignContent:"center", alignItems:"center" ,justifyContent:"center"}} ml={2} mr={2} direction={"column"} >
                        {/* <CircularProgress thickness={10} variant="determinate" value={(props.userAnnotationCount/props.totalDataset)*100} /> */}
                        
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                              <CircularProgress thickness={20} variant="determinate" value={(props.userAnnotationCount/props.totalDataset)*100}  />
                              <Box
                              sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: 'absolute',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              }}
                              >
                              <Typography variant="caption" component="div" color="text.secondary">
                              {`${Math.round((props.userAnnotationCount/props.totalDataset)*100)}%`}
                              </Typography>
                              </Box>
                        </Box>
                        
                        <Typography variant="caption" color={"textSecondary"}>You</Typography>
                        </Stack>
                  

                  <Stack p={2} sx={{ alignContent:"center", alignItems:"center" ,justifyContent:"center"}} ml={2} mr={2} direction={"column"} >

                  {/* <CircularProgress thickness={10} variant="determinate" value={50} /> */}
                              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                          <CircularProgress thickness={20} variant="determinate" value={(props.modelAnnotationCount/props.totalDataset)*100}  />
                                          <Box
                                          sx={{
                                          top: 0,
                                          left: 0,
                                          bottom: 0,
                                          right: 0,
                                          position: 'absolute',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          }}
                                          >
                                                <Typography variant="caption" component="div" color="text.secondary">
                                                {`${Math.round((props.modelAnnotationCount/props.totalDataset)*100)}%`}
                                                </Typography>
                                          </Box>
                              </Box>
                        <Typography variant="caption" color={"textSecondary"}>Model</Typography>
                  </Stack> 

                  

            </Stack>
                
                  <Divider orientation="vertical" variant="middle" flexItem />


                  <Stack width={"150px"}  p={2}>

                        {/* <Typography>{props.selectedTheme}</Typography> */}

                        <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">{props.selectedTheme}</InputLabel>
                              <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={props.selectedTheme}
                              label="Theme"
                              onChange={event=>props.setTheme(event.target.value)}
                              >
                                    {props.themes.map(theme=><MenuItem value={theme} key={`theme_${theme}`}>{theme}</MenuItem>)}
                              </Select>
                        </FormControl>
                  </Stack>
                  
            </Stack>


            </AppBar>

    
}  