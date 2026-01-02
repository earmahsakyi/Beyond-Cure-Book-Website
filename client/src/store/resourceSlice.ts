import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const API_URL = '/api/resources';

// TYPE DEFINITIONS


// Resource interface (matches MongoDB schema)
export interface Resource {
  _id: string;
  title: string;
  description: string;
  category: 'patients' | 'clinicians';
  fileUrl: string;
  fileType: string;
  fileSize?: number;
  fileKey?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Upload resource data
export interface UploadResourceData {
  title: string;
  description: string;
  category: 'patients' | 'clinicians';
  isPublished?: boolean;
  document: File; // The PDF file
}

// Update resource data (metadata only, not file)
export interface UpdateResourceData {
  id: string;
  title?: string;
  description?: string;
  category?: 'patients' | 'clinicians';
  isPublished?: boolean;
}

// Response for upload/update
interface ResourceResponse {
  success: boolean;
  message: string;
  data: Resource;
}

// Response for get all
interface GetAllResourcesResponse {
  success: boolean;
  count: number;
  data: Resource[];
}

// Query params for fetching resources
export interface GetResourcesParams {
  category?: 'patients' | 'clinicians';
  isPublished?: boolean;
}

// Error response type
interface ErrorResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

// Redux state type
interface ResourceState {
  resources: Resource[];
  publicResources: Resource[];
  currentResource: Resource | null;
  loading: boolean;
  uploadProgress: number;
  error: string | null;
  uploadSuccess: boolean;
}


// HELPER FUNCTIONS
const setAuthToken = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return (
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      'An error occurred'
    );
  }
  return 'An unexpected error occurred';
};

// INITIAL STATE
const initialState: ResourceState = {
  resources: [],
  publicResources: [],
  currentResource: null,
  loading: false,
  uploadProgress: 0,
  error: null,
  uploadSuccess: false,
};


// ASYNC THUNKS
// Upload new resource (Admin)
export const uploadResource = createAsyncThunk<
  Resource,
  UploadResourceData,
  { rejectValue: string }
>(
  'resource/upload',
  async (resourceData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', resourceData.title);
      formData.append('description', resourceData.description);
      formData.append('category', resourceData.category);
      if (resourceData.isPublished !== undefined) {
        formData.append('isPublished', String(resourceData.isPublished));
      }
      formData.append('document', resourceData.document);

      const res = await axios.post<ResourceResponse>(
        API_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Get all resources (Admin - includes unpublished)
export const getAllResources = createAsyncThunk<
  Resource[],
  GetResourcesParams | void,
  { rejectValue: string }
>(
  'resource/getAll',
  async (params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }

      // Build query string
      const queryParams = new URLSearchParams();
      if (params && params.category) {
        queryParams.append('category', params.category);
      }
      if (params && params.isPublished !== undefined) {
        queryParams.append('isPublished', params.isPublished.toString());
      }

      const url = queryParams.toString()
        ? `${API_URL}?${queryParams.toString()}`
        : API_URL;

      const res = await axios.get<GetAllResourcesResponse>(url);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Get public resources (Public - only published)
export const getPublicResources = createAsyncThunk<
  Resource[],
  GetResourcesParams | void,
  { rejectValue: string }
>(
  'resource/getPublic',
  async (params, { rejectWithValue }) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (params && params.category) {
        queryParams.append('category', params.category);
      }

      const url = queryParams.toString()
        ? `${API_URL}/public?${queryParams.toString()}`
        : `${API_URL}/public`;

      const res = await axios.get<GetAllResourcesResponse>(url);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Update resource metadata (Admin)
export const updateResource = createAsyncThunk<
  Resource,
  UpdateResourceData,
  { rejectValue: string }
>(
  'resource/update',
  async (updateData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }

      const { id, ...data } = updateData;

      const config = {
        headers: { 'Content-Type': 'application/json' }
      };

      const res = await axios.put<ResourceResponse>(
        `${API_URL}/${id}`,
        data,
        config
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Delete resource (Admin)
export const deleteResource = createAsyncThunk<
  string, // Returns the deleted resource ID
  string, // Takes resource ID
  { rejectValue: string }
>(
  'resource/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }

      await axios.delete(`${API_URL}/${id}`);
      return id; // Return the ID so we can remove it from state
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);


// SLICE
const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUploadSuccess: (state) => {
      state.uploadSuccess = false;
    },
    setCurrentResource: (state, action: PayloadAction<Resource | null>) => {
      state.currentResource = action.payload;
    },
    resetUploadProgress: (state) => {
      state.uploadProgress = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Resource
      .addCase(uploadResource.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadSuccess = false;
        state.uploadProgress = 0;
      })
      .addCase(uploadResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        state.loading = false;
        state.uploadSuccess = true;
        state.uploadProgress = 100;
        // Add to resources array
        state.resources.unshift(action.payload); // Add to beginning
        // If published, add to public resources too
        if (action.payload.isPublished) {
          state.publicResources.unshift(action.payload);
        }
      })
      .addCase(uploadResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to upload resource';
        state.uploadSuccess = false;
        state.uploadProgress = 0;
      })

      // Get All Resources
      .addCase(getAllResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllResources.fulfilled, (state, action: PayloadAction<Resource[]>) => {
        state.loading = false;
        state.resources = action.payload;
      })
      .addCase(getAllResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch resources';
      })

      // Get Public Resources
      .addCase(getPublicResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublicResources.fulfilled, (state, action: PayloadAction<Resource[]>) => {
        state.loading = false;
        state.publicResources = action.payload;
      })
      .addCase(getPublicResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch public resources';
      })

      // Update Resource
      .addCase(updateResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateResource.fulfilled, (state, action: PayloadAction<Resource>) => {
        state.loading = false;
        
        // Update in resources array
        const resourceIndex = state.resources.findIndex(r => r._id === action.payload._id);
        if (resourceIndex !== -1) {
          state.resources[resourceIndex] = action.payload;
        }

        // Update in public resources array
        const publicIndex = state.publicResources.findIndex(r => r._id === action.payload._id);
        if (action.payload.isPublished) {
          if (publicIndex !== -1) {
            state.publicResources[publicIndex] = action.payload;
          } else {
            state.publicResources.unshift(action.payload);
          }
        } else {
          // Remove from public if unpublished
          if (publicIndex !== -1) {
            state.publicResources.splice(publicIndex, 1);
          }
        }

        // Update current resource if it's the same
        if (state.currentResource?._id === action.payload._id) {
          state.currentResource = action.payload;
        }
      })
      .addCase(updateResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update resource';
      })

      // Delete Resource
      .addCase(deleteResource.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteResource.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        
        // Remove from resources array
        state.resources = state.resources.filter(r => r._id !== action.payload);
        
        // Remove from public resources array
        state.publicResources = state.publicResources.filter(r => r._id !== action.payload);
        
        // Clear current resource if it was deleted
        if (state.currentResource?._id === action.payload) {
          state.currentResource = null;
        }
      })
      .addCase(deleteResource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete resource';
      });
  },
});

export const { 
  clearError, 
  clearUploadSuccess, 
  setCurrentResource,
  resetUploadProgress 
} = resourceSlice.actions;

export default resourceSlice.reducer;