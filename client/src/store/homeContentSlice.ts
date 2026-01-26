import { createSlice,createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


//type definition

// Hero section type
interface Hero {
  badgeText: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  availabilityText: string;
  bookCoverImage: string;
}

// About Book section type
interface AboutBook {
  badgeText: string;
  heading: string;
  paragraphs: string[];
}

// About Author section type
interface AboutAuthor {
  name: string;
  shortBio: string;
  longBio: string;
  authorImage: string;
  readMoreLink: string;
  photoUrl? : string;
  photoKey?: string
}

// Audience item type
interface Audience {
  title: string;
  description: string;
  icon: string;
}

// Chapter item type
interface Chapter {
  number: string;
  title: string;
  description: string;
}

// Endorsement item type
interface Endorsement {
  quote: string;
  author: string;
  title: string;
  featured: boolean;
}

// Email Capture section type
interface EmailCapture {
  title: string;
  description: string;
  privacyNote: string;
}

// Final CTA section type
interface FinalCta {
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  footerNote: string;
}

// Main HomeContent document type (matches your MongoDB schema)
export interface HomeContent {
  _id?: string;
  hero: Hero;
  aboutBook: AboutBook;
  aboutAuthor: AboutAuthor;
  audiences: Audience[];
  chapters: Chapter[];
  endorsements: Endorsement[];
  emailCapture: EmailCapture;
  finalCta: FinalCta;
  updatedAt?: string;
}


//helper function 
const setAuthToken = (): void => {
    axios.defaults.withCredentials = true;
} 

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

// Redux state type
interface HomeContentState {
  homeContent: HomeContent | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeContentState = {
  homeContent: null,
  loading: false,
  error: null,
};

//async thunks goes here
export const getHomeContent = createAsyncThunk<HomeContent,void,{rejectValue:string}>(
    'homeContent/get',
    async(_, {rejectWithValue }) => {
        try {
           
                setAuthToken()
            
           
            const res = await axios.get<HomeContent>('/api/home-content')
            return res.data
        }catch(err){
            return rejectWithValue(getErrorMessage(err))
        }
    }
)

export const updateHomeContent = createAsyncThunk<HomeContent,Partial<HomeContent>,{rejectValue: string}>(
    'HomeContent/update',
    async(contentData,{rejectWithValue})=> {
        try{
           
              setAuthToken()
            
             const config = {
              headers: { 'Content-Type': 'application/json' }
             }
            const res = await axios.put('/api/home-content',contentData,config)
            return res.data;
        }catch(err){
            return rejectWithValue(getErrorMessage(err));
        }
    }
)

// New thunk for updating with photo upload
export const updateHomeContentWithPhoto = createAsyncThunk<
  HomeContent,
  { contentData: Partial<HomeContent>; photoFile?: File },
  { rejectValue: string }
>(
  'HomeContent/updateWithPhoto',
  async ({ contentData, photoFile }, { rejectWithValue }) => {
    try {
    
        setAuthToken();
  

      const formData = new FormData();
      
      // Add photo file if provided
      if (photoFile) {
        formData.append('authorPhoto', photoFile);
      }

      // Add entire content as single JSON blob
      formData.append('content', JSON.stringify(contentData));

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      const res = await axios.put('/api/home-content', formData, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);


const homeContentSlice = createSlice({
  name: "homeContent",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

    //getHomeContent
    .addCase(getHomeContent.pending, (state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(getHomeContent.fulfilled, (state, action: PayloadAction<HomeContent>)=> {
      state.loading = false;
      state.homeContent = action.payload
    })
    .addCase(getHomeContent.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch content';
    })


    //update homeContent
    .addCase(updateHomeContent.pending, (state)=> {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateHomeContent.fulfilled, (state, action: PayloadAction<HomeContent>)=> {
      state.loading = false;
      state.homeContent = action.payload
    })
    .addCase(updateHomeContent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update content';
    })

    // update homeContent with photo
    .addCase(updateHomeContentWithPhoto.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateHomeContentWithPhoto.fulfilled, (state, action: PayloadAction<HomeContent>) => {
      state.loading = false;
      state.homeContent = action.payload;
    })
    .addCase(updateHomeContentWithPhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update content with photo';
    });
  }

})

export const {clearError } = homeContentSlice.actions;
export default homeContentSlice.reducer;