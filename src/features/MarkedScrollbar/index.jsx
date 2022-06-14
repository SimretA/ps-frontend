import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Stack, Paper } from "@mui/material";
import { lighten } from '@material-ui/core';



function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }



export default function Scroller(props) {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());



    // useEffect(()=>{
    //     console.log("inside scroller ",props.dataset)
    // })

    return (
        <Stack direction="column"  sx={{
            backgroundColor:"none", height:"90vh", width:"10px", position:"absolute", left:"0px"}}>
            {props.dataset.map((data)=>
            <Paper sx={
                {backgroundColor:data.score && data.score>0.5?`${lighten('#86de8c', 1-data.score)}`:data.score && data.score<=0.5?`${lighten('#fc0b22', 1-data.score)}`:"none", 
                height:`${(windowDimensions.height*.9)/props.dataset.length}px`, 
                width:"10px", 
                borderRadius:"0px"}} />)}

        </Stack>
    )



}