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
import { ListItem } from '@material-ui/core';



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
                // console.log("elements ", element.join(" "))
                // to_highlight.push(element[0])
                to_highlight.push(element)
                // element.forEach(matches => {
                //     to_highlight.push(matches[0])
                // });
            })



            setToHighlight(to_highlight)
        }
        
    },[])

    const Highlight = ({ children, highlightIndex }) => (
        <span className="highlight" style={{backgroundColor:props.color}} >{children}</span>
      );
    
    return(<>
        {props.show ? 
        
        <ListItem onClick={()=>{}}>
            <Stack sx={{backgroundColor:"#eeeeee55", width:"100%", justifyContent: 'space-between'}} direction={"row"} alignItems={"top"}  >
                <Typography color="text.secondary" align='left'
                variant="body2" display="block" gutterBottom>
                     {!props.highlight && <>{props.element.example}</> }
                     {props.highlight && 
                     <Highlighter highlightTag={Highlight} searchWords={toHighlight} textToHighlight={props.element.example} />}
                </Typography>
                
                <Stack direction={"row"} alignItems={"top"}>
                    <IconButton onClick={()=>handleClick(props.element.id,1)} > <CheckCircleOutlineIcon color={labeled==1?"success":"disabled"} /></IconButton>
                    <IconButton  onClick={()=>handleClick(props.element.id,0)} > <HighlightOffIcon color={labeled==0?"error":"disabled"} /></IconButton>


                </Stack>


            </Stack>
        </ListItem>:
        <></>}
        </>
    )


}