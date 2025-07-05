import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NavigationBar from "./components/static/NavigationBar";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/static/ProtectedRoute';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <RecipePage />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
