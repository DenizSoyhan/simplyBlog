import BlogConfig from "./BlogConfig";

function BlogHeader(){

    return(
        <div className="blogHeaderContainer">
            <h1 id="blogName">{BlogConfig.blogName}</h1>
            <h3 id="slogan">{BlogConfig.slogan}</h3>
        </div>
    );
    

}
export default BlogHeader;