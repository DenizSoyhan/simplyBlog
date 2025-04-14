import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";

function Home({ articleModules }) {
  const [articlesData, setArticlesData] = useState([]);
  
  useEffect(() => {
    // Process the article modules to extract metadata
    const processedArticles = Object.entries(articleModules).map(([path, module]) => {
      const articleName = path.split("/").pop().replace(".jsx", "");
      
      // Check if the article has a "P-" prefix (pinned)
      const isPinned = articleName.startsWith("P-");
      
      // Check if the article has a "U-" prefix (unlisted)
      const isUnlisted = articleName.startsWith("U-");
      
      // regex to extract the number prefix from the article name
      const numberMatch = articleName.match(/^(\d+)-/);
      const articleNumber = numberMatch ? parseInt(numberMatch[1], 10) : 0;
      
      return {
        path,
        articleName,
        articleNumber,
        isPinned,
        isUnlisted,
        metadata: module.metadata || {}
      };
    });
    
    // Filter out unlisted articles
    const visibleArticles = processedArticles.filter(article => !article.isUnlisted);
    
    // Sorting logic:
    // 1. Pinned articles (with "P-" prefix) come first
    // 2. Then sort remaining articles by number in descending order
    const sortedArticles = visibleArticles.sort((a, b) => {
      // If both are pinned or both are not pinned, sort by number
      if (a.isPinned === b.isPinned) {
        return b.articleNumber - a.articleNumber;
      }
      // Otherwise, pinned articles come first
      return a.isPinned ? -1 : 1;
    });
    
    setArticlesData(sortedArticles);
  }, [articleModules]);
  
  function path2Title(aPath) {
    // Remove number prefix and "P-" prefix if present
    const titleWithNoPrefix = aPath.replace(/^(?:P-|U-|\d+-)/,"");
    const finalTitle = titleWithNoPrefix.replace(/_/g, " ");
    return finalTitle;
  }
  
  return (
    <div className="mainPage">
      {articlesData.length === 0 ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articlesData.map(({ articleName, metadata, isPinned }) => (
            <Link
              to={`/article/${articleName}`}
              key={articleName}
              className="article-link"
            >
              <div className="articleShowCaseContainer">
                {isPinned && (
                  <div className="pinnedInfoContainer">
                    <p>Pinned</p>

                    <FontAwesomeIcon
                      icon={faThumbTack}
                      className="pin-icon"
                    />
                </div>

                )}
                <li className="article-item">
                  <div className="titleDateContainer">
                    <h2>
                      {metadata.title || path2Title(articleName)}
                    </h2>
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