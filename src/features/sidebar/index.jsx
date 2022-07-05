import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { fetchRelatedExample } from '../Workspace/Dataslice';
import { useDispatch, useSelector } from 'react-redux';
import Sentence from '../../sharedComponents/Sentence';
import { CircularProgress, Stack, Typography } from '@mui/material';

export default function Sidebar(props) {

    const[sent, setSent] = React.useState({})

    const[loading, setLoading] = React.useState(false)

    const workspace = useSelector(state => state.workspace)

    const dispatch = useDispatch();

    React.useEffect(()=>{
      if(props.open && props.focusedId){
        setLoading(true)
        setSent(getSentence(props.focusedId))
        dispatch(fetchRelatedExample({"id":props.focusedId})).then(()=>{
          setLoading(false)
        })
      }

    }, [props.open])

    const getSentence = (id)=>{
      const sentence = workspace.dataset.filter(element => element.id ==  id);
      return sentence

    }



    return (
      <div>
      {props.open && <React.Fragment>
          {/* <Button onClick={toggleDrawer("left", true)}>{anchor}</Button> */}
          <Drawer
            width={"200px"}
            anchor={"left"}
            open={props.open}
            onClose={()=>{props.setOpen(false)}}
          >
            <Stack width={"600px"} spacing={2}>
              <Typography sx={{position:"fixed",backgroundColor:"#ffffff", width:"580px"}} variant="overline" display="block" gutterBottom ml={1}>{sent[0]&&sent[0]['example']}</Typography>
              <Divider/>
              {loading && <CircularProgress sx={{position:"fixed", top:"30%", left:"300px"}}></CircularProgress>}

              <Stack mt={"50px"}>

                    {workspace.relatedExamples.map(element => 
                    
                            <Sentence 
                                                // seeMore={setOpenSideBar}
                                                // positiveIds={positiveIds} setPositiveIds={handleAddToPos}
                                                // explanation={hovering && workspace.explanation? workspace.explanation[hovering][element.id]:null}
                                                // hovering={hovering}
                                                score={element.score} key={`related_sentt_${element.id}`} 
                                                element={element} 
                                                // focusedId={focusedId} 
                                                setFocusedId={()=>{console.log("what is haooening")}} 
                                                theme={workspace.selectedTheme} 
                                                // labelCounter={labelCounter} setLabelCounter={setLabelCounter}
                                                annotationPerRetrain={workspace.annotationPerRetrain}
                                                />)}

                
                  {
                    //  workspace.relatedExamples.map(element=><p key={`related_sentt_${element.id}`} >{element.example}</p>)
                  }

                  </Stack>
                </Stack>

          </Drawer>
        </React.Fragment>}
    </div>
    )



}