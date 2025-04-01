import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ articleModules }) {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    // Process the article modules to extract metadata
    const processedArticles = Object.entries(articleModules).map(([path, module]) => {
      const articleName = path.split("/").pop().replace(".jsx", "");
      return {
        path,
        articleName,
        metadata: module.metadata || {}
      };
    });
    
    console.log("Processed articles:", processedArticles);
    setArticlesData(processedArticles);
  }, [articleModules]);

  function path2Title(aPath) {
    const titleWithNoNumbers = aPath.replace(/^\d+-/, "");
    const finalTitle = titleWithNoNumbers.replace(/_/g, " ");
    return finalTitle;
  }

  return (
    <div>
      <h1>My Blog</h1>
      
      {articlesData.length === 0 ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articlesData.map(({ articleName, metadata }) => (
            <li key={articleName} className="article-item">
              <Link to={`/article/${articleName}`}>
                <h2>{metadata.title || path2Title(articleName)}</h2>
              </Link>
              {metadata.createdOn && (
                <p className="date">{new Date(metadata.createdOn).toLocaleDateString()}</p>
              )}
              {metadata.description && (
                <p className="description">{metadata.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;