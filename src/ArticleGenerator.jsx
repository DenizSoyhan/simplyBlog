import { useState } from "react";
import './index.css'; 
import { meta } from "@eslint/js";


function ArticleGenerator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [desc, setDesc] = useState("");

  // Function to handle image selection
  function addImage(event) {
    if (!fileName) {
      alert("Please enter a file name first.");
      return;
    }

    const file = event.target.files[0];
    if (file) {
      const imageName = file.name;
      setContent((prevContent) => prevContent + `\n[Image: /articleImages/${fileName}/${imageName}]`);
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
  function generateJSXFile() {
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
    imgDirectory: "${fileName.replace(/"/g, '\\"')}",
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
      <h1>Article Generator ⚙️</h1>
      <input
        type="text"
        placeholder="File Name for Images (e.g., Article1-images)"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      
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

      <textarea
        placeholder="Write your paragraph..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      
      <input type="file" accept="image/*" onChange={addImage} style={{ display: "none" }} id="fileInput" />
   
      <div className="buttonContainer">
        <div className="tooltip-container">
            <button onClick={() => document.getElementById("fileInput").click()} className="tooltip-button">Add Image</button>
            <span className="tooltip-text">Add the image to <br></br><span className="dynamicToolTipText">"./public/articleImages/{fileName ? fileName : 'name-of-file'}"</span></span>
        </div>

        <button onClick={addVideo}>Add YouTube Video</button>

        <button onClick={saveContent}>SAVE</button>
        <button onClick={generateJSXFile}>Generate JSX File</button>

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
