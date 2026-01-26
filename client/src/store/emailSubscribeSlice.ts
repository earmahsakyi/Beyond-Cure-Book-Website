import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';


//types definitions
interface Emailresponse  {
    _id: string;
    email:string;
    source:string;
    createdAt: string;
};

interface SubscribeEmail {
    message: string;
};

//helper function 
const setAuthToken = (): void => {
     axios.defaults.withCredentials = true;
};

//helper to extract error messages
const getErrorMessage = (error :unknown): string => {
    if (axios.isAxiosError(error)){
        const axiosError = error 
        return (
            axiosError.response?.data?.msg ||
            axiosError.response?.data?.error ||
            axiosError.response?.data?.Error ||
            axiosError.response.data?.message ||
            axiosError.response?.data?.errors?.[0]?.msg ||
            'An error occurred'
        )
    }
    return 'An unexpected error occurred';
};

interface EmailState {
    loading: boolean;
    emails: Emailresponse[] | null;
    error : string| null;
    message: string | null;

};

interface subscribeData {
    email:string
}


const initialState:EmailState = {
    loading:false,
    emails: null,
    error: null,
    message: null,
}



//async thunks

export const getEmails = createAsyncThunk<Emailresponse[],void, {rejectValue:string}>(
    'emailSubscribe/get',
    async(_, {rejectWithValue })=> {
        try{
            
            
                setAuthToken();
                const res = await axios.get('/api/email-subscribers');
                return res.data
        
        }catch(err){
            return rejectWithValue(getErrorMessage(err));
        }
    }

);

export const subscribeEmail = createAsyncThunk<SubscribeEmail,subscribeData,{rejectValue:string}>(
    'emailSubscribe/post',
    async(email, {rejectWithValue })=> {
        try{
            const config = {
                headers : {'Content-Type' : 'application/json'}
            };
            const res = await axios.post('/api/email-subscribers',email,config);
            return res.data;
            }catch(err){
                return rejectWithValue(getErrorMessage(err))
        }
});


const emailSubscribeSlice = createSlice({
    name: 'emailSubscribe',
    initialState,
    reducers: {
        clearError: (state)=>{
            state.error = null;
        }
    },
    extraReducers : (builder)=> {
        builder
        //get emails
        .addCase(getEmails.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getEmails.fulfilled, (state,action:PayloadAction<Emailresponse[]> )=> {
            state.loading = false;
            state.emails = action.payload
        })
        .addCase(getEmails.rejected, (state,action)=> {
            state.loading = false;
            state.error = action.payload || 'Failed to load emails!'
        })

        //subscribe emails
        .addCase(subscribeEmail.pending,state => {
            state.loading = true;
            state.error = null;
        })
        .addCase(subscribeEmail.fulfilled, (state, action: PayloadAction<SubscribeEmail>)=> {
            state.loading =false;
            state.message = action.payload.message;

        })
        .addCase(subscribeEmail.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || "Failed to add you to the checklist"
        })
    }
});

export const {clearError} = emailSubscribeSlice.actions;
export default emailSubscribeSlice.reducer; 

