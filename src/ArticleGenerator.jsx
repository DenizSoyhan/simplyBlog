import { useState, useEffect } from "react";
import './index.css'; 
import { meta } from "@eslint/js";


function ArticleGenerator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [desc, setDesc] = useState("");

  const [serverStatus, setServerStatus] = useState("unknown");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkServerStatus();
  }, []);

  async function checkServerStatus() {
    try {
      const response = await fetch('http://localhost:3001/api/status');
      if (response.ok) {
        setServerStatus("running");
      } else {
        setServerStatus("error");
      }
    } catch (error) {
      console.error("Server connection failed:", error);
      setServerStatus("offline");
    }
  }

  async function createImageDirectory() {
    if (!title) {
      alert("Please enter a title first for the articles so we can create a directory for your images");
      return;
    }
  
    if (serverStatus !== "running") {
      alert("Server is not running. Please start the Express server first.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/api/create-image-directory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          directoryName: title
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`Image directory created: ./public/articleImages/${title}`);
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error('Error creating image directory:', error);
      alert(`Failed to create image directory: ${error.message}`);
    }
  }

  // Function to handle image selection
  function addImage(event) {
    if (!title) {
      alert("Please enter a file name first.");
      return;
    }

    const file = event.target.files[0];
    if (file) {
      const imageName = file.name;
      setContent((prevContent) => prevContent + `\n[Image: /articleImages/${title}/${imageName}]`);
    }
  }

  // add YouTube video via iframe
  function addVideo() {
    const url = prompt("Enter YouTube Video URL:");
    if (url) {
      const embedUrl = url.replace("watch?v=", "embed/");
      setContent((prevContent) => prevContent + `\n[Video: ${embedUrl}]`);
    }
  }

  //save content and display preview
  function saveContent() {
    setPreviewContent(content);
  }

  function getNextArticleNumber() {
    const latestNumber = parseInt(localStorage.getItem("latestArticleNumber") || "0", 10);
    const newNumber = latestNumber + 1;
    localStorage.setItem("latestArticleNumber", newNumber);

    return newNumber;
  }
  
  function title2FileName(someTitle) {
    const newFileNumber = getNextArticleNumber(); // Get the next number from local storage
    const res = `${newFileNumber}-${someTitle.split(" ").join("_")}`;
    
    return res;
  }

  function titleWithoutSpaces(anotherTitle){
    const res = `${anotherTitle.split(" ").join("_")}`;
    
    return res;
  }

  // generate the JSX file with class names
  function generateJSXContent() {
    if (!title) {
      alert("Please enter a 'Title'");
      return;
    }
  
    const finalFileName = title2FileName(title);
    const componentName = titleWithoutSpaces(title);
    
    // escape line breaks and quotes in the description otherwise it breaks string literal
    const escapedDesc = desc.replace(/\n/g, "\\n").replace(/"/g, '\\"');
  
    //metadata as a named export
    const metadata = `export const metadata = {
    title: "${title.replace(/"/g, '\\"')}",
    file: "${finalFileName}.jsx",
    imgDirectory: "${title.replace(/"/g, '\\"')}",
    createdOn: "${new Date().toISOString()}",
    description: "${escapedDesc}",
    generatedBy: "ArticleGenerator"
  };\n\n`;
  
    const jsxContent = `${metadata}
  export default function ${componentName}() {
    return (
      <div className="articleContainer">
        <h1 className="articleTitle">${title.replace(/"/g, '\\"')/*double quotes would break the string literal*/}</h1>
        ${previewContent
          .split("\n")
          .map((item) => {
            if (item.startsWith("[Image:")) {
              const imagePath = item.slice(7, -1);
              return `<div className="imageContainer"><img src="${imagePath}" alt="Article Image" className="articleImage" /></div>`;
            }
            if (item.startsWith("[Video:")) {
              const videoUrl = item.slice(8, -1);
              return `<div className="iframeContainer"><iframe src="${videoUrl}" frameBorder="0" allowFullScreen className="articleVideo"></iframe></div>`;
            }
            return `<p className="articleText">${item.replace(/"/g, '\\"')}</p>`; //double quotes would break the string literal
          })
          .join("\n")}
      </div>
    );
  }`;
  
    return jsxContent;
  }

  async function saveToArticlesDirectory() {
    if (!title) {
      alert("Please enter a 'Title'");
      return;
    }

    if (serverStatus !== "running") {
      console.log("Server is not running. Please start the Express server first.");
      return;
    }

    setIsSaving(true);
    const finalFileName = title2FileName(title);
    const jsxContent = generateJSXContent();
    if (!jsxContent) {
      setIsSaving(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/save-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: `${finalFileName}.jsx`,
          content: jsxContent
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Article saved successfully to articles directory!');
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert(`Failed to save to articles directory: ${error.message}. Downloading file instead...`);
      // fall back to the download method if everything fails
      generateJSXFile();
    } finally {
      setIsSaving(false);
    }
  }

  function generateJSXFile() {
    const jsxContent = generateJSXContent();
    if (!jsxContent) return;
    
    const finalFileName = title2FileName(title);
    
    const blob = new Blob([jsxContent], { type: "text/javascript" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${finalFileName}.jsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  return (
    
    <div className="generatorContainer">
            <div className="serverStatus">
        Server Status: 
        <span className={`status-indicator ${serverStatus}`}>
          {serverStatus === "running" ? "Connected" : 
           serverStatus === "offline" ? "Offline" : 
           serverStatus === "error" ? "Error" : "Unknown"}
        </span>
        <button onClick={checkServerStatus} className="refreshButton">Refresh</button>

      </div>

      <h1>Article Generator ⚙️</h1>
      

      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        id="descBar"
      />

<div className="directoryButtonContainer">
      <h3>Put your images to ./public/articleImages/{title ? title : 'name-of-file'}</h3>
      <p>You can click the button below to create the said directory!<br></br>Do not change the article title after creating directory</p>
      <button onClick={createImageDirectory}>Create Image Directory</button>
      </div>

      <textarea
        placeholder="Write your article content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      <input type="file" accept="image/*" onChange={addImage} style={{ display: "none" }} id="fileInput" />
   
      <div className="buttonContainer">
        <div className="tooltip-container">
          <button onClick={() => document.getElementById("fileInput").click()} className="tooltip-button">Add Image</button>
          <span className="tooltip-text">Images will be stored in <br></br><span className="dynamicToolTipText">"./public/articleImages/{title ? title : 'name-of-file'}"</span></span>
        </div>

        <button onClick={addVideo}>Add YouTube Video</button>

      </div>

      <div className="buttonContainer">
        <button onClick={saveContent}>SAVE</button>
      </div>
      
      <div className="buttonContainer">
        <button onClick={generateJSXFile}>Generate JSX File</button>
            <button 
              onClick={saveToArticlesDirectory} 
              disabled={isSaving || serverStatus !== "running"}
              className={`saveButton ${serverStatus !== "running" ? "disabled" : ""}`}
              >
              {isSaving ? "Saving..." : "Save to Articles Directory"}
            </button>
      </div>

      {/* Preview Box */}
      <h1 className="previewTitle">PREVIEW</h1>
      <div className="articleContainer">
        <h1 className="articleTitle">{title ? title : 'Title of the Article'}</h1>
        {previewContent
          .split("\n")
          .map((item, index) => {
            if (item.startsWith("[Image:")) {
              const imagePath = item.slice(7, -1); 
              return <div key={index} className="imageContainer"><img src={imagePath} alt="Article Image" className="articleImage" /></div>;
            }
            if (item.startsWith("[Video:")) {
              const videoUrl = item.slice(8, -1); 
              return <div key={index} className="iframeContainer"><iframe width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen className="articleVideo"></iframe></div>;
            }
            return <p key={index} className="articleText">{item}</p>;
          })}
      </div>
    </div>
  );
}

export default ArticleGenerator;
