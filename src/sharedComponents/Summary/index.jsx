import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItem, List, ListItemText } from '@mui/material';
import { Stack, Chip } from "@mui/material";



export default function Summary(props) {





    // return (
    //     <div>

    //         {/* <TabelView data={props.data} columns={[ { id: 'overall_fscore', label: 'Overall Fscore'},
    //                                     { id: 'overall_recall', label: 'Overall Recall'}, 
    //                                     { id: 'overall_precision', label: 'Overall Precision'}, 
    //                                     { id: 'fscore', label: 'Fscore'},
    //                                     { id: 'recall', label: 'Recall'}, 
    //                                     { id: 'precision', label: 'Precision'}]} /> */}

            




    //         {/* {props.data && <h4>{props.data.fscore}</h4>} */}



    //     </div>  

    // )


    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography variant='h5'>Patterns for <Chip key={`menuitem_new_theme_light_summary`} label={""} color={'primary'} sx={{backgroundColor:props.color, width:20, height:20, marginRight:1,  mr: 1, my: 0.5 }} size="small" />
            {props.selectedTheme}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            <List dense={true}>
                <ListItem>
                  <ListItemText
                    primary={`Overall Fscore: ${props.data.overall_fscore}`}
                    secondary = {`Fscore: ${props.data.fscore}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={`Overall Recall: ${props.data.overall_recall}`}
                    secondary = {`Recall: ${props.data.recall}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={`Overall Precision: ${props.data.overall_precision}`}
                    secondary = {`Precision: ${props.data.precision}`}
                  />
                </ListItem>
            </List>
            </Typography>
            </AccordionDetails>
        </Accordion>
    )

}