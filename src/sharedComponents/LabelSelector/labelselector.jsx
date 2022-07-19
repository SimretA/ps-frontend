import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { multiLabelData, updateElementLabel } from '../../features/Workspace/Dataslice';
import { Chip } from '@mui/material';

const ITEM_HEIGHT = 48;

export default function LabelSelector({anchorEl, setAnchorEl, elementId}) {
    const workspace = useSelector(state => state.workspace)
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAddLabel = (label)=>{
        setAnchorEl(null)
        // workspace.element_to_label[elementId]= [label]
        dispatch(updateElementLabel({elementId, label, event:"ADD"}))
        dispatch(multiLabelData({elementId, label}))

    }


    return (
        <Menu
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
            },
            }}
        >
            {workspace.themes.map((theme) => (
            <MenuItem sx={{textTransform:'capitalize'}} key={theme} disabled={false} onClick={()=>handleAddLabel(theme)}>
               <Chip key={`menuitem_${theme}_light`} label={""} color={'primary'} sx={{backgroundColor:workspace.color_code[theme], width:20, height:20, marginRight:1}} size="small" />  {theme}
            </MenuItem>
            ))}
        </Menu>
    );
}
