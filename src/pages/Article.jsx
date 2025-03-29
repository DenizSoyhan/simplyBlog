import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

function ArticlePage({ articles }) {
  const { articleName } = useParams();
  const ArticleComponent = articles[`./pages/articles/${articleName}.jsx`];

  if (!ArticleComponent) {
    return <h1>Article Not Found</h1>;
  }

  const LazyArticle = lazy(ArticleComponent);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <LazyArticle />
    </Suspense>
  );
}

export default ArticlePage;
