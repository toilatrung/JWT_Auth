import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import SignUpPage from "./pages/SignUpPage";
import ChatAppPage from "./pages/ChatAppPage";
import LogInPage from "./pages/LogInPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./stores/useAuthStore";

function App() {
  const { initializeApp, isInitialized } = useAuthStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (!isInitialized) {
    return <div>Loading...</div>; // Hoặc một component Spinner đẹp hơn
  }
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          {" "}
          {/* Thêm component Routes ở đây */}
          {/*Public Routes will be added here in the future*/}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          {/*Private Routes will be added here in the future*/}
          {/*Logic for Private Routes*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
