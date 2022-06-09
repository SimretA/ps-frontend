import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const base_url = 'http://35.232.59.136:8080'

const initialState = {
    workspace: "fairytale-bias-val-split",
    document: "storybook_sentence_val_split-assipattle_and_the_mester_stoorworm",
    dataset: [],
    categories: [],
    rules: null,
    combinedRules: null,
    curCategory: null,
    scores: null,
    theme: 'price',
    patterns:[],
    combinedPatterns: [],
    explanation:{},
    loadingCombinedPatterns: false,
    loadingPatterns:false
}

const reorderDataset = (dataset)=>{

    dataset.sort(function (a, b) {
        return a.score - b.score;
      });
      console.log("new dataset ",dataset)
    

}
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
        }
    },
    extraReducers: {
        [fetchDataset.fulfilled]: (state, action) => {
            const data = action.payload

            return {
                ...state,
                dataset: data,
                ready: true
            }
        },
        
        [labelData.fulfilled]:(state, action)=>{
            let dataset = JSON.parse(JSON.stringify(state.dataset))
            console.log(dataset)
            const data = action.payload
            const index = dataset.findIndex((element)=>element.id==data.id)

            if(index!=-1){
                dataset[index] = {...dataset[index], user_label:data.label}

            }

            
            return{
                ...state,
                dataset:dataset
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
            // console.log(data)

            return{
                ...state,
                patterns: data,
                loadingPatterns: false

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
            

            let dataset = JSON.parse(JSON.stringify(state.dataset))

            dataset.forEach((element, index) => {
                dataset[index] = { ...dataset[index], score:data.scores[dataset[index].id]}
            });
            reorderDataset(dataset)
            console.log(data)

            return{
                ...state,
                combinedPatterns: data,
                loadingCombinedPatterns: false,
                explanation:data.explanation,
                dataset: dataset,

            }
        }
    }
})

export default DataSlice.reducer;