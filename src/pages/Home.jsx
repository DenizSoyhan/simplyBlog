import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ articleModules }) {
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    // Process the article modules to extract metadata
    const processedArticles = Object.entries(articleModules).map(([path, module]) => {
      const articleName = path.split("/").pop().replace(".jsx", "");
      
      // regex to extract the number prefix from the article name
      const numberMatch = articleName.match(/^(\d+)-/);
      const articleNumber = numberMatch ? parseInt(numberMatch[1], 10) : 0;
      
      return {
        path,
        articleName,
        articleNumber,
        metadata: module.metadata || {}
      };
    });
    
    // sorting articles by number in descending order (highest first)
    const sortedArticles = processedArticles.sort((a, b) => b.articleNumber - a.articleNumber);
    
    setArticlesData(sortedArticles);
  }, [articleModules]);

  function path2Title(aPath) {
    const titleWithNoNumbers = aPath.replace(/^\d+-/, "");
    const finalTitle = titleWithNoNumbers.replace(/_/g, " ");
    return finalTitle;
  }

  return (
    <div className="mainPage">
      {articlesData.length === 0 ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articlesData.map(({ articleName, metadata }) => (
            <Link
              to={`/article/${articleName}`}
              key={articleName}
              className="article-link"
            >
              <div className="articleShowCaseContainer">
                <li className="article-item">
                  <div className="titleDateContainer">
                    <h2>{metadata.title || path2Title(articleName)}</h2>

                  </div>
                  <div className="descDateContainer">
                    {metadata.description && (
                      <p className="description">{metadata.description}</p>
                    )}
                    {metadata.createdOn && (
                      <p className="date">{new Date(metadata.createdOn).toLocaleDateString("en-GB")}</p>
                    )}
                  </div>
                 
                </li>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;