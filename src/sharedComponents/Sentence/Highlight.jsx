import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Divider, Stack } from '@mui/material';
import { labelData, fetchPatterns, fetchCombinedPatterns } from '../../features/Workspace/Dataslice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { darken, lighten } from '@material-ui/core';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import './index.css'
import Popover from '@mui/material/Popover';



export default function Highlight(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [patterns, setPatterns] = React.useState([])
    const [showDelete, setShowDelete] = React.useState(false)

    const workspace = useSelector(state => state.workspace)




    const getMatchingPatterns =()=>{
        
        for (let index = props.start; index < props.end; index++) {
            // console.log("I got this ",props.matchedWith[index])
            setPatterns([...patterns, ...props.matchedWith[index]])
            
        }



    }

    const handlePopoverOpen = (event) => {
        
        // if(props.matchedWith && props.matchedWith.length>0){
            if(props.matched){

            setAnchorEl(event.currentTarget);
            // console.log(props.matchedWith)
            // console.log(props.start, props.end, props.word)
            getMatchingPatterns()
            setShowDelete(true)

            // console.log(patterns)
            // console.log(props.matchedWith[props.index])

            // console.log(workspace.selectedPatterns[props.matchedWith[props.index]])
        }
      };
    
      const handlePopoverClose = () => {
        setAnchorEl(null);
        setPatterns([])
        setShowDelete(false)
      };

      const handleClick = () => {
          if(props.deleteMatched){
              props.deleteMatched(props.word, 0)
          }

        
      };



      const open = Boolean(anchorEl);
    return (
    <>

            <span
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                className={ (props.matched)
                ? workspace.selectedPatterns[props.patterns[0]]<0?'highlight_red':'highlight': "non-highlight"}>

                {props.word}

               {showDelete&& <IconButton onClick={handleClick} className={(props.matched)
                ? 'show': "hide"}>
                    <HighlightOffIcon />
                </IconButton>}

            </span>
            

            <Popover
                id="mouse-over-popover"
                sx={{
                pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
            <Typography sx={{ p: 1 }}>
                <>
                <>Model: {parseFloat(props.score).toFixed(2)}</>
                <Divider orientation="horizontal" variant="middle" flexItem />
                </>
                
                {props.matched && 
                

             patterns.map((pattern, index)=><><em key={`pat_${index}`}>{pattern}</em>: { parseFloat(workspace.selectedPatterns[pattern]).toFixed(2)}<br/></>)}
             
            
            </Typography>
        </Popover>
    </>
    )



}