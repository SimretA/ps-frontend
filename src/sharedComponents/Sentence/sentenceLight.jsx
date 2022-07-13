import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Chip, Stack, Button, ListItemButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import Highlighter from "react-highlight-words";

import './index.css'



export default function SentenceLight(props) {



    const [labeled, setLabeled] = React.useState(props.element.user_label)
    const [toHighlight, setToHighlight] = React.useState([])

    const handleClick = (id, label)=>{
        setLabeled(label)
        props.handleBatchLabel(id,label)

    }

    useEffect(()=>{
        if(props.highlight){
            // console.log("props ", props.highlight)
            let to_highlight = []
            props.highlight.forEach((element, index)=>{
                // to_highlight.push(element[0])
                element.forEach(matches => {
                    to_highlight.push(matches[0])
                });
            })




            setToHighlight(to_highlight)
        }
        
        // if(props.highlight){
        //     let results = []
        //     let sentence_array = props.element.example.split(" ")
        //     let first_part = sentence_array.slice(0, props.highlight[0][1])
        //     let second_part = ""
        //     if(first_part!=""){
        //         results = [...results, [0,first_part]]
        //     }
        //     props.highlight.forEach((element, index) => {
        //         first_part =  sentence_array.slice(element[1], element[2])
        //         results = [...results, [1,first_part]]

        //         if(index!=props.highlight.length-1){
        //             second_part = sentence_array.slice(element[2], props.highlight[index+1][0])
        //             if(second_part!=""){
        //                 results = [...results, [0,second_part]]
        //             }

        //         }
                
                
        //     });

        //     console.log(results)
        // }
    },[])

    const Highlight = ({ children, highlightIndex }) => (
        <span className="highlight">{children}</span>
      );
    
    return(<>
        {props.show ? 
        
        <ListItemButton onClick={()=>{}}>
            <Stack sx={{backgroundColor:"#eeeeee"}} direction={"row"} alignItems={"top"} >
                <Typography color="text.secondary" align='left'
                variant="body2" display="block" gutterBottom>
                     {!props.highlight && <>{props.element.example}</> }
                     {props.highlight && <Highlighter highlightTag={Highlight} searchWords={toHighlight} textToHighlight={props.element.example} />}
                </Typography>
                
                <Stack direction={"row"} alignItems={"top"}>
                    <IconButton onClick={()=>handleClick(props.element.id,1)} > <CheckCircleOutlineIcon color={labeled==1?"success":"disabled"} /></IconButton>
                    <IconButton  onClick={()=>handleClick(props.element.id,0)} > <HighlightOffIcon color={labeled==0?"error":"disabled"} /></IconButton>


                </Stack>


            </Stack>
        </ListItemButton>:
        <></>}
        </>
    )


}