import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1a1a2e 100%)",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(37,99,235,0.15)",
          background: "#0F172A",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;