import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';
import { labelData, fetchPatterns, fetchCombinedPatterns } from '../../features/Workspace/Dataslice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { darken, lighten } from '@material-ui/core';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import './index.css'
import Highlight from './Highlight';


export default function Sentence(props) {


    const dispatch = useDispatch();



    const handleLabeling = (element_id, label)=>{
        dispatch(labelData({ element_id: element_id, label: label })).then(()=>{
            dispatch(fetchPatterns()).then(()=>{
                dispatch(fetchCombinedPatterns())
            })
            
        })

    }

    const handleBatchLabel =(element_id, label)=>{

            props.setPositiveIds({element_id, label})
            console.log(props.positiveIds)
        


    }
    


    return(
        <>
        {props.hovering ?
            props.explanation ?
            <Card >
        <CardContent>
            <Stack direction={"row"}>

            
            {props.element.user_label!=null && <Chip label={`labeled: ${props.element.user_label}`} color={props.element.user_label?"success":"error"} size='small' variant='outlined' sx={{mr:"5px"}}/>}
                
                <Typography sx={{ fontSize: 16,
                        fontWeight:500, 
                        
                        // backgroundColor:`${lighten('#86de8c', 1-props.score)}`,
                    }}
                        color="text.secondary" align='left'
                     >
                         <Stack  direction={"row"} spacing={1} maxWidth={"100%"} overflow={"hidden"} sx={{flexWrap: "wrap"}}>
                            {props.element.example.split(" ").map((word, index)=><Highlight start={props.explanation[1]} end={props.explanation[2]} index={index} word={word} />)}
                        </Stack>
                         
                         
                         </Typography>
                         <Stack direction={"row"}>

                            <IconButton onClick={()=>handleBatchLabel(props.element.id,1)} m={0}> <CheckCircleOutlineIcon color={props.positiveIds[props.element.id]==1?"success":"disabled"} /></IconButton>
                            <IconButton  onClick={()=>handleBatchLabel(props.element.id,0)} > <HighlightOffIcon color={props.positiveIds[props.element.id]==0?"error":"disabled"} /></IconButton>


                        </Stack>
                         </Stack></CardContent></Card>
            :<></>
            :
        <Card sx={{
                    ...(props.focusedId==props.element.id) && 
                    {borderColor:'#f6f6f6', backgroundColor:"#f5f5f5", borderRadius:"20px"},

                    ...(props.focusedId!=props.element.id) &&
                    {border:"none",  borderRadius:"0px"},

                     boxShadow:"none"}} variant="outlined" 
                    onClick={()=>props.setFocusedId(props.element.id)} raised={false}>
            <CardContent>
                <Stack direction={"row"}>
                {props.element.user_label!=null && <Chip label={`labeled: ${props.element.user_label}`} color={props.element.user_label?"success":"error"} size='small' variant='outlined' sx={{mr:"5px"}}/>}
                    
                    <Typography sx={{ fontSize: 16,
                        fontWeight:300, 
                        padding:"2px",
                        ...(props.focusedId==props.element.id) && {fontSize: 20,fontWeight:400, },

                        ...(props.score && props.score>0.5 && !props.hovering) 
                        &&{borderColor: '#fff', padding:"10px", border:"1px", border:"1px", borderRadius:"25px", textDecoration: 'underline',
                        textDecorationColor: `${lighten('#86de8c', 1-props.score)}`}, textDecorationThickness:"8px" ,
                        
                        ...(props.score && props.score<=0.5 && !props.hovering) 
                        &&{borderColor: '#fff', padding:"10px", border:"1px", borderRadius:"25px",textDecoration: 'underline', 
                        textDecorationColor:`${lighten('#fc0b22', 1-props.score)}`, textDecorationThickness:"8px"} 
                    }}
                        
                        color="text.secondary" align='left' >
                            <Stack  direction={"row"} spacing={1} maxWidth={"100%"} overflow={"hidden"} sx={{flexWrap: "wrap"}}>
                    {props.element.example.split(" ").map((word, index)=><Highlight index={index} word={word} />)}
                    </Stack>
                    
                    </Typography> 
                    {/* <Stack direction={"row"}>

                        <IconButton onClick={()=>handleBatchLabel(props.element_id,1)} m={0}> <CheckCircleOutlineIcon color={pos==true?"success":"disabled"} /></IconButton>
                        <IconButton  onClick={()=>handleBatchLabel(props.element_id,0)} > <HighlightOffIcon color={pos==false?"error":"disabled"} /></IconButton>


                    </Stack> */}

                    {/* <Stack  direction={"row"} spacing={1} maxWidth={"100%"} overflow={"hidden"} sx={{flexWrap: "wrap"}}>
                    {props.element.example.split(" ").map(word => <Highlight word={word} />)
                    
                    }
                    </Stack> */}

                </Stack>
            </CardContent>
            {props.focusedId==props.element.id &&
            <>
            
            <CardActions>
                <Typography sx={{ fontSize: 14, fontWeight:200 }} color="text.secondary" align='left' m={1}>Is this about {props.theme}? </Typography>
                <Button size="small" variant="outlined" color="success" onClick={()=>handleLabeling(props.element.id, 1)} >Yes</Button>
                <Button size="small" variant="outlined" color="error" onClick={()=>handleLabeling(props.element.id, 0)}>No</Button>
            </CardActions>
        </>
                
            }
        </Card>
        }
        </>

    )
}