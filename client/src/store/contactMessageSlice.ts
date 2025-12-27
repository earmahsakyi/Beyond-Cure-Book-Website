import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const API_URL = '/api/contact';

// TYPE DEFINITIONS


// Contact Message interface 
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Submit contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Response for submitting contact
interface SubmitContactResponse {
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

// Pagination info
interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Response for getting all messages
interface GetMessagesResponse {
  messages: ContactMessage[];
  pagination: Pagination;
  unreadCount: number;
}

// Query params for fetching messages
interface GetMessagesParams {
  isRead?: boolean;
  limit?: number;
  page?: number;
}

// Mark as read params
interface MarkAsReadParams {
  id: string;
  isRead?: boolean;
}

// Error response type
interface ErrorResponse {
  message?: string;
}

// Redux state type
interface ContactMessageState {
  messages: ContactMessage[];
  currentMessage: ContactMessage | null;
  pagination: Pagination | null;
  unreadCount: number;
  loading: boolean;
  error: string | null;
  submitSuccess: boolean;
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
      'An error occurred'
    );
  }
  return 'An unexpected error occurred';
};


// INITIAL STATE


const initialState: ContactMessageState = {
  messages: [],
  currentMessage: null,
  pagination: null,
  unreadCount: 0,
  loading: false,
  error: null,
  submitSuccess: false,
};


// ASYNC THUNKS


// Submit contact message (Public)
export const submitContactMessage = createAsyncThunk<
  SubmitContactResponse,
  ContactFormData,
  { rejectValue: string }
>(
  'contactMessage/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };
      
      const res = await axios.post<SubmitContactResponse>(
        API_URL,
        formData,
        config
      );
      
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Get all contact messages (Admin)
export const getAllContactMessages = createAsyncThunk<
  GetMessagesResponse,
  GetMessagesParams | void,
  { rejectValue: string }
>(
  'contactMessage/getAll',
  async (params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }

     const queryParams = new URLSearchParams();
      
      if (params && params.isRead !== undefined) {
        queryParams.append('isRead', params.isRead.toString());
      }
      if (params && params.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      if (params && params.page) {
        queryParams.append('page', params.page.toString());
      }
      

      const url = queryParams.toString() 
        ? `${API_URL}?${queryParams.toString()}`
        : API_URL;

      const res = await axios.get<GetMessagesResponse>(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Mark message as read/unread (Admin)
export const markAsRead = createAsyncThunk<
  ContactMessage,
  MarkAsReadParams,
  { rejectValue: string }
>(
  'contactMessage/markAsRead',
  async ({ id, isRead = true }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
      }

      const config = {
        headers: { 'Content-Type': 'application/json' }
      };

      const res = await axios.patch<{ message: string; data: ContactMessage }>(
        `${API_URL}/${id}/read`,
        { isRead },
        config
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// Delete contact message (Admin)
export const deleteContactMessage = createAsyncThunk<
  string, // Returns the deleted message ID
  string, // Takes message ID
  { rejectValue: string }
>(
  'contactMessage/delete',
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


const contactMessageSlice = createSlice({
  name: 'contactMessage',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
    setCurrentMessage: (state, action: PayloadAction<ContactMessage | null>) => {
      state.currentMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Contact Message
      .addCase(submitContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(submitContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit message';
        state.submitSuccess = false;
      })

      // Get All Contact Messages
      .addCase(getAllContactMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContactMessages.fulfilled, (state, action: PayloadAction<GetMessagesResponse>) => {
        state.loading = false;
        state.messages = action.payload.messages;
        state.pagination = action.payload.pagination;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(getAllContactMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch messages';
      })

      // Mark As Read
      .addCase(markAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsRead.fulfilled, (state, action: PayloadAction<ContactMessage>) => {
        state.loading = false;
        // Update the message in the array
        const index = state.messages.findIndex(msg => msg._id === action.payload._id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
        // Update current message if it's the same
        if (state.currentMessage?._id === action.payload._id) {
          state.currentMessage = action.payload;
        }
        // Update unread count
        if (action.payload.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        } else {
          state.unreadCount += 1;
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update message';
      })

      // Delete Contact Message
      .addCase(deleteContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContactMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        // Remove message from array
        const deletedMessage = state.messages.find(msg => msg._id === action.payload);
        state.messages = state.messages.filter(msg => msg._id !== action.payload);
        
        // Update unread count if deleted message was unread
        if (deletedMessage && !deletedMessage.isRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        
        // Clear current message if it was deleted
        if (state.currentMessage?._id === action.payload) {
          state.currentMessage = null;
        }
        
        // Update pagination total
        if (state.pagination) {
          state.pagination.total = Math.max(0, state.pagination.total - 1);
        }
      })
      .addCase(deleteContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete message';
      });
  },
});

export const { clearError, clearSubmitSuccess, setCurrentMessage } = contactMessageSlice.actions;
export default contactMessageSlice.reducer;