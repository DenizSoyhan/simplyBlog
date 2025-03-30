import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticlePage from "./pages/Article";
import BlogHeader from "./BlogHeader";
import ArticleGenerator from "./ArticleGenerator";

import './index.css'; 

//existing article names
const articles = import.meta.glob("./pages/articles/*.jsx");


function App() {
  return (
    <>
       <BlogHeader></BlogHeader>

    <Router>
      <Routes>
        <Route path="/" element={<Home articles={Object.keys(articles)} />} />

        {/* Dynamic article route */}
        <Route path="/article/:articleName" element={<ArticlePage articles={articles} />} />

        {/* Article Generator */}
        <Route path="/generate-article" element={<ArticleGenerator />} /> 
      </Routes>
    </Router>
    </>
 
  );
}

export default App;
