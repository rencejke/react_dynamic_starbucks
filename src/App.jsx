import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UIHome from "./components/pages/developers/ui/Home/UIHome";
import UIMenu from "./components/pages/developers/ui/Menu/UIMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./store/StoreContext";
import ProtectedRoute from "./components/pages/developers/access/ProtectedRoute";
import Login from "./components/pages/developers/access/Login";
import PageNotFound from "./components/partials/PageNotFound";
import Category from "./components/pages/developers/dashboard/category/Category";
import Menu from "./components/pages/developers/dashboard/menu/Menu";

function App() {

  const queryClient = new QueryClient
  return (
  
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
    <Router>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><UIHome /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><UIHome /></ProtectedRoute>} />
          <Route path="/menu" element={<ProtectedRoute><UIMenu /></ProtectedRoute>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>}/>
          <Route path="/dashboard/category" element={<ProtectedRoute><Category /></ProtectedRoute>}/>
          <Route path="/*" element={<ProtectedRoute><PageNotFound /></ProtectedRoute>} />
        </Routes>
      </Router>
      </StoreProvider>
    </QueryClientProvider>

  );
}
export default App;
