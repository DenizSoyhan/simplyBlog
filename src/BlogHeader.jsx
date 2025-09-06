import BlogConfig from "./BlogConfig";
import { Link } from "react-router-dom";

function BlogHeader(){


    return(

        <div className="blogHeaderContainer">
            <Link to="//" >
                <h1 id="blogName">{BlogConfig.blogName}</h1>
            </Link>

            <Link to="//" >
            <h3 id="slogan">{BlogConfig.slogan}</h3>
            </Link>
        </div>



    );
    

}
export default BlogHeader;