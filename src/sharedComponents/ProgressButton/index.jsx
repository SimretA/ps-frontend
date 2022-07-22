import { Grid, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Button, LinearProgress } from "@mui/material";
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
      marginLeft:theme.spacing(2),
      marginRight:theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1),
    },
    progress:{
        height:"50px"
    },
    colorPrimary: {
      backgroundColor: "green" //props => props.color,
    },

    barColorPrimary: {
      backgroundColor: 'red',
    },
    bar: props => ({
      borderRadius: 8,
      backgroundColor: props.color
     })

  }))

  
export default function ProgressButton(props) {
  const [progressColor, setProgressColor] = React.useState({ color: 'red' })

    const classes = useStyles()




    return (
      <div className={classes.root}>
        <Button onClick={()=>props.retrain()} size={"small"} className={classes.button}>
          <div>
            Retrain
            <LinearProgress classes={{
                        colorPrimary: classes.colorPrimary,
                        bar: classes.bar
                      }} sx={{minHeight:"20px"}}  variant="determinate" value={props.value} />
          </div>
        </Button>
      </div>
    )


}