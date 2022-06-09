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


export default function Sentence(props) {


    const dispatch = useDispatch();
    

    // React.useEffect(()=>{
    //     if(props.element){
    //         console.log(props.element.example.split(' '))
    //     }

    // },[])
    

    const handleLabeling = (element_id, label)=>{
        dispatch(labelData({ element_id: element_id, label: label })).then(()=>{
            dispatch(fetchPatterns()).then(()=>{
                dispatch(fetchCombinedPatterns())
            })
            
        })

    }


    return(
        <>
        {props.hovering ?
            props.explanation ?
            <Card sx={{
                ...(props.focusedId==props.element.id) && {borderColor:'primary.main'},
                borderRadius:"0px"}} variant="outlined" 
                onClick={()=>props.setFocusedId(props.element.id)}>
        <CardContent>
            <Stack direction={"row"}>

            {props.element.user_label!=null && <Chip label={`labeled: ${props.element.user_label}`} color={props.element.user_label?"success":"error"} size='small' variant='outlined' sx={{mr:"5px"}}/>}

                
                <Typography sx={{ fontSize: 14, 
                        backgroundColor:`${lighten('#86de8c', 1-props.score)}`,}}
                        color="text.secondary" align='left'
                     >
                         
                         {props.element.example}</Typography></Stack></CardContent></Card>
            :<></>
            :
        <Card sx={{
                    ...(props.focusedId==props.element.id) && {borderColor:'primary.main'},
                    borderRadius:"0px"}} variant="outlined" 
                    onClick={()=>props.setFocusedId(props.element.id)}>
            <CardContent>
                <Stack direction={"row"}>
                    {props.element.user_label!=null && <Chip label={`labeled: ${props.element.user_label}`} color={props.element.user_label?"success":"error"} size='small' variant='outlined' sx={{mr:"5px"}}/>}
                    
                    {props.hovering ?
                    props.explanation ?
                    <Typography sx={{ fontSize: 14, 
                        backgroundColor:`${lighten('#86de8c', 1-props.score)}`,}}
                        color="text.secondary" align='left'
                     >{props.element.example}</Typography>:<></>
                    
                    :
                    <Typography sx={{ fontSize: 14, 
                        ...(props.score && props.score>0.5 && !props.hovering) 
                        &&{borderColor: 'primary.main', border:"1px", borderStyle:"dotted", 
                        backgroundColor:`${lighten('#86de8c', 1-props.score)}`} ,
                        ...(props.score && props.score<=0.5 && !props.hovering) 
                        &&{borderColor: 'primary.main', border:"1px", borderStyle:"dotted", 
                        backgroundColor:`${lighten('#fc0b22', 1-props.score)}`} 
                    }}
                        
                        color="text.secondary" align='left'>
                    {props.element.example}
                    </Typography>
}
                </Stack>
            </CardContent>
            {props.focusedId==props.element.id &&
            <>
            <CardActions>
                <Typography sx={{ fontSize: 14 }} color="text.primary" align='left' m={1}>Is this about {props.theme}? </Typography>
                <Button size="small" variant="contained" color="success" onClick={()=>handleLabeling(props.element.id, 1)} >Yes</Button>
                <Button size="small" variant="contained" color="error" onClick={()=>handleLabeling(props.element.id, 0)}>No</Button>
            </CardActions>
        </>
                
            }
        </Card>
        }
        </>

    )
}