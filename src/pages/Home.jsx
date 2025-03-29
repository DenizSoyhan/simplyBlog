import { Link } from "react-router-dom";

function Home({ articles }) {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {articles.map((path) => {
          const articleName = path.split("/").pop().replace(".jsx", "");
          return (
            <li key={articleName}>
              <Link to={`/article/${articleName}`}>{articleName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
