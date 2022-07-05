import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';
import { labelData, labelPhrase } from '../../features/Workspace/Dataslice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconButton from '@mui/material/IconButton';
import './index.css'
import Highlight from './Highlight';



export default function Sentence(props) {


    const dispatch = useDispatch();
    const [matchedParts, setMatchedParts] = React.useState(null)
    const [matchedIndex, setMatchedIndex] = React.useState(null)
    const [sentence, setSentence] = React.useState(null)
    const [labeled, setLabeled] = React.useState(props.element.user_label)

 
    const workspace = useSelector(state => state.workspace)

    useEffect(()=>{
        if(props.score>0.5){
            setMatchedParts(getMatchedParts(props.element.id, props.element.example))
        }else{
            setMatchedParts(getMatchedParts(props.element.id, props.element.example))
        }

    },[props.score])

    useEffect(()=>{
        if(!props.hovering){
            setSentence(null)
        }else{
            if(props.explanation[0]){
                setSentence(getSentenceParts(props.element.example.split(" "), props.explanation[0][1], props.explanation[0][2]))

                // console.log(getSentenceParts(props.element.example.split(" "), props.explanation[0][1], props.explanation[0][2]))
                
            }
        }
    },[props.hovering])



    const getMatchedParts = (id, sentence) =>{
        const explanations = workspace.explanation
        let sentence_array = sentence.split(" ")
        let matchedParts = {}
        sentence_array.forEach((element, index) => {
          matchedParts[index] = []
          
        });
        
  
        for (let [key, value] of Object.entries(explanations)) {
          const exp = value[id]
        //   console.log(exp)
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



    const handleLabeling = (element_id, label)=>{
        setLabeled(label)
        dispatch(labelData({ element_id: element_id, label: label })).then(()=>{
            props.setLabelCounter(props.labelCounter+1)

            
        })
        


    }

    const handleBatchLabel =(element_id, label)=>{



            props.setPositiveIds({element_id, label})
            console.log("batch setting ", props.positiveIds[props.element.id])
        


    }

    
    const handleUnmatch=(key, label)=>{
        let matched = {...matchedParts}
        matched[key] = [0]
        setMatchedParts(matched)

        dispatch(labelPhrase({"phrase":key, "label":label}))

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

    

    return(
        <>
        {props.hovering ?
            props.explanation ?
            <Card >
        <CardContent>
            <Stack direction={"row"}>

            <Stack spacing={1} direction={"column"}>
                {/* {props.element.user_label!=null || labeled && <Chip label={props.element.user_label || labeled==1?`Labeled ${props.theme}`:labelData==0?`Labeled not`:''} variant={"filled"} color={props.element.user_label?"success":"error"} size='small'  sx={{mr:"5px"}}/>} */}
                {labeled && <Chip label={labeled==1?`Labeled ${props.theme}`:`Labeled not`} variant={"filled"} color={labeled?"success":"error"} size='small'  sx={{mr:"5px"}}/>}
                {props.score!=null && props.score!=0.5 && <Chip label={props.element.score>0.5?`Predicted ${props.theme}`:`Predicted not`} color={props.element.score>0.5?"success":"error"} size='small' variant='outlined' sx={{mr:"5px"}}/>}
            </Stack>
                
                <Typography sx={{ fontSize: 16,
                        fontWeight:500, 
                        
                        // backgroundColor:`${lighten('#86de8c', 1-props.score)}`,
                    }}
                        color="text.secondary" align='left'
                        variant="body2" display="block" gutterBottom
                     >
                         <Stack  direction={"row"} spacing={1} maxWidth={"100%"} overflow={"hidden"} sx={{flexWrap: "wrap"}}>
                            {sentence && sentence.map((element, index)=>
                            <Highlight start={props.explanation[0][1]} end={props.explanation[0][2]} 
                                    index={index} 
                                    matched={element[1]} 
                                    patterns={[props.hovering]}
                                    word={element[0]} matchedWith={matchedIndex}  />)}
                        </Stack>
                         
                         
                         </Typography>
                         <Stack direction={"row"}>

                            <IconButton onClick={()=>handleBatchLabel(props.element.id,1)} m={0}> <CheckCircleOutlineIcon color={props.positiveIds[props.element.id]==1?"success":"disabled"} /></IconButton>
                            <IconButton  onClick={()=>handleBatchLabel(props.element.id,0)} > <HighlightOffIcon color={props.positiveIds[props.element.id]==0?"error":"disabled"} /></IconButton>


                        </Stack>
                         </Stack></CardContent></Card>
            :<></>
            :
        <Card sx={{
                    ...(props.focusedId==props.element.id) && 
                    {borderColor:'#f6f6f6', backgroundColor:"#f5f5f5", borderRadius:"20px"},

                    ...(props.focusedId!=props.element.id) &&
                    {border:"none",  borderRadius:"0px"},
                    borderBottom:"dashed #ececec 1px",

                     boxShadow:"none"}} variant="outlined" 
                    onClick={()=>props.setFocusedId(props.element.id)} raised={false}
                    
                    
                    >
            <CardContent>
                <Stack direction={"row"}>
                <Stack spacing={1} direction={"column"}>
                    {props.element.user_label!=null && <Chip label={props.element.user_label?`Labeled ${props.theme}`:`Labeled not`} variant={"filled"} color={props.element.user_label?"success":"error"} size='small'  sx={{mr:"5px"}}/>}
                    {props.score!=null && props.score!=0.5 && <Chip label={props.element.score>0.5?`Predicted ${props.theme}`:`Predicted not`} color={props.element.score>0.5?"success":"error"} size='small' variant='outlined' sx={{mr:"5px"}}/>}
                </Stack>
                                    
                    <Typography sx={{ fontSize: 14,
                        fontWeight:300, 
                        padding:"2px",
                        ...(props.focusedId==props.element.id) && {fontSize: 20,fontWeight:400, },
                    }}
                    variant="body2" display="block" gutterBottom
                    onMouseUp={(event)=>props.getSelection(event)}
                       align='left' >
                            <Stack  direction={"row"} spacing={1} maxWidth={"100%"} overflow={"hidden"} sx={{flexWrap: "wrap"}}>

                    {matchedParts && Object.keys(matchedParts).map((key,index)=><Highlight key={`sent_${props.id}_${index}`} score={props.score} word={key} matched={matchedParts[key][0]} deleteMatched={handleUnmatch}
                                                    start={matchedParts[key][1]} 
                                                    end={matchedParts[key][2]}
                                                    patterns = {matchedParts[key][3]}
                                                    matchedWith={matchedIndex} />)}


                    {!matchedParts && <Highlight word={props.element.example} />}

                    {/* <Highlighter
                            highlightClassName="YourHighlightClass"
                            searchWords={["and", "or", "the"]}
                            autoEscape={true}
                            textToHighlight={props.element.example}
                        /> */}

                    </Stack>
                    
                    </Typography> 

                </Stack>
            </CardContent>
            {props.focusedId==props.element.id &&
            <>
            
            <CardActions>
                <Typography sx={{ fontSize: 14, fontWeight:200 }} color="text.secondary" align='left' m={1}>Is this about {props.theme}? </Typography>
                <Button size="small" variant={labeled==1?"contained":"outlined"} color="success" onClick={()=>handleLabeling(props.element.id, 1)} >Yes</Button>
                <Button size="small" variant={labeled==0?"contained":"outlined"} color="error" onClick={()=>handleLabeling(props.element.id, 0)}>No</Button>


                {props.score>0.5&& <Button onClick={()=>props.seeMore(true)}>See Related Data</Button>}
            </CardActions>
        </>
                
            }
        </Card>
        }
        </>

    )
}