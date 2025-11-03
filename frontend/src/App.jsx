import { Toaster, toast } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
