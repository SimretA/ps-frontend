import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Button, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';

export default function CustomPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const phraseLabeling=(id, label)=>{
    props.handleClose(label)

  }

  return (

      <Popover
        id={id}
        open={props.open}
        anchorEl={props.anchorPoint}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        
      >
        {/* <Button size="small" variant={"outlined"} color="success" onClick={()=>phraseLabeling("hello", 1)} >Yes</Button>
        <Button size="small" variant={"outlined"} color="error" onClick={()=>phraseLabeling("hello", 1)} >No</Button> */}
        <Stack sx={{
            backgroundColor:"#000000",
            opacity:0.5
          }}
          direction={"row"}>

            <IconButton onClick={()=>phraseLabeling("hello", 1)} m={0}> <CheckCircleOutlineIcon color={"success"} /></IconButton>
            <IconButton onClick={()=>phraseLabeling("hello", 0)} > <HighlightOffIcon color={"error"} /></IconButton>

        </Stack>




      </Popover>
  );
}
