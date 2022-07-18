import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton, LinearProgress } from '@material-ui/core';
import {Popover} from '@material-ui/core';
import { Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useDispatch, useSelector } from 'react-redux';
import { explainPattern } from '../../features/Workspace/Dataslice';


export default function TabelView(props) {
  const [page, setPage] = React.useState(0);
  const [openPopover, setOpenPopover] = React.useState(false);
  const [anchorPoint, setAnchorPoint] = React.useState(null);

  
  const [locked, setLocked] = React.useState(false);

  const workspace = useSelector(state => state.workspace)

  const dispatch = useDispatch();


  const handleVisiblityLock = (row)=>{
    if(!locked  && props.setHovering){
        props.setHovering(row['pattern'])
        setLocked(true)

    }
    else if (locked && props.setHovering){
        if(props.hovering==row['pattern']){
            setLocked(false)
            props.setHovering(null)

        }else{
            props.setHovering(row['pattern'])
        }
    }

  }

  const handleExplain = (event, row) =>{
    dispatch(explainPattern({"pattern":row["pattern"]})).then(()=>{
        console.log("explanation we got ", workspace.patternExp)
        if(workspace.patternExp && Object.keys( workspace.patternExp).length>0){
            setAnchorPoint(event.target)
            setOpenPopover(true)
        }
    })

  }
  return (

    <Paper sx={{ width: '100%',  paddingBottom:"20px", overflow:"hidden", marginBottom:"5px" }}>

    <Popover
            open={openPopover}
            anchorEl={anchorPoint}
            onClose={openPopover}
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
                {workspace.patternExp&& Object.keys( workspace.patternExp).map((key, index) => <><em>{key}</em>: <>{workspace.patternExp[key].join()}</></> ) }

            </Stack>




    </Popover>


        {props.loading && <LinearProgress width={'100%'}/>}
        <>
            <TableContainer  >

                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {props.columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {props.data && props.data
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} 

                        sx={{...props.hovering==row['pattern'] &&{backgroundColor:"#f5f5f5"}}}

                        // onMouseEnter = {(event)=>handleExplain(event, row)}
                        // onMouseLeave = {()=>{
                        //     setAnchorPoint(null)
                        //     setOpenPopover(false)
                        // }}

                        

                        >
                            {props.columns.map((column) => {
                            const value = row[column.id];
                            return (
                                <TableCell key={column.id} align={column.align}>
                                {typeof(value )=== 'number'
                                    ? parseFloat(value).toFixed(2)
                                    : value}
                                </TableCell>
                            );
                            })}
                            <TableCell key={'filter'}><IconButton onClick={()=>handleVisiblityLock(row)}>{props.hovering==row['pattern']?<VisibilityOffIcon/>:<VisibilityIcon/>}</IconButton></TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
      </>
    </Paper>
  );
}
