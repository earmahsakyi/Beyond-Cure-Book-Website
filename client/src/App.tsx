import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import React, { useEffect } from 'react'
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Provider } from 'react-redux';
import { loadUser } from "./store/authSlice";
import store, { useAppDispatch } from './store/store';
import NotFound from "./pages/NotFound";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import RequestOTP from "./components/auth/RequestOTP";
import UnlockAccount from "./components/auth/UnlockAccount";
import Dashboard from "./components/admin/Index";
import HomeContentEditor from "./components/admin/HomeContentEditor";
import AboutEditor from "./components/admin/AboutEditor";
import ResourcesManager from "./components/admin/ResourcesManager";
import MediaSpeakingEditor from "./components/admin/MediaSpeakingEditor";
import ContactMessages from "./components/admin/ContactMessages";
import EmailSubscribers from "./components/admin/EmailSubscribers";
import PrivateRoute from "./components/routing/PrivateRoute";
import ContactForm from "./components/sections/ContactForm";
import MediaSpeaking from "./components/sections/MediaSpeaking";
import Resources from "./components/sections/Resources";

const queryClient = new QueryClient();


const AppInner = () => {
  const dispatch = useAppDispatch()

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(token){
      dispatch(loadUser())
    }
  },[dispatch])

  return (
      <BrowserRouter
       future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactForm/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/media" element={<MediaSpeaking />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-request" element={<RequestOTP />} />
          <Route path="/resources-public" element={<Resources />} />
          <Route path="/account-unlock" element={<UnlockAccount />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/> </PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><AboutEditor/> </PrivateRoute>} />
          <Route path="/resources" element={<PrivateRoute><ResourcesManager/> </PrivateRoute>} />
          <Route path="/media" element={<PrivateRoute><MediaSpeakingEditor/> </PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><ContactMessages/> </PrivateRoute>} />
          <Route path="/emails" element={<PrivateRoute><EmailSubscribers/> </PrivateRoute>} />
          <Route path="/home-content" element={<PrivateRoute><HomeContentEditor/> </PrivateRoute>} />

          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  )
}

const App = () => (
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner/>
      <AppInner/>
    </TooltipProvider>
  </QueryClientProvider>
  </Provider>
);

export default App;
