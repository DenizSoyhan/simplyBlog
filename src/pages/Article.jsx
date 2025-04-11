import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

function ArticlePage({ articles }) {
  const { articleName } = useParams();
  const articlePath = `./pages/articles/${articleName}.jsx`;
  const articleModule = articles[articlePath];

  if (!articleModule) {
    return <h1>Article Not Found</h1>;
  }

  const ArticleComponent = articleModule.default;

  return (
    <div>
      {articleModule.metadata && (
        <div className="article-metadata">
          {articleModule.metadata.createdOn && (
            <p className="date">
              {new Date(articleModule.metadata.createdOn).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
      
      <ArticleComponent />
    </div>
  );
}

export default ArticlePage;