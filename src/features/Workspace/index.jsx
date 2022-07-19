import { Box } from '@material-ui/core';
import { Stack } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sentence from '../../sharedComponents/Sentence';
import AccordionSentence from '../../sharedComponents/Sentence/sentence';
import TabelView from '../../sharedComponents/TableView';
import Header from '../HeaderComponent';
import Summary from '../../sharedComponents/Summary';
import {clearAnnotation, fetchDataset, labelPhrase, labelData, fetchPatterns, fetchCombinedPatterns, fetchThemes, fetchSelectedTheme, setTheme} from "./Dataslice"
import Scroller from '../MarkedScrollbar';

import Fab from '@mui/material/Fab';
import Sidebar from '../sidebar';
import CustomPopover from '../../sharedComponents/CustomPopover';
import SentenceLight from '../../sharedComponents/Sentence/sentenceLight';
import Popover from '@mui/material/Popover';
import LabelSelector from '../../sharedComponents/LabelSelector/labelselector';

function Workspace() {

    //States 
    const [focusedId, setFocusedId] = React.useState(0);
    const [labelCounter, setLabelCounter] = React.useState(0);
    const [hovering, setHovering] = React.useState(null)
    const [positiveIds, setPositiveIds] = React.useState({})
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [openSideBar, setOpenSideBar] = React.useState(false);
    
    const [labelSelectorAnchor, setLabelSelectorAnchor] = React.useState(null);

    const workspace = useSelector(state => state.workspace)

    const dispatch = useDispatch();

    //Context menu
    const [anchorPoint, setAnchorPoint] = React.useState(null);
    const [showContextMenu, setShowContextMenu] = React.useState(false);
    const [popoverAnchor, setPopoverAnchor] = React.useState(null);
    const [popoverContent, setPopoverContent] = React.useState(null);


    const getSelection = (event)=>{
      let selected = window.getSelection().toString()

      if(selected.length==0){
        return
      }
        event.preventDefault()
        

        setAnchorPoint(event.currentTarget);
        setShowContextMenu(true);

    }



    const handleBatchLabeling = ()=>{
      setPositiveIds({})
      setHovering(null)
      
      for (const [key, value] of Object.entries(positiveIds)) {
        dispatch(labelData({"element_id":key, "label":value}))
      }
      dispatch(fetchPatterns()).then(()=>{
        dispatch(fetchCombinedPatterns())
      })
    }

    const handleAddToPos =(elem)=>{
      let ps = {...positiveIds}
      ps[elem.element_id] = elem.label
      setPositiveIds(ps)

    }

   const retrain=()=>{
    if(labelCounter>0 || true){
      setLabelCounter(0)
      dispatch(fetchPatterns()).then(()=>{
        dispatch(fetchCombinedPatterns())
      })
  }

   }


   const clear_session = ()=>{

    setLabelCounter(0)
    setHovering(null)
    setPositiveIds({})
    // setScrollPosition(0)
    


   }

    
   const handleChangeTheme=(value)=>{
    clear_session()
     dispatch(setTheme({"theme": value })).then(()=>{
      
     })
     clear_session()

   }




    //Effects
      React.useEffect(() => {
        dispatch(clearAnnotation()).then(() => dispatch(fetchDataset()))
        dispatch(fetchThemes())
        dispatch(fetchSelectedTheme())
        }, []);
      
      React.useEffect(()=>{
        if(workspace.userAnnotationCount>0 && workspace.userAnnotationCount%workspace.annotationPerRetrain==0){
            
            dispatch(fetchPatterns()).then(()=>{
              dispatch(fetchCombinedPatterns())
            })
        }

      },[workspace.userAnnotationCount])

      const filterHovering = (hovering)=>{
        let filteredDataset = []
        const exp = workspace.explanation[hovering]
        console.log(exp)
      }

      React.useEffect(()=>{
        console.log("new anchor ",popoverAnchor)

      },[popoverAnchor])



  return (<Stack direction={"column"}  sx={{height:"100vh"}}>
      <LabelSelector anchorEl={labelSelectorAnchor} setAnchorEl={setLabelSelectorAnchor} elementId={workspace.dataset[focusedId] && workspace.dataset[focusedId].id}/>

      <Header setTheme={handleChangeTheme} 
              color_code={workspace.color_code}
              selectedTheme={workspace.selectedTheme} 
              themes={workspace.themes} retrain={retrain} 
               annotationPerRetrain={workspace.annotationPerRetrain} 
              modelAnnotationCount={workspace.modelAnnotationCount} totalDataset={workspace.totalDataset} 
              userAnnotationCount={workspace.userAnnotationCount}/>
      <Scroller dataset={workspace.dataset} scrollPosition={scrollPosition} show={!hovering}/>
      <Stack direction={"row"} sx={{ height: '94vh',}} mt={"8vh"} ml={1}>

            {/* <Box style={{maxHeight: '100%',maxWidth:'15vw',minWidth:'15vw', overflow: 'auto'}}></Box> */}
            <Box style={{maxHeight: '100%',maxWidth:'50vw',minWidth:'50vw', overflow: 'auto'}} 
            onScroll={(event)=>{
              
              setScrollPosition(event.target.scrollTop/event.target.scrollHeight)
             }}>
            {!hovering && workspace.dataset.map((element, index) => <AccordionSentence 
                                                seeMore={setOpenSideBar}
                                                index = {index}
                                                positiveIds={positiveIds} setPositiveIds={handleAddToPos}
                                                explanation={hovering && workspace.explanation? workspace.explanation[hovering][element.id]:null}
                                                hovering={hovering} score={element.score} key={`sentt_${element.id}`} 
                                                elementId={element.id} 
                                                example={element.example}
                                                focused={focusedId==index} 
                                                setFocusedId={setFocusedId} theme={workspace.selectedTheme} 
                                                annotationPerRetrain={workspace.annotationPerRetrain}
                                                getSelection={getSelection}
                                                retrain={handleBatchLabeling}
                                                setPopoverAnchor={setPopoverAnchor}
                                                setPopoverContent={setPopoverContent}
                                                setAnchorEl={setLabelSelectorAnchor}
                                                />)}

            {hovering && workspace.explanation && workspace.dataset.map(element =>
                        <SentenceLight show={workspace.explanation[hovering][element.id]} 
                                      element={element} handleBatchLabel={handleAddToPos} 
                                      sentence={element.example} key={`lightsent_hovering_${element.id}`} />)

            }

            {hovering &&  Object.keys(positiveIds).length>0 && 
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
          
          <CustomPopover open={showContextMenu} anchorPoint={anchorPoint} 
          handleClose={(label)=>{

            let selected = window.getSelection().toString()

            dispatch(labelPhrase({"phrase":selected, "label":label}))
                      .then(()=>{
                        retrain()
                      })
            setShowContextMenu(false)
            setAnchorPoint(null)


            }}/>

      </Stack>


      <Popover id={"generaluse_popover"} anchorEl={popoverAnchor} 
                open={Boolean(popoverAnchor)}  
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                sx={{
                  pointerEvents: 'none',
                  }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
                children={popoverContent}

               />

            {/* {popoverContent}
            
            
      </Popover> */}

     
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