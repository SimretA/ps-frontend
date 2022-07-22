import { AppBar, Typography, Toolbar } from "@material-ui/core";
import React from "react";
import { Stack, Chip } from "@mui/material";
import Settings from "../../sharedComponents/Menu";
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { Box } from "@material-ui/core";
import ProgressButton from "../../sharedComponents/ProgressButton";

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { CSS_COLOR_NAMES } from "../../assets/color_assets";
import CakeIcon from '@mui/icons-material/Cake';

import TextField from '@mui/material/TextField';


import { useDispatch } from 'react-redux';
import {addTheme} from "../Workspace/Dataslice"


export default function Header(props) {
      const dispatch = useDispatch();
      
      const [addNewTheme, setAddNewTheme] = React.useState(false)
      const [userAnnotationPercent, setUserAnnotationPercent] = React.useState(0)
      const [modelAnnotationPercent, setModelAnnotationPercent] = React.useState(0)

      React.useEffect(()=>{
            console.log("themes length ", props.themes.length)
      },[props.themes])

      React.useEffect(()=>{
            if(props.userAnnotationCount && props.totalDataset>0){
                  setUserAnnotationPercent((props.userAnnotationCount/props.totalDataset)*100)
            }

      },[props.userAnnotationCount])
      React.useEffect(()=>{
            if(props.userAnnotationCount && props.totalDataset>0){
                  setModelAnnotationPercent((props.modelAnnotationCount/props.totalDataset)*100)
            }

      },[props.modelAnnotationCount])

      const handleAddNewTheme=(event)=>{
            if(event.key === 'Enter'){
                  
                  //dispatch add new theme
                  dispatch(addTheme({"theme":event.target.value, "index":props.themes.length}))
                  setAddNewTheme(false)

                  //TODO dispatch an api call event
                }

      }


      const handleThemeChange =(event)=>{
            if(event.target.value=="add_new_theme"){
                  event.preventDefault()
                  setAddNewTheme(!addNewTheme)
            }else{
                  props.setTheme(event.target.value)
            }
            

      }

      return <AppBar ml={2} color="inherit">
            <Box maxHeight={"8vh"} sx={{backgroundColor:"#000000", display:"inline"}} width={"100vw"}><CakeIcon p={2} sx={{color:"#FFFFFF"}} /> <Typography variant="h5" style={{display:"inline",fontFamily:'Indie Flower', color:"#FFFFFF", width:"0px"}}>Cake</Typography></Box>
            
            <Stack direction={"rowx"} ml={2} justifyContent="left"
            
            // sx={{ maxHeight:"4vh"}}
                  alignItems="center">
                <Settings/>


            <Divider orientation="vertical" variant="middle" flexItem />
                  
            <ProgressButton color={props.color_code[props.selectedTheme]} retrain={props.retrain} value={((props.userAnnotationCount%props.annotationPerRetrain)/props.annotationPerRetrain)*100 || 0}/>

            {props.selectedTheme &&<>
                  <Divider orientation="vertical" variant="middle" flexItem />

                  <Stack  sx={{ alignContent:"center", alignItems:"center" ,justifyContent:"center"}} ml={2} mr={2} direction={"row"} spacing={1} >
                        {/* <Typography >Progress:</Typography> */}
                        

                        <Stack p={2} sx={{ alignContent:"center", alignItems:"center" ,justifyContent:"center"}} ml={2} mr={2} direction={"column"} >
                              {/* <CircularProgress thickness={10} variant="determinate" value={(props.userAnnotationCount/props.totalDataset)*100} /> */}
                              
                              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <CircularProgress thickness={20} variant="determinate" value={userAnnotationPercent}  sx={{color:props.color_code[props.selectedTheme]}} />
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
                                    <Typography variant="caption" component="div" >
                                    {`${Math.round(userAnnotationPercent)}%`}
                                    </Typography>
                                    </Box>
                              </Box>
                              
                              <Typography variant="caption" color={"textSecondary"}>You</Typography>
                              </Stack>
                        

                        <Stack p={2} sx={{ alignContent:"center", alignItems:"center" ,justifyContent:"center"}} ml={2} mr={2} direction={"column"} >

                        {/* <CircularProgress thickness={10} variant="determinate" value={50} /> */}
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                <CircularProgress thickness={20} variant="determinate" value={modelAnnotationPercent} sx={{color:props.color_code[props.selectedTheme]}} />
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
                                                      <Typography variant="caption" component="div">
                                                      {`${Math.round(modelAnnotationPercent)}%`}
                                                      </Typography>
                                                </Box>
                                    </Box>
                              <Typography variant="caption" color={"textSecondary"}>Model</Typography>
                        </Stack> 

                        

                  </Stack>
                  
                  <Divider orientation="vertical" variant="middle" flexItem />


                  <Stack   p={2}>

                              {/* <Typography>{props.selectedTheme}</Typography> */}

                              <FormControl size="small" >
                                    {/* <InputLabel id="demo-simple-select-label">{props.selectedTheme}</InputLabel> */}
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={props.selectedTheme?props.selectedTheme:""}
                                    label="Theme"
                                    onChange={event=> handleThemeChange(event)}
                                    >
                                          {props.themes.map((theme, index)=><MenuItem size="small" sx={{textTransform:"capitalize"}} value={theme} key={`theme_${theme}`}><Chip key={`menuitem_${theme}_light`} label={""} color={'primary'} sx={{backgroundColor:props.color_code[theme], width:20, height:20, marginRight:1}} size="small" /> {theme}</MenuItem>)}
                                          <MenuItem size="small" onKeyDown={(e=>e.stopPropagation())} onClickCapture={(e) => {
                                                e.stopPropagation()
                                                if(!addNewTheme)
                                                      setAddNewTheme(!addNewTheme)
                                          }} sx={{textTransform:"capitalize"}} value={'add_new_theme'} key={`theme_add_new`}>
                                                {addNewTheme?
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width:"inherit" }}>
                                                            <Chip key={`menuitem_new_theme_light${props.themes.length}`} label={""} color={'primary'} sx={{backgroundColor:CSS_COLOR_NAMES[props.themes.length], width:20, height:20, marginRight:1,  mr: 1, my: 0.5 }} size="small" />
                                                            <TextField size="small" onKeyDown={handleAddNewTheme}  id="input-with-sx" label="New Theme" variant="standard" />
                                                      </Box>
                                                :
                                                <Button variant="outlined" startIcon={<AddIcon />}>
                                                      Add Theme
                                                </Button> }
                                          </MenuItem> 
                                    </Select>
                              </FormControl>
                  </Stack>
            </>}
            
            </Stack>


            </AppBar>

    
}  