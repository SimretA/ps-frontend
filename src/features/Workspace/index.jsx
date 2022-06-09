import { Box } from '@material-ui/core';
import { Stack } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sentence from '../../sharedComponents/Sentence';
import TabelView from '../../sharedComponents/TableView';
import Header from '../HeaderComponent';
import Summary from '../../sharedComponents/Summary';
import {clearAnnotation, fetchDataset} from "./Dataslice"
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';


function Workspace() {

    //States 
    const [focusedId, setFocusedId] = React.useState(null);
    const [labelCounter, setLabelCounter] = React.useState(0);
    const [hovering, setHovering] = React.useState(null)



    //Effects
      React.useEffect(() => {
        dispatch(clearAnnotation()).then(() => dispatch(fetchDataset()))
        }, []);

    const workspace = useSelector(state => state.workspace)

    const dispatch = useDispatch();


  return (<Stack direction={"column"}  spacing={15}>
      <Header/>
      <Stack direction={"row"} sx={{ height: '80vh',}} mt={5}>
            <Box style={{maxHeight: '100%',maxWidth:'50vw',minWidth:'50vw', overflow: 'auto'}} >
            {workspace.dataset.map(element => <Sentence 
                                                explanation={hovering && workspace.explanation? workspace.explanation[hovering][element.id]:null}
                                                hovering={hovering} score={element.score} key={element.id} 
                                                element={element} focusedId={focusedId} 
                                                setFocusedId={setFocusedId} theme={workspace.theme} 
                                                labelCounter={labelCounter} setLabelCounter={setLabelCounter}/>)}

            </Box>
            <Box style={{maxHeight: '100%', maxWidth:'50vw', overflow: 'auto'}}>
            <Stack direction={"column"}>
                <Summary data={workspace.combinedPatterns}/>
                <TabelView setHovering={setHovering} 
                loading={workspace.loadingCombinedPatterns} data={workspace.combinedPatterns.patterns} columns={[ { id: 'pattern', label: 'Pattern'},
                                                                { id: 'weight', label: 'Weight'}, 
                                                                { id: 'fscore', label: 'Fscore'},
                                                                { id: 'recall', label: 'Recall'}, 
                                                                { id: 'precision', label: 'Precision'}]}/>


                <TabelView loading={workspace.loadingPatterns} data={workspace.patterns} columns={[ { id: 'pattern', label: 'Pattern'}, 
                                                                { id: 'fscore', label: 'Fscore'},
                                                                { id: 'recall', label: 'Recall'}, 
                                                                { id: 'precision', label: 'Precision'}]}/>
            </Stack>

            </Box>
          
      </Stack>

     
    </Stack>

  );


}


export default {
    routeProps: {
      path: "/",
      element: <Workspace />
    },
    name: 'workspace'
  };