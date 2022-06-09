import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ListItemIcon from '@mui/material/ListItemIcon';


export default function Settings(props) {

    const options = [
        'Do not reorder',
        'Show me positive labels on top',
        'Show me negative labels on top',
        'Show me unlabeled data on top',
      ];

    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <List
            component="nav"
            aria-label="Device settings"
            sx={{ bgcolor: 'background.paper' }}
        >
            <ListItem
            button
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="Preference"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
            >
                <ListItemIcon>
                    <AutoFixHighIcon/>
                </ListItemIcon>
            <ListItemText
                primary="Preference"
                secondary={options[selectedIndex]}
            />
                
            </ListItem>
        </List>
        <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
            }}
        >
            {options.map((option, index) => (
            <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
            >
                {option}
            </MenuItem>
            ))}
        </Menu>
        </div>
    );

}