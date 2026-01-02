import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import  homeContentReducer  from './homeContentSlice';
import emailReducer from './emailSubscribeSlice';
import contactMessageReducer from './contactMessageSlice';
import resourceReducer from './resourceSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Configure the store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    homeContent: homeContentReducer,
    email:emailReducer,
    contactMessage: contactMessageReducer,
    resource:resourceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store
export type AppDispatch = typeof store.dispatch;


// Export typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;