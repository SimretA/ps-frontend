import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Stack, Paper } from "@mui/material";
import { darken, lighten } from '@material-ui/core';



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
        <Stack mt={"10vh"} direction="column"  sx={{
            ...(!props.show) && {visibility:"hidden"},
            backgroundColor:"none", height:"90vh", width:"10px", position:"absolute", left:"0px", zIndex:10}}>
            {props.dataset.map((data)=>
            <Paper sx={
                {backgroundColor:data.score && data.score>0.5?`${darken('#86de8c', (data.score-0.5)/0.5)}`:data.score && data.score<0.5?`${lighten('#fc0b22', 1-data.score)}`:"none", 
                height:`${(windowDimensions.height*.9)/props.dataset.length}px`, 
                width:"15px", 
                borderRadius:"0px"}}
                key={`scroller_${data.id}`} />)}

                <Paper 
                sx={{
                  height:"15px",
                  width:"15px",
                  backgroundColor:"#b3bcff",
                  borderRadius:"0px",
                  position:"absolute",
                  top:`${props.scrollPosition*90}vh`,
                  border:"none",
                  opacity:"1"
                }}
                />

        </Stack>
    )



}