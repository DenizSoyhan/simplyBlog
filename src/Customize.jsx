import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Deniz_İçin_makale from "../defaultAssets/defaultArticles/22-Deniz_İçin_makale";
import BlogHeader from "./BlogHeader";
import BlogConfig from "./BlogConfig";

const articleModules = import.meta.glob("../defaultAssets/defaultArticles/*.jsx", { eager: true });

function Customize() {

  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");

  // Setting default values for hooks
  const [bgMainColor, setBgMainColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [titlePrimaryColor, setTitlePrimaryColor] = useState("#000000");
  const [titleSecondaryColor, setTitleSecondaryColor] = useState("#000000");
  const [blogHeaderBgColor, setBlogHeaderBgColor] = useState("#ffffff");
  const [articleTitleColor, setArticleTitleColor] = useState("#000000");
  const [articleSCBgColor, setArticleSCBgColor] = useState("#ffffff");
  const [articleSCHover, setArticleSCHover] = useState("#cccccc");
  const [articleInTitle, setArticleInTitle] = useState("#000000");
  
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    

    // Helper function to convert any CSS color format to hex
    // This is here only for me and 2 other people that uses hsl values while styling
    const convertToHex = (colorValue) => {
      // If it's already a hex value, return it
      if (colorValue.startsWith("#")) return colorValue;
      
      // Create a temporary element to compute the RGB value
      const tempEl = document.createElement("div");
      tempEl.style.color = colorValue;
      document.body.appendChild(tempEl);
      
      // Get computed value and convert to hex
      const computedColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);
      
      // Parse RGB values
      const rgbMatch = computedColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch;
        console.log(rgbMatch)
        return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
      }
      
      return colorValue;
    };

    const rootStyles = getComputedStyle(document.documentElement);
    
    setBgMainColor(convertToHex(rootStyles.getPropertyValue("--main-bg-color").trim() || "#ffffff"));
    setTextColor(convertToHex(rootStyles.getPropertyValue("--text-color").trim() || "#000000"));
    setTitlePrimaryColor(convertToHex(rootStyles.getPropertyValue("--title-primary-color").trim() || "#000000"));
    setTitleSecondaryColor(convertToHex(rootStyles.getPropertyValue("--title-secondary-color").trim() || "#000000"));
    setBlogHeaderBgColor(convertToHex(rootStyles.getPropertyValue("--blog-header-bg").trim() || "#ffffff"));
    setArticleTitleColor(convertToHex(rootStyles.getPropertyValue("--article-title-color").trim() || "#000000"));
    setArticleSCBgColor(convertToHex(rootStyles.getPropertyValue("--articleShowCaseContainer-bg-color").trim() || "#ffffff"));
    setArticleSCHover(convertToHex(rootStyles.getPropertyValue("--articleShowCaseContainer-hover-color").trim() || "#cccccc"));
    setArticleInTitle(convertToHex(rootStyles.getPropertyValue("--article-in-title-color").trim() || "#000000"));
  
    const blogNameEl = document.getElementById("blogName");
    const blogSloganEl = document.getElementById("slogan");

    if (blogNameEl) {
      const contentName = blogNameEl.textContent;
      const contentSlogan = blogSloganEl.textContent;
      setName(contentName);
      setSlogan(contentSlogan);    }
  }, []);


  function handleBlogNameChange(e){
    const newName = e.target.value;
    setName(newName);
    document.getElementById("blogName").textContent=newName;
  }

  function handleSloganChange(e){
    const newName = e.target.value;
    setSlogan(newName);
    document.getElementById("slogan").textContent=newName;
  }
  
  function handleBgMainColor(e) {
    const newColor = e.target.value;
    setBgMainColor(newColor);
    document.documentElement.style.setProperty("--main-bg-color", newColor);
  }
  
  function handleTextColor(e) {
    const newColor = e.target.value;
    setTextColor(newColor);
    document.documentElement.style.setProperty("--text-color", newColor);
  }
  
  function handleTitlePrimaryColor(e) {
    const newColor = e.target.value;
    setTitlePrimaryColor(newColor);
    document.documentElement.style.setProperty("--title-primary-color", newColor);
  }
  
  function handleTitleSecondaryColor(e) {
    const newColor = e.target.value;
    setTitleSecondaryColor(newColor);
    document.documentElement.style.setProperty("--title-secondary-color", newColor);
  }
  
  function handleBlogHeaderBgColor(e) {
    const newColor = e.target.value;
    setBlogHeaderBgColor(newColor);
    document.documentElement.style.setProperty("--blog-header-bg", newColor);
  }
  
  function handleArticleTitleColor(e) {
    const newColor = e.target.value;
    setArticleTitleColor(newColor);
    document.documentElement.style.setProperty("--article-title-color", newColor);
  }
  
  function handleArticleSCBgColor(e) {
    const newColor = e.target.value;
    setArticleSCBgColor(newColor);
    document.documentElement.style.setProperty("--articleShowCaseContainer-bg-color", newColor);
  }
  
  function handleArticleSCHover(e) {
    const newColor = e.target.value;
    setArticleSCHover(newColor);
    document.documentElement.style.setProperty("--articleShowCaseContainer-hover-color", newColor);
  }
  
  function handleArticleInTitle(e) {
    const newColor = e.target.value;
    setArticleInTitle(newColor);
    document.documentElement.style.setProperty("--article-in-title-color", newColor);
  }

  const generateBlogConfig = () =>{
    return `export const BlogConfig = {
    blogName: "${name}",
    slogan: "${slogan}"
  };
  
  export default BlogConfig;`

  };


  const downloadConfig = () => {
    const configContent = generateBlogConfig();
    const blob = new Blob([configContent], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "BlogConfig.jsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveConfigToServer = async () => {
    try {
      setSaveStatus("Saving config...");
      const configContent = generateBlogConfig();
      
      // Changed the endpoint to /api/save-blog-config instead of /api/save-theme
      const response = await fetch('http://localhost:3001/api/save-blog-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ configContent }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSaveStatus("Blog configuration saved successfully!");
        // Clear the success message after 3 seconds
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving blog config:', error);
      setSaveStatus(`Error: ${error.message}`);
    }
  };

  const generateCSS = () => {
    return `:root {
    --main-bg-color: ${bgMainColor};
    --text-color: ${textColor};
    --title-primary-color: ${titlePrimaryColor};
    --title-secondary-color: ${titleSecondaryColor};
    --blog-header-bg: ${blogHeaderBgColor};
    --article-title-color: ${articleTitleColor};
    --articleShowCaseContainer-bg-color: ${articleSCBgColor};
    --articleShowCaseContainer-hover-color: ${articleSCHover};
    --article-in-title-color: ${articleInTitle};
  }`;
  };

  const downloadCSS = () => {
    const cssContent = generateCSS();
    const blob = new Blob([cssContent], { type: "text/css" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "theme.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const saveThemeToServer = async () => {
    try {
      setSaveStatus("Saving theme...");
      const cssContent = generateCSS();
      
      const response = await fetch('http://localhost:3001/api/save-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cssContent }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSaveStatus("Theme saved successfully!");
        // Clear the success message after 3 seconds
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving theme:', error);
      setSaveStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="customizeContainer">
      <br />
        <div className="optionCollection">
          
          <div className="optionContainer">

            <label>Choose a Name For Your Blog</label>
            <input
              type="text"
              placeholder={name}
              value={name}
              onChange={(e) => handleBlogNameChange(e)}/>

          </div>
          
          <div className="optionContainer">
            
            <label>Choose a Name For Your Blog</label>
            <input
              type="text"
              placeholder={slogan}
              value={slogan}
              onChange={(e) => handleSloganChange(e)}/>

          </div>

        </div>
        <div className="buttonContainer">
           <button onClick={downloadConfig}>Download Config</button>
           <button onClick={saveConfigToServer}>Save the Changes</button>
        </div>

      <h1>Customize Theme</h1>
      <div className="optionCollection">
        <div className="optionContainer">
          <label>Background Color</label>
          <input type="color" value={bgMainColor} onChange={handleBgMainColor}/>
        </div>
        <div className="optionContainer">
          <label>Text color</label>
          <input type="color" value={textColor} onChange={handleTextColor} />
        </div>
       
      </div>
     
     <div className="optionCollection">
     <div className="optionContainer">
          <label>Blog Page Title Color</label>
          <input type="color" value={titlePrimaryColor} onChange={handleTitlePrimaryColor} />
        </div>
        <div className="optionContainer">
          <label>Blog page Second Title Color</label>
          <input type="color" value={titleSecondaryColor} onChange={handleTitleSecondaryColor} />
        </div>
        <div className="optionContainer">
          <label>Blog Header Background Color</label>
          <input type="color" value={blogHeaderBgColor} onChange={handleBlogHeaderBgColor} />
        </div>
     </div>

    <label className="customizeLabeler">Your Homepage</label>
    <div className="homeContainer">
      <Home articleModules={articleModules} />
    </div>
      <div className="optionCollection">
        <div className="optionContainer">
          <label>Article Title Color</label>
          <input type="color" value={articleTitleColor} onChange={handleArticleTitleColor} />
        </div>
        <div className="optionContainer">
          <label>Article Box Background</label>
          <input type="color" value={articleSCBgColor} onChange={handleArticleSCBgColor} />
        </div>

        <div className="optionContainer">
          <label>Article Container Hover</label>
          <input type="color" value={articleSCHover} onChange={handleArticleSCHover} />
        </div>

              
        <div className="optionContainer">
          <label>Article In Title Color</label>
          <input type="color" value={articleInTitle} onChange={handleArticleInTitle} />
        </div>
      </div>

      <label className="customizeLabeler">Individual Pages</label>
      <div className="homeContainer">
        <Deniz_İçin_makale></Deniz_İçin_makale> {/*TODO: DEFINE A DEFAULT ARTICLE FOR THIS*/} 
      </div>
     
      <div className="buttonContainer">
        <button onClick={downloadCSS}>Download CSS</button>
        <button onClick={saveThemeToServer}>Save Theme to Server</button>
        
      </div>
      <br />
    <div>{saveStatus && <p className="saveStatus">{saveStatus}</p>}</div>
    </div>
  );
}

export default Customize;