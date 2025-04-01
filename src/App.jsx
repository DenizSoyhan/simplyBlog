import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticlePage from "./pages/Article";
import BlogHeader from "./BlogHeader";
import ArticleGenerator from "./ArticleGenerator";

import './index.css'; 

// import articles with eager loading to get the module content (every article comes as a module)
const articleModules = import.meta.glob("./pages/articles/*.jsx", { eager: true });

function App() {
  console.log("Article modules:", articleModules);
  
  return (
    <>
      <BlogHeader></BlogHeader>

      <Router>
        <Routes>
          <Route path="/" element={<Home articleModules={articleModules} />} />

          {/* Dynamic article route */}
          <Route path="/article/:articleName" element={<ArticlePage articles={articleModules} />} />

          {/* Article Generator */}
          <Route path="/generate-article" element={<ArticleGenerator />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;