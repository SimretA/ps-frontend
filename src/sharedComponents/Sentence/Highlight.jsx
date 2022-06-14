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


export default function Highlight(props) {

    // const workspace = useSelector(state => state.workspace)
    // useEffect(()=>{
    //     if(props.start){        
    //         console.log("The start and end are ", props.start, props.end, props.index)
    //     }
    // })

    return (
        <span className={props.start<=props.index && props.index<props.end? 'highlight':""}>

            {props.word}
        </span>
    )



}