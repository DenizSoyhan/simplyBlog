import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Article_Generator_Supported_Features from "../defaultAssets/defaultArticles/95-Article_Generator_Supported_Features.jsx";
import BlogHeader from "./BlogHeader";
import BlogConfig from "./BlogConfig";
import BlogFooterConfig from "./FooterConfig";


const articleModules = import.meta.glob("../defaultAssets/defaultArticles/*.jsx", { eager: true });

function Customize() {

  const commonFonts = [
    "Cantarell",
    "Spectral",
    "monospace",
    "Arial",
    "Verdana",
    "Helvetica",
    "Courier",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Tahoma",
    "Palatino Linotype",
    "Impact",

  ];
  //GaramondPremierPro

  /* Setting default values for hooks*/

  //Fonts
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [hoveredFont, setHoveredFont] = useState(null);

  //Blog name and slogan
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");

  //Colors
  const [bgMainColor, setBgMainColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000"); //TODO: REMOVE THIS ALREADY
  const [titlePrimaryColor, setTitlePrimaryColor] = useState("#000000");
  const [titleSecondaryColor, setTitleSecondaryColor] = useState("#000000");
  const [blogHeaderBgColor, setBlogHeaderBgColor] = useState("#ffffff");
  const [articleTitleColor, setArticleTitleColor] = useState("#000000");
  const [articleSCBgColor, setArticleSCBgColor] = useState("#ffffff");
  const [articleSCHover, setArticleSCHover] = useState("#cccccc");
  const [articleSCDesc, setArticleDescColor] = useState("#000000");
  const [articleInTitle, setArticleInTitle] = useState("#000000");
  const [articleContentTextColor, setArticleContentTextColor] = useState("#ffffff");


  //Status for theme change
  const [saveStatus, setSaveStatus] = useState("");

  //Footer information

  const [creatorName, setCreatorName] = useState("");
  const [creatorContact, setCreatorContact] = useState("");
  const [instaV, setInsta] = useState("");
  const [githubV, setGithubV] = useState("");
  const [twitterV, setTwitterV] = useState("");
  const [linkedinV, setLinkedinV] = useState("");
  const [facebookV, setFacebookV] = useState("");
  const [pWebsiteV, setpWebsiteV] = useState("");
  const [youtubeV, setYoutube] = useState("");

  useEffect(() => {
    const computedFont = getComputedStyle(document.body).fontFamily.split(",")[0].replace(/['"]/g, "").trim();
    if (commonFonts.includes(computedFont)) {
      setSelectedFont(computedFont);
    }
  }, []);

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
        return `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
      }

      return colorValue;
    };

    const rootStyles = getComputedStyle(document.documentElement);

    setBgMainColor(convertToHex(rootStyles.getPropertyValue("--main-bg-color").trim() || "#ffffff"));    setTitlePrimaryColor(convertToHex(rootStyles.getPropertyValue("--title-primary-color").trim() || "#000000"));
    setTitleSecondaryColor(convertToHex(rootStyles.getPropertyValue("--title-secondary-color").trim() || "#000000"));
    setBlogHeaderBgColor(convertToHex(rootStyles.getPropertyValue("--blog-header-bg").trim() || "#ffffff"));
    setArticleTitleColor(convertToHex(rootStyles.getPropertyValue("--article-title-color").trim() || "#000000"));
    setArticleSCBgColor(convertToHex(rootStyles.getPropertyValue("--articleShowCaseContainer-bg-color").trim() || "#ffffff"));
    setArticleSCHover(convertToHex(rootStyles.getPropertyValue("--articleShowCaseContainer-hover-color").trim() || "#cccccc"));
    setArticleDescColor(convertToHex(rootStyles.getPropertyValue("--article-in-title-color").trim() || "#000000"));
    setArticleInTitle(convertToHex(rootStyles.getPropertyValue("--article-in-title-color").trim() || "#000000"));
    setArticleContentTextColor(convertToHex(rootStyles.getPropertyValue(" --article-in-content-color").trim() || "#ffffff"))

    const blogNameEl = document.getElementById("blogName");
    const blogSloganEl = document.getElementById("slogan");

    if (blogNameEl) {
      const contentName = blogNameEl.textContent;
      const contentSlogan = blogSloganEl.textContent;
      setName(contentName);
      setSlogan(contentSlogan);
    }




  }, []);

  useEffect(() => {
    const loadFooterConfig = async () => {
      const module = await import("./FooterConfig.jsx");
      const config = module.default;

      setCreatorName(config.personName || "");
      setCreatorContact(config.contact || "");
      setInsta(config.insta || "");
      setGithubV(config.github || "");
      setTwitterV(config.twitter || "");
      setLinkedinV(config.linkedin || "");
      setFacebookV(config.facebook || "");
      setpWebsiteV(config.pWebsite || "");
      setYoutube(config.youtube || "");
    };

    loadFooterConfig();
  }, []);

  /*Color and name handling*/
  function handleBlogNameChange(e) {
    const newName = e.target.value;
    setName(newName);
    document.getElementById("blogName").textContent = newName;
  }

  function handleSloganChange(e) {
    const newName = e.target.value;
    setSlogan(newName);
    document.getElementById("slogan").textContent = newName;
  }

  function handleBgMainColor(e) {
    const newColor = e.target.value;
    setBgMainColor(newColor);
    document.documentElement.style.setProperty("--main-bg-color", newColor);
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

  function handleArticleContent(e) {
    const newColor = e.target.value;
    setArticleContentTextColor(newColor);
    document.documentElement.style.setProperty("--article-in-content-color", newColor);
  }

  function handleDescColor(e) {
    const newColor = e.target.value;
    setArticleDescColor(newColor);
    document.documentElement.style.setProperty("--desc-color", newColor);
  }


  //Footer handling

  function handleCreatorName(e) {
    const newCName = e.target.value;
    setCreatorName(newCName);
    document.getElementById("creatorName").textContent = newCName;
  }

  function handleCreatorContact(e) {
    const newCContact = e.target.value;
    setCreatorContact(newCContact);
    document.getElementById("creatorContact").textContent = newCContact;
  }

  function handleCreatorInsta(e) {
    const newCInsta = e.target.value;

    if (newCInsta === "") {
      document.getElementById("instaContainer").classList.add("hide");
      setInsta(newCInsta);
    }
    else {
      document.getElementById("instaContainer").classList.remove("hide");
      setInsta(newCInsta);
      document.getElementById("instaContainer").childNodes[0].href = newCInsta;
    }
  }

  function handleCreatorGithub(e) {
    const newCGithub = e.target.value;

    if (newCGithub === "") {
      document.getElementById("githubContainer").classList.add("hide");
      setGithubV(newCGithub);
    }
    else {
      document.getElementById("githubContainer").classList.remove("hide");
      setGithubV(newCGithub);
      document.getElementById("githubContainer").childNodes[0].href = newCGithub;
    }
  }

  function handleCreatorTwitter(e) {
    const newCTwitter = e.target.value;

    if (newCTwitter === "") {
      document.getElementById("twitterContainer").classList.add("hide");
      setTwitterV(newCTwitter);
    }
    else {
      document.getElementById("twitterContainer").classList.remove("hide");
      setTwitterV(newCTwitter);
      document.getElementById("twitterContainer").childNodes[0].href = newCTwitter;
    }
  }

  function handlecreatorLinkedin(e) {
    const newCLinkedin = e.target.value;

    if (newCLinkedin === "") {
      document.getElementById("linkedinContainer").classList.add("hide");
      setLinkedinV(newCLinkedin);
    }
    else {
      document.getElementById("linkedinContainer").classList.remove("hide");
      setLinkedinV(newCLinkedin);
      document.getElementById("linkedinContainer").childNodes[0].href = newCLinkedin;
    }
  }

  function handleCreatorFacebook(e) {
    const newCFacebook = e.target.value;

    if (newCFacebook === "") {
      document.getElementById("facebookContainer").classList.add("hide");
      setFacebookV(newCFacebook);
    }
    else {
      document.getElementById("facebookContainer").classList.remove("hide");
      setFacebookV(newCFacebook);
      document.getElementById("facebookContainer").childNodes[0].href = newCFacebook;
    }
  }

  function handleCreatorWebsite(e) {
    const newCWebsite = e.target.value;

    if (newCWebsite === "") {
      document.getElementById("websiteContainer").classList.add("hide");
      setpWebsiteV(newCWebsite);
    }
    else {
      document.getElementById("websiteContainer").classList.remove("hide");
      setpWebsiteV(newCWebsite);
      document.getElementById("websiteContainer").childNodes[0].href = newCWebsite;
    }
  }

  function handleCreatorYoutube(e) {
    const newCYoutube = e.target.value;

    if (newCYoutube === "") {
      document.getElementById("youtubeContainer").classList.add("hide");
      setYoutube(newCYoutube);
    }
    else {
      document.getElementById("youtubeContainer").classList.remove("hide");
      setYoutube(newCYoutube);
      document.getElementById("youtubeContainer").childNodes[0].href = newCYoutube;
    }
  }


  //generating, downloading, saving stuff

  const generateBlogConfig = () => {
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
    --font-family: ${selectedFont};
    --main-bg-color: ${bgMainColor};
    --title-primary-color: ${titlePrimaryColor};
    --title-secondary-color: ${titleSecondaryColor};
    --desc-color: ${articleSCDesc};
    --blog-header-bg: ${blogHeaderBgColor};
    --article-title-color: ${articleTitleColor};
    --articleShowCaseContainer-bg-color: ${articleSCBgColor};
    --articleShowCaseContainer-hover-color: ${articleSCHover};
    --article-in-title-color: ${articleInTitle};
    --article-in-content-color:${articleContentTextColor};
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

  const generateFooter = () => {
    return (`export const BlogFooterConfig = {
    personName: "${creatorName}",
    contact: "${creatorContact}",
    insta: "${instaV}",
    github: "${githubV}",
    twitter: "${twitterV}",
    linkedin:  "${linkedinV}",
    facebook:  "${facebookV}",
    pWebsite:  "${pWebsiteV}",
    youtube:  "${youtubeV}"
    
  };
  
  export default BlogFooterConfig;`
    );
  };

  const downloadFooter = () => {
    const footerContent = generateFooter();
    const blob = new Blob([footerContent], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "FooterConfig.jsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const saveFooterToServer = async () => {
    try {
      setSaveStatus("Saving footer configuration...");
      const footerContent = generateFooter();

      const response = await fetch('http://localhost:3001/api/save-footer-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ footerContent }),
      });

      const data = await response.json();

      if (data.success) {
        setSaveStatus("Footer configuration saved successfully!");
        // Clear the success message after 3 seconds
        setTimeout(() => setSaveStatus(""), 3000);
      } else {
        setSaveStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error saving footer config:', error);
      setSaveStatus(`Error: ${error.message}`);
    }
  };




  return (
    <div className="customizeContainer">
      <br />

      

      <label className="customizeLabeler">Name and slogan of your blog</label>
      <div className="optionCollection">

        <div className="optionContainer">

          <label>Choose a Name For Your Blog</label>
          <input
            type="text"
            placeholder={name}
            value={name}
            onChange={(e) => handleBlogNameChange(e)} />

        </div>

        <div className="optionContainer">

          <label>Choose a Name For Your Blog</label>
          <input
            type="text"
            placeholder={slogan}
            value={slogan}
            onChange={(e) => handleSloganChange(e)} />

        </div>

      </div>
      <div className="buttonContainer">
        <button onClick={downloadConfig}>Download Config</button>
        <button onClick={saveConfigToServer}>Apply the Name Changes</button>

      </div>
      <br></br>

      <h1>Customize Theme</h1>
      <div style={{width:"100%",border:"1px solid white", marginBottom:"1em"}}></div>
      <div style={{ borderRadius: "10px", padding: "0.5em", backgroundColor: "#2E3132", color: "#dadadb", marginBottom: "1rem", width: "600px", margin: "0 auto 1em auto" }}>
        <label htmlFor="fontSelector">Current Font: {selectedFont}</label>

        {/* Font Preview */}
        <div
          style={{
            textAlign: "center",
            height: "25px",
            fontFamily: hoveredFont || selectedFont,
            fontSize: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "0.5rem"

          }}
        >
          The quick brown fox jumps over the lazy dog.
        </div>

        {/* Custom Font List */}
        <div id="fontSelector" style={{ height: "200px", overflowY: "auto" }}>
          {commonFonts.map((font) => (
            <div
              key={font}
              onMouseEnter={() => setHoveredFont(font)}
              onMouseLeave={() => setHoveredFont(null)}
              onClick={() => {
                setSelectedFont(font);
                document.documentElement.style.setProperty("--font-family", font);
              }}
              style={{
                minHeight: "25px",
                width: "95%",
                fontFamily: font,
                padding: "8px",
                marginBottom: "4px",
                borderRadius: "4px",
                backgroundColor:
                  hoveredFont === font || selectedFont === font
                    ? "#727475"
                    : "transparent",
                cursor: "pointer"
              }}
            >
              {font}
            </div>
          ))}
        </div>
      </div>
      <div className="optionCollection">
        <div>{saveStatus && <p
          style={{
            textAlign: "center",
            height: "25px",
            fontSize: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "0.5rem"

          }} className="saveStatus">{saveStatus}</p>}</div>

      </div>

      <div className="optionCollection">
        <div className="optionContainer">
          <label>Background Color</label>
          <input type="color" value={bgMainColor} onChange={handleBgMainColor} />
        </div>
        <div className="optionContainer">
          <label>Blog Header Background Color</label>
          <input type="color" value={blogHeaderBgColor} onChange={handleBlogHeaderBgColor} />
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

      </div>

      <div className="optionCollection">

        <div className="optionContainer">
          <label>Description Color</label>
          <input type="color" value={articleSCDesc} onChange={handleDescColor} />
        </div>

      </div>

      <label className="customizeLabeler">Individual Pages</label>
      <div className="homeContainer">
        <Article_Generator_Supported_Features></Article_Generator_Supported_Features>
      </div>

      <div className="optionCollection">
        <div className="optionContainer">
          <label>Article In Title Color</label>
          <input type="color" value={articleInTitle} onChange={handleArticleInTitle} />
        </div>

        <div className="optionContainer">
          <label>Article content text color</label>
          <input type="color" value={articleContentTextColor} onChange={handleArticleContent} />
        </div>


      </div>

      <div className="buttonContainer">
        <button onClick={downloadCSS}>Download CSS</button>
        <button onClick={saveThemeToServer}>Save Theme to Server</button>

      </div>
      <br />
      <div className="optionCollection">{saveStatus && <p style={{
        textAlign: "center",
        height: "25px",
        fontSize: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginBottom: "0.5rem"

      }} className="saveStatus">{saveStatus}</p>}
      </div>


      <label className="customizeLabeler">Footer Settings</label>
      
      <div className="footerSettings">
      <div className="optionCollection">
        <div className="optionContainer">

          <label>Display your name in footer</label>
          <input
            type="text"
            value={creatorName}
            onChange={(e) => handleCreatorName(e)} />
        </div>
        <div className="optionContainer">

          <label>Display your Contact email</label>
          <input
            type="text"
            value={creatorContact}
            onChange={(e) => handleCreatorContact(e)} />
        </div>

      </div>


      <div className="optionCollection">
        <div className="optionContainer">

          <label>Display your Instagram</label>
          <input
            type="text"
            value={instaV}
            onChange={(e) => handleCreatorInsta(e)} />
        </div>
        <div className="optionContainer">

          <label>Display your Github</label>
          <input
            type="text"
            value={githubV}
            onChange={(e) => handleCreatorGithub(e)} />
        </div>
        <div className="optionContainer">

          <label>Display your Twitter</label>
          <input
            type="text"
            value={twitterV}
            onChange={(e) => handleCreatorTwitter(e)} />
        </div>
      </div>



      <div className="optionCollection">
        <div className="optionContainer">

          <label>Display your LinkedIn</label>
          <input
            type="text"
            value={linkedinV}
            onChange={(e) => handlecreatorLinkedin(e)} />
        </div>
        <div className="optionContainer">

          <label>Display your Facebook</label>
          <input
            type="text"
            value={facebookV}
            onChange={(e) => handleCreatorFacebook(e)} />
        </div>
        <div className="optionContainer">

          <label>Display your website</label>
          <input
            type="text"
            value={pWebsiteV}
            onChange={(e) => handleCreatorWebsite(e)} />
        </div>
      </div>
      <div className="optionCollection">
        <div className="optionContainer">

          <label>Display your Youtube Channel</label>
          <input
            type="text"
            value={youtubeV}
            onChange={(e) => handleCreatorYoutube(e)} />
        </div>
      </div>


      </div>




      <div className="buttonContainer">
        <button onClick={downloadFooter}>Download Footer</button>
        <button onClick={saveFooterToServer}>Save the Footer</button>
      </div>




    </div>

  );
}

export default Customize;