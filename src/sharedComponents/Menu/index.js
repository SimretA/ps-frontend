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
import { Typography } from '@material-ui/core';



const styles = theme => ({
  checked: {}
})

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


    return (
        <FormControl>
      {/* <FormLabel id="demo-row-radio-buttons-group-label">Preference</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value = {workspace.selectedSetting?workspace.selectedSetting:""}
        onChange={(event) => handleMenuItemClick(event, event.target.value)}

        sx={{height:"10vh"}}
      >

    {Object.keys(options).map((key) => <FormControlLabel size="small" value={key}  key={`setting_${key}`} 
                                        control={<Radio sx={{color:workspace.color_code[workspace.selectedTheme]}} 
                                        classes={{}} size="small" />} 
    label={<Typography 
      sx={{fontSize: 14,
      fontWeight:100,}} > {options[key]} </Typography>}/> )}
        
        
      </RadioGroup>
    </FormControl>
    )

}