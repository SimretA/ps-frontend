import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from 'react-redux';
import { changeSetting } from '../../features/Workspace/Dataslice';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Settings(props) {

    const workspace = useSelector(state => state.workspace)

    const dispatch = useDispatch();

    const options = workspace.orderSetting
    const [value, setValue] = React.useState("");

    React.useEffect(()=>{
        console.log(workspace.selectedSetting)
    },[])

    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        dispatch(changeSetting({"selectedSetting":index}))
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // return (
    //     <div>
    //     <List
    //         component="nav"
    //         aria-label="Device settings"
    //         sx={{ bgcolor: 'background.paper' }}
    //     >
    //         <ListItem
    //         button
    //         id="lock-button"
    //         aria-haspopup="listbox"
    //         aria-controls="lock-menu"
    //         aria-label="Preference"
    //         aria-expanded={open ? 'true' : undefined}
    //         onClick={handleClickListItem}
    //         >
    //             <ListItemIcon>
    //                 <AutoFixHighIcon/>
    //             </ListItemIcon>
    //         <ListItemText
    //             primary="Preference"
    //             secondary={options[workspace.selectedSetting]}
    //         />
                
    //         </ListItem>
    //     </List>
    //     <Menu
    //         id="lock-menu"
    //         anchorEl={anchorEl}
    //         open={open}
    //         onClose={handleClose}
    //         MenuListProps={{
    //         'aria-labelledby': 'lock-button',
    //         role: 'listbox',
    //         }}
    //     >
    //         {Object.keys(options).map((key) => (
    //         <MenuItem
    //             key={options[key]}
    //             selected={key === workspace.selectedSetting}
    //             onClick={(event) => handleMenuItemClick(event, key)}
    //         >
    //             {options[key]}
    //         </MenuItem>
    //         ))}
    //     </Menu>
    //     </div>
    // );


    return (
        <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Preference</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value = {workspace.selectedSetting}
        onChange={(event) => handleMenuItemClick(event, event.target.value)}
      >

    {Object.keys(options).map((key) => <FormControlLabel value={key} control={<Radio />} label={options[key]} />)}
        
        
      </RadioGroup>
    </FormControl>
    )

}