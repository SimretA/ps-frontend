import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Chip, Stack, Button, CircularProgress, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Highlight from './Highlight';
import { useDispatch, useSelector } from 'react-redux';
import { labelData, fetchRelatedExample, labelPhrase, updateElementLabel, deleteLabelData } from '../../features/Workspace/Dataslice';
import SentenceLight from './sentenceLight';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';


export default function AccordionSentence(props) {


    const dispatch = useDispatch();
    const workspace = useSelector(state => state.workspace)

    const [matchedParts, setMatchedParts] = React.useState(null)
    const [matchedIndex, setMatchedIndex] = React.useState(null)
    const [sentence, setSentence] = React.useState(null)
    const [expandMore, setExpandMore] = React.useState(false)
    const [labeled, setLabeled] = React.useState(workspace.userLabel[props.elementId])
    const[loading, setLoading] = React.useState(false)
    const[activateSelection, setActivateSelection] = React.useState(false)




    React.useEffect(()=>{
        setSentence(props.example)
    }, [])

    useEffect(()=>{
        if(props.score>0.5){
            setMatchedParts(getMatchedParts(props.elementId, props.example))
        }else{
            let parts = {}
            parts[`${props.example}`] = [false, 0, -1, []]
            setMatchedParts(parts)
        }

    },[props.score])


    const handleLabeling = (element_id, label)=>{
        props.setFocusedId(null)
        setLabeled(label)
        
        dispatch(labelData({ element_id: element_id, label: label })).then(()=>{
            

            
        })
    }

    const handleShowMore = () =>{

        if(expandMore){

            setExpandMore(false)
            props.retrain()
        }else{
            setLoading(true)

            dispatch(fetchRelatedExample({"id":props.elementId})).then(()=>{
                setLoading(false)
              })

        }
        setExpandMore(!expandMore)

    }

    const handleBatchLabel =(element_id, label)=>{

        props.setPositiveIds({element_id, label})
        console.log("batch setting ", props.positiveIds[props.elementId])
    }

    const getMatchedParts = (id, sentence) =>{
        const explanations = workspace.explanation
        let sentence_array = sentence.split(" ")
        let matchedParts = {}
        sentence_array.forEach((element, index) => {
          matchedParts[index] = []
          
        });
        
  
        for (let [key, value] of Object.entries(explanations)) {
          const exp = value[id]
          if(exp != ""){
            const start = value[id][0][1]
            const end = value[id][0][2]
            for(let i=start;i<end; i++){
                // console.log("matching i ", i, matchedParts[i])
                try{
                    matchedParts[i] = [...matchedParts[i], key]

                }
                catch(error){
                    // console.log(error)
                    // console.log( matchedParts[i])
                }
              
            }
          }
         
        }
        setMatchedIndex(matchedParts)

        let highlighted ={}

        let substr = ''
        let current = null
        let start_index_counter = 0
        let end_index_counter = 0
        let previous_patterns = []
        let current_patterns = []

        for (let [key, value] of Object.entries(matchedParts)) {
            
            let matched = value.length>0
            if(current==null){
                current = matched
                substr += " "+sentence_array[key]
                previous_patterns = value

                current_patterns = [...value]
            }
            else{
                if(current != matched){
                    
                    highlighted[`${substr} `] = [current, start_index_counter, end_index_counter, current_patterns]

                    start_index_counter =  end_index_counter

                    current = matched
                    substr = sentence_array[key]

                    current_patterns = [...value]

                }else{
                    const filteredArray = previous_patterns.filter(value2 => value.includes(value2));
                    if(filteredArray.length){
                        substr += " "+sentence_array[key]
                        current_patterns = [...new Set([...current_patterns, ...value])];

                    }else{
                        highlighted[`${substr} `] = [current, start_index_counter, end_index_counter, current_patterns]


                        start_index_counter =  end_index_counter
    
                        current = matched
                        current_patterns = [...value]
                        substr = sentence_array[key]

                    }
                    
                }

                if(sentence_array.length-1==key){
                    highlighted[`${substr} `] = [current, start_index_counter, end_index_counter, current_patterns]
                }
            }

            end_index_counter += 1
            previous_patterns = value
        }

        

        return highlighted
      }

      const getSentenceParts = (sentence_list, start, end)=>{
            let sentence = []
            if(start>0){
                sentence.push([sentence_list.slice(0,start).join(' '),0])
            }
            sentence.push([sentence_list.slice(start, end).join(' '),1])
            if(end<sentence_list.length-1){
                sentence.push([sentence_list.slice(end, sentence_list.length).join(' '),0])
            }



            return sentence
            


        }

        const handleUnmatch=(key, label)=>{
            setActivateSelection(true)
            let matched = {...matchedParts}
            matched[key] = [0]
            setMatchedParts(matched)
    
            dispatch(labelPhrase({"phrase":key, "label":label}))
    
        }

        const handleAddLabel=(event, label)=>{
            props.setAnchorEl(event.currentTarget)
            // setSentenceLabels([...sentenceLabels,"Hello"])

        }

        const handelDeleteLabel = (elementId, label)=>{
            dispatch(updateElementLabel({elementId, label, event:"REMOVE"}))
            dispatch(deleteLabelData({elementId, label}))
        }

    return (
        <Accordion elevation={2} expanded={props.focused} 
                    onClick={()=>{
                        console.log("Clicked")
                        props.setFocusedId(props.index)
                    }}
                    sx={{
                        ...expandMore && {position:"sticky",top: 0}
                    }}>
            <AccordionSummary
            sx={{userSelect:"text"}}
            
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >

                <Stack direction="column">

                    <Stack spacing={1} direction={"column"}>
                        {/* {props.element.user_label!=null || labeled && <Chip label={props.element.user_label || labeled==1?`Labeled ${props.theme}`:labelData==0?`Labeled not`:''} variant={"filled"} color={props.element.user_label?"success":"error"} size='small'  sx={{mr:"5px"}}/>} */}
                        {labeled!=null && <Chip label={labeled==1?`Labeled ${props.theme}`:`Labeled not`} variant={"filled"} color={labeled==1?"success":"error"} size='small'  sx={{mr:"5px"}}/>}
                        {/* {props.score!=null && props.score!=0.5 && <Chip label={props.element.score>0.5?`Predicted ${props.theme}`:`Predicted not`} color={props.element.score>0.5?"success":"error"} size='small' variant='outlined' sx={{mr:"5px"}}/>} */}
                    </Stack>


                    <Typography sx={{ fontSize: 16,
                            fontWeight:500}}
                            color="text.secondary" align='left'
                            variant="body2" display="block" gutterBottom
                            onMouseUp={(event)=>props.getSelection(event)}
                        >

                            <Stack  direction={"row"} spacing={1} maxWidth={"100%"} overflow={"hidden"} sx={{flexWrap: "wrap"}}>
                                <Typography sx={{ fontSize: 16,
                                    fontWeight:500, 
                                    
                                    // backgroundColor:`${lighten('#86de8c', 1-props.score)}`,
                                }}
                                    color="text.secondary" align='left'
                                    variant="body2" display="block" gutterBottom
                                >
                                    <Stack  direction={"row"} spacing={1} maxWidth={"100%"} overflow={"hidden"} sx={{flexWrap: "wrap", zIndex:10}}>
                                        
                                        {matchedParts && Object.keys(matchedParts).map((key,index)=>
                                        <Highlight key={`sent_${props.elementId}_${index}`} 
                                                        score={props.score} word={key} 
                                                        matched={matchedParts[key][0]} 
                                                        deleteMatched={handleUnmatch}
                                                        start={matchedParts[key][1]} 
                                                        end={matchedParts[key][2]}
                                                        patterns = {matchedParts[key][3]}
                                                        matchedWith={matchedIndex} 
                                                        setPopoverAnchor={props.setPopoverAnchor}
                                                        setPopoverContent={props.setPopoverContent}/>)}


                                        {!matchedParts && <Highlight word={props.example} />}
                                        {/* {props.element.example} */}
                                    </Stack>
                                    
                                    
                                    </Typography>
                            </Stack>
                    </Typography>
                    <Stack spacing={1} direction={"row"}>
                        {!props.focused && workspace.element_to_label[props.elementId] && workspace.element_to_label[props.elementId].map(label=><Chip key={`${props.elementId}_${label}_light`} label={""} color={'primary'} sx={{backgroundColor:workspace.color_code[label], width:20, height:20}} size="small" />)}
                    </Stack>

                </Stack>
                    
            </AccordionSummary>

            <AccordionDetails>

                <Stack direction={"row"} spacing={2}>
                    {!activateSelection?<>
                        {/* <Typography sx={{ fontSize: 14, fontWeight:200 }} color="text.secondary" align='left' m={1}>Is this about {props.theme}? </Typography>
                        <Button size="small" variant={labeled==1?"contained":"outlined"} color="success" onClick={()=>handleLabeling(props.elementId, 1)} >Yes</Button>
                    <Button size="small" variant={labeled==0?"contained":"outlined"} color="error" onClick={()=>handleLabeling(props.elementId,0)}>No</Button> */}
                        {workspace.element_to_label[props.elementId] && workspace.element_to_label[props.elementId].map(label=><Chip key={`${props.elementId}_${label}`} label={label} color={'primary'} sx={{backgroundColor:workspace.color_code[label]}} size="small" onDelete={()=>handelDeleteLabel(props.elementId, label)}/>)}
                        <Chip icon={<AddIcon />} label="Add Label" variant="outlined"  size="small" onClick={(event)=>handleAddLabel(event,props.elementId)} />

                    </>:
                        <Typography sx={{ fontSize: 14, fontWeight:200 }} color="text.secondary" align='left' m={1}>Please select phrase about {props.theme}. </Typography>
                    }

                    {props.score>0.5 && <Button onClick={()=>handleShowMore()}>{expandMore?"Done":"See More"}</Button>}

                   
                </Stack>

                {expandMore && <Stack direction={"column"} maxHeight={"50vw"} overflow={"auto"}>

                    <Divider/>

                    {loading && <CircularProgress sx={{position:"fixed", top:"30%", left:"300px"}}></CircularProgress>}

                    

                    {!loading && workspace.relatedExamples.map(element=><SentenceLight show={true} highlight={workspace.relatedExplanation[element.id]} element={element} handleBatchLabel={handleBatchLabel} sentence={element.example} key={`lightsent_${element.id}`}/>)}


                </Stack>}

            </AccordionDetails>
        </Accordion>)

}