import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Chip, Stack, Button, ListItemButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';


export default function SentenceLight(props) {



    const [labeled, setLabeled] = React.useState(props.element.user_label)

    const handleClick = (id, label)=>{
        setLabeled(label)
        props.handleBatchLabel(id,label)

    }



    
    return(<>
        {props.show ? 
        
        <ListItemButton onClick={()=>{}}>
            <Stack sx={{backgroundColor:"#eeeeee"}} direction={"row"} alignItems={"top"} >
                <Typography color="text.secondary" align='left'
                variant="body2" display="block" gutterBottom> {props.sentence}</Typography>
                
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