import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticlePage from "./pages/Article";
import BlogHeader from "./BlogHeader";
import ArticleGenerator from "./ArticleGenerator";
import './index.css';
import Customize from "./Customize";
import BlogFooter from "./BlogFooter";

// import articles with eager loading to get the module content (every article comes as a module)
const articleModules = import.meta.glob("./pages/articles/*.jsx", { eager: true });

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV; // Vite provides this variable

function App() {
  return (
    <div className="app">
      <BlogHeader />
      <Router basename="/simplyBlog">
        <Routes>
          <Route path="/" element={<Home articleModules={articleModules} />} />
          {/* Dynamic article route */}
          <Route path="/article/:articleName" element={<ArticlePage articles={articleModules} />} />

          {/* Only show these routes in development mode */}
          {isDevelopment && (
            <>
              <Route path="/generate-article" element={<ArticleGenerator />} />
              <Route path="/customize" element={<Customize />} />
            </>
          )}
        </Routes>
      </Router>
      <BlogFooter />
    </div>
  );
}

export default App;
