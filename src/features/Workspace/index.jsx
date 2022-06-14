import { Box } from '@material-ui/core';
import { Stack } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sentence from '../../sharedComponents/Sentence';
import TabelView from '../../sharedComponents/TableView';
import Header from '../HeaderComponent';
import Summary from '../../sharedComponents/Summary';
import {clearAnnotation, fetchDataset, batchLabelData, labelData, fetchPatterns, fetchCombinedPatterns} from "./Dataslice"
import Scroller from '../MarkedScrollbar';

import Fab from '@mui/material/Fab';


function Workspace() {

    //States 
    const [focusedId, setFocusedId] = React.useState(null);
    const [labelCounter, setLabelCounter] = React.useState(0);
    const [hovering, setHovering] = React.useState(null)
    const [positiveIds, setPositiveIds] = React.useState({})

    const [negativeIds, setNegativeIds] = React.useState([])

    const handleAddToPos =(elem)=>{
      let ps = positiveIds
      ps[elem.element_id] = elem.label
      setPositiveIds(ps
        )

    }


    




    //Effects
      React.useEffect(() => {
        dispatch(clearAnnotation()).then(() => dispatch(fetchDataset()))
        }, []);

    const workspace = useSelector(state => state.workspace)

    const dispatch = useDispatch();


  return (<Stack direction={"column"}  sx={{height:"100vh"}} spacing={15}>
      <Header/>
      <Scroller dataset={workspace.dataset} height={500}/>
      <Stack direction={"row"} sx={{ height: '90vh',}} mt={5}>
            <Box style={{maxHeight: '100%',maxWidth:'50vw',minWidth:'50vw', overflow: 'auto'}} >
            {workspace.dataset.map(element => <Sentence 
                                                positiveIds={positiveIds} setPositiveIds={handleAddToPos}
                                                negativeIds={negativeIds} setNegativeIds={setNegativeIds}
                                                explanation={hovering && workspace.explanation? workspace.explanation[hovering][element.id]:null}
                                                hovering={hovering} score={element.score} key={element.id} 
                                                element={element} focusedId={focusedId} 
                                                setFocusedId={setFocusedId} theme={workspace.theme} 
                                                labelCounter={labelCounter} setLabelCounter={setLabelCounter}/>)}

            {hovering && (Object.keys(positiveIds).length>0) && 
            <Fab  
                sx={{position:"sticky", bottom:"50px", marginLeft:"20px"}} 
                color={"primary"} 
                variant="extended"
                onClick={()=>{
                  setPositiveIds({})
                  setHovering(null)
                  console.log(positiveIds)

                  for (const [key, value] of Object.entries(positiveIds)) {

                    dispatch(labelData({"element_id":key, "label":value}))


                  }
                  dispatch(fetchPatterns()).then(()=>{
                    dispatch(fetchCombinedPatterns())
                  })

                 
                }}
                >
                            Done
                      </Fab>
            }

            </Box>
            <Box style={{maxHeight: '100%', maxWidth:'50vw',minWidth:'50vw', overflow: 'auto'}}>
            <Stack direction={"column"}>
                <Summary data={workspace.combinedPatterns}/>
                <TabelView setHovering={setHovering} hovering={hovering}
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