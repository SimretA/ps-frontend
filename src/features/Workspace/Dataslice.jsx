import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CSS_COLOR_NAMES } from '../../assets/color_assets';

const base_url = 'http://34.67.194.132:8081'
// const base_url = 'http://129.74.153.250:8080'



const settingsEnum = Object.freeze({
    0: "Do not Reorder",
    1: "Positives on top",
    2: "Negatives on top",
    3: "Unlabeled on top",
  });
const initialState = {
    workspace: "fairytale-bias-val-split",
    document: "storybook_sentence_val_split-assipattle_and_the_mester_stoorworm",
    dataset: [],
    userLabel:{},
    modelLabel:{},
    categories: [],
    rules: null,
    combinedRules: null,
    curCategory: null,
    scores: null,
    patterns:[],
    combinedPatterns: {},
    explanation:{},
    loadingCombinedPatterns: false,
    loadingPatterns:false,
    orderSetting:settingsEnum,
    selectedSetting:0,
    annotationPerRetrain:5,
    userAnnotationCount:0,
    modelAnnotationCount:0,
    totalDataset:0,
    selectedPatterns:{},
    themes:[],
    relatedExamples:[],
    selectedTheme:null,
    element_to_label:{},
    color_code:{}
}

const reorderDataset = (dataset, setting)=>{
    // console.log("in reordeing ", setting)

    switch(`${setting}`) {
        case '0': //Do not Reorder
            break;
        case '1':
            dataset.sort(function (a, b) {
                return -a.score + b.score;
              });

          break;
        case '2':
            dataset.sort(function (a, b) {
                return a.score - b.score;
              });
            break;
        case '3':
            // code block
            break;
        case '4':
            // code block
            break;
        default:
            console.log("I am in default")
            dataset.sort(function (a, b) {
                return a.score - b.score;
              });
          // code block
      }


    
      console.log("new dataset ",dataset)
    

}

export const changeSetting = createAsyncThunk('/workspace/changeSetting', async(request, { getState }) => {
    const { selectedSetting } = request
    let data = {
        "selectedSetting": selectedSetting
    }
    return data
})
export const clearAnnotation = createAsyncThunk('workspace/clear', async (request, { getState }) => {

    const state = getState()

    var url = new URL(`${base_url}/clear`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "POST"
    }).then( response => response.json())

    return data
})

export const explainPattern = createAsyncThunk('workspace/explainpattern', async (request, { getState }) => {

    const state = getState()
    const { pattern } = request

    var url = new URL(`${base_url}/explain/${pattern}`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})


export const fetchDataset = createAsyncThunk('workspace/dataset', async (request, { getState }) => {
    var url = new URL(`${base_url}/dataset`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})

export const fetchThemes = createAsyncThunk('workspace/themes', async (request, { getState }) => {
    var url = new URL(`${base_url}/themes`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})

export const fetchSelectedTheme = createAsyncThunk('workspace/selected_theme', async (request, { getState }) => {
    var url = new URL(`${base_url}/selected_theme`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})

export const labelData = createAsyncThunk('workspace/labelData', async (request, { getState }) => {
    
    const { element_id, label } = request

    
    var url = new URL(`${base_url}/label/${element_id}/${label}`)


    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    }).then( response => response.json())

    return data
})


export const multiLabelData = createAsyncThunk('workspace/multiLabelData', async (request, { getState }) => {
    
    const { elementId, label } = request
    var url = new URL(`${base_url}/label/${elementId}/${label}`)


    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    }).then( response => response.json())

    return data
})


export const deleteLabelData = createAsyncThunk('workspace/deleteLabelData', async (request, { getState }) => {
    
    const { elementId, label } = request
    var url = new URL(`${base_url}/delete_label/${elementId}/${label}`)


    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    }).then( response => response.json())

    return data
})



export const setTheme = createAsyncThunk('workspace/setTheme', async (request, { getState }) => {
    
    const { theme } = request

    
    var url = new URL(`${base_url}/set_theme/${theme}`)


    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    }).then( response => response.json())

    return data
})

export const labelPhrase = createAsyncThunk('workspace/phrase', async (request, { getState }) => {
    
    const { phrase, label } = request

    
    var url = new URL(`${base_url}/phrase/${phrase}/${label}`)


    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    }).then( response => response.json())

    return data
})

export const fetchRelatedExample = createAsyncThunk('workspace/related_examples', async (request, { getState }) => {
    const state = getState()

    const { id } = request

    var url = new URL(`${base_url}/related_examples/${id}`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})


export const fetchPatterns = createAsyncThunk('workspace/patterns', async (request, { getState }) => {
    const state = getState()

    var url = new URL(`${base_url}/patterns`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})
export const fetchCombinedPatterns = createAsyncThunk('workspace/combinedpatterns', async (request, { getState }) => {
    const state = getState()

    var url = new URL(`${base_url}/combinedpatterns`)

    const data = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"
    }).then( response => response.json())

    return data
})


const DataSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        updateCurCategory(state, action) {
            const c = action.payload
            console.log(`category: ${c}`)
            return {
                ...state,
                curCategory: c
            }
        },

        updateElementLabel(state, action){

            let userAnnotationCount = JSON.parse(JSON.stringify(state.userAnnotationCount))
            
            if(action.payload.event=="REMOVE"){
                let element_to_label = JSON.parse(JSON.stringify(state.element_to_label))

                if(element_to_label[action.payload.elementId]){
                    element_to_label[action.payload.elementId] = element_to_label[action.payload.elementId].filter(word => word!= action.payload.label);
                    return {
                        ...state,
                        element_to_label
                    }
                }

            }else if(action.payload.event=="ADD"){
                let element_to_label = JSON.parse(JSON.stringify(state.element_to_label))
                if(!element_to_label[action.payload.elementId] || element_to_label[action.payload.elementId].indexOf(action.payload.label)==-1){
                    userAnnotationCount += 1
                }




                if(element_to_label[action.payload.elementId]){
                        element_to_label[action.payload.elementId] = [...element_to_label[action.payload.elementId], action.payload.label]
                        console.log("userAnnotationCount", userAnnotationCount)
                    
                    

                }else{
                    element_to_label[action.payload.elementId] = [ action.payload.label]
                }               
                return{
                    ...state,
                    element_to_label,
                    userAnnotationCount
                }


            }

            

        }
    },
    extraReducers: {
        [fetchDataset.fulfilled]: (state, action) => {
            const data = action.payload

            // console.log("the dataset ", data)

            return {
                ...state,
                dataset: data,
                ready: true,
                totalDataset: data.length
            }
        },

        [explainPattern.pending]: (state, action) => {
            const data = action.payload

            // console.log("the dataset ", data)

            return {
                ...state,
                patternExp:null
            }
        },

        [explainPattern.fulfilled]: (state, action) => {
            const data = action.payload

            // console.log("the dataset ", data)

            return {
                ...state,
                patternExp: data
            }
        },

        [fetchThemes.fulfilled]: (state, action) => {
            const data = action.payload
            let color_code = {}
            data.forEach((element, index) => {
                color_code[`${element}`] = CSS_COLOR_NAMES[index]
                
            });

            return {
                ...state,
                themes: data,
                color_code
            }
        },


        [fetchSelectedTheme.fulfilled]: (state, action) => {
            const data = action.payload
            console.log("selected theme", data)

            return {
                ...state,
                selectedTheme: data,
            }
        },


        [setTheme.fulfilled]: (state, action) => {
            const data = action.payload
            console.log("selected theme", data)

            return {
                ...state,
                dataset: data[1],
                selectedTheme:data[0],
                explanation:{},
                combinedPatterns: {},
                patterns:[],
                userAnnotationCount:0,
                modelAnnotationCount:0,

            }
        },
        
        
        [multiLabelData.fulfilled]:(state, action)=>{
            const data = action.payload
            console.log(data)

            if(data.status != 200){
                console.log("Something went wrong")
                //TODO recover
            }

        },

        [deleteLabelData.fulfilled]:(state, action)=>{
            const data = action.payload
            console.log(data)

            if(data.status != 200){
                console.log("Something went wrong")
                //TODO recover
            }

        },



        [labelPhrase.fulfilled]:(state, action)=>{
            
            const data = action.payload
            console.log(data)
            
            return{
                ...state,
            }

        },

        [fetchPatterns.pending]:(state, action)=>{
            return{
                ...state,
                loadingCombinedPatterns:true,
                loadingPatterns: true
            }
        },

        [fetchPatterns.fulfilled]:(state, action)=>{
            const data = action.payload
            console.log("fetch patterns ", data)
            if(data.message){
                return{
                    ...state,
                    loadingPatterns: false,
                    modelAnnotationCount:0,
                }
            }

            return{
                ...state,
                patterns: data,
                loadingPatterns: false

            }
        },

        [fetchRelatedExample.fulfilled]:(state, action)=>{
            const data = action.payload
            console.log("related examples",data)

            return{
                ...state,
                relatedExamples:data[0],
                relatedExplanation:data[1],

            }
        },

        [fetchCombinedPatterns.pending]:(state, action)=>{
            

            return{
                ...state,
                loadingCombinedPatterns:true
            }
        },

        [fetchCombinedPatterns.fulfilled]:(state, action)=>{
            const data = action.payload
            console.log("combine patterns has this ", data)

            if(data.message){
                return{
                    ...state,
                    modelAnnotationCount:0,
                    loadingCombinedPatterns: false,
                }
            }

            console.log("combined patters are ", data)
            let modelAnnotationCount = 0
            
            let selectedSetting = JSON.parse(JSON.stringify(state.selectedSetting))

            let dataset = JSON.parse(JSON.stringify(state.dataset))

            dataset.forEach((element, index) => {
                if(data.scores[dataset[index].id] != 0.5){
                    modelAnnotationCount += 1
                }
                dataset[index] = { ...dataset[index], score:data.scores[dataset[index].id]}
            });
            // reorderDataset(dataset, selectedSetting)
            

            let selectedPatterns = {}
            data.patterns.forEach((element)=>{
                selectedPatterns[element['pattern']] = element['weight']
            })
            console.log(data)

            //place explanation in elements
            // for (let [key, value] of Object.entries(p)) {
            //     console.log(`${key}: ${value}`);
            //   }

            return{
                ...state,
                combinedPatterns: data,
                loadingCombinedPatterns: false,
                explanation:data.explanation,
                dataset: dataset,
                modelAnnotationCount: modelAnnotationCount,
                selectedPatterns:selectedPatterns,

            }
        },

        [changeSetting.fulfilled]:(state,action)=>{

            let dataset = JSON.parse(JSON.stringify(state.dataset))
            const combinedPatterns = JSON.parse(JSON.stringify(state.combinedPatterns))
            if(Object.keys(combinedPatterns).length>0){
                // reorderDataset(dataset, action.payload.selectedSetting)
            }
            return {
                ...state,
                selectedSetting: action.payload.selectedSetting,
                dataset: dataset

            }
        }
    }
})

export default DataSlice.reducer;
export const {updateElementLabel} = DataSlice.actions;