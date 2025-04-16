import { useState, useEffect } from "react";
import './index.css';

function ArticleGenerator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [desc, setDesc] = useState("");

  const [serverStatus, setServerStatus] = useState("unknown");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteTextInput, setQuoteTextInput] = useState("");
  const [quoteOwner, setQuoteOwner] = useState("");

  const basePath =import.meta.env.BASE_URL;

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

  // New function to handle image uploads
  async function uploadImage(file) {
    if (!title) {
      alert("Please enter a title first.");
      return null;
    }

    if (serverStatus !== "running") {
      alert("Server is not running. Please start the Express server first.");
      return null;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Create image directory first if it doesn't exist
      await fetch('http://localhost:3001/api/create-image-directory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ directoryName: title }),
      });

      // Now upload the image
      const response = await fetch(`http://localhost:3001/api/upload-image/${title}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadProgress(100);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
        return result.imagePath;
      } else {
        throw new Error(result.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
      setIsUploading(false);
      return null;
    }
  }

  // Function to handle image selection and upload
  async function addImage(event) {
    if (!title) {
      alert("Please enter a title first.");
      return;
    }

    const file = event.target.files[0];
    if (file) {
      // Upload the image and get its path
      const imagePath = await uploadImage(file);
      if (imagePath) {
        // Add the image reference to the content
        setContent((prevContent) => prevContent + `\n[Image: ${imagePath}]`);
      }
    }
  }

  // add YouTube video via iframe
  //I don't know how many forms a youtube URL can take so I am patching it as I need a feature.
  //--First feature: time stamped videos so your users can jump onto that time directly (this was only working with links like: https://www.youtube.com/watch?v=b50E-Wk0BgQ&t=260s)
  //--Second feature: time stamp thing now works with shortened videos (https://youtu.be/b50E-Wk0BgQ?t=260)
  function addVideo() {
    const urlInput = prompt("Enter YouTube Video URL:");
    if (!urlInput) return;
  
    try {
      const parsed = new URL(urlInput);
      let videoId = "";
      let start = 0;
  
      // Extract start time from ?t=14 or &t=14
      if (parsed.searchParams.has("t")) {
        const t = parsed.searchParams.get("t");
        start = parseInt(t.replace("s", ""), 10) || 0;
      }
  
      if (parsed.hostname.includes("youtu.be")) {
        // Shortened URL: https://youtu.be/VIDEOID?t=...
        videoId = parsed.pathname.slice(1);
      } else if (parsed.hostname.includes("youtube.com")) {
        // Regular URL: https://www.youtube.com/watch?v=VIDEOID&t=...
        videoId = parsed.searchParams.get("v");
      }
  
      if (!videoId) throw new Error("Invalid video ID");
  
      const embedUrl = `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ""}`;
      setContent((prevContent) => prevContent + `\n[Video: ${embedUrl}]`);
    } catch (err) {
      alert("Invalid YouTube URL");
    }
  }
  
  
  
  function handleAddQuote() {
    if(quoteTextInput!==""){
      setContent((prevContent) =>
        prevContent + `\n[Quote:${quoteTextInput}|${quoteOwner}]`
      );
    setQuoteTextInput("");
    setQuoteOwner("");
    }
    setShowQuoteModal(false);
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

  function handleCheckboxClick(e) {
    const clicked = e.target;
    if (clicked.id === "pinned") {
      document.getElementById("unlisted").checked = false;
    } else if (clicked.id === "unlisted") {
      document.getElementById("pinned").checked = false;
    }
  }
  
  function title2FileName(someTitle) {
    const isPinned = document.getElementById("pinned")?.checked;
    const isUnlisted = document.getElementById("unlisted")?.checked;
  
    let res = "";
  
    if (isPinned) {
      const newFileNumber = 'P';
      res = `${newFileNumber}-${someTitle.split(" ").join("_")}`;
    } else if (isUnlisted) {
      const newFileNumber = 'U';
      res = `${newFileNumber}-${someTitle.split(" ").join("_")}`;
    } else {
      const newFileNumber = getNextArticleNumber(); // Get the next number from local storage
      res = `${newFileNumber}-${someTitle.split(" ").join("_")}`;
    }
  
    return res;
  }

  function titleWithoutSpaces(anotherTitle) {
    const res = `${anotherTitle.split(" ").join("_")}`;
    return res;
  }

  function paragParser(paragraph) {
    // handle empty paragraphs
    if (!paragraph.trim()) return paragraph;
    
    // process the text char by char
    let result = '';
    let currentPosition = 0;
    
    // helper function to find closing markers so we can have underlined-bold-italic styling all at the same time
    function findClosingMarker(text, marker, startPos) {
      const markerLength = marker.length;
      const searchPos = startPos + markerLength;
      const closingPos = text.indexOf(marker, searchPos);
      return closingPos !== -1 ? closingPos : -1;
    }
    
    // process all formatting markers
    while (currentPosition < paragraph.length) {
      // look for first apperance of the opening markers
      const boldStart = paragraph.indexOf('**', currentPosition);
      const italicStart = paragraph.indexOf('##', currentPosition);
      const underlineStart = paragraph.indexOf('__', currentPosition);
      // Find the first marker (if any)
      const markers = [
        { type: 'bold', pos: boldStart, marker: '**', className: 'bold' },
        { type: 'italic', pos: italicStart, marker: '##', className: 'italic' },
        { type: 'underline', pos: underlineStart, marker: '__', className: 'underlined' }
      ].filter(m => m.pos !== -1);
      // sort markers by position
      markers.sort((a, b) => a.pos - b.pos);
      // if no markers found, add remaining text and exit
      if (markers.length === 0) {
        result += paragraph.substring(currentPosition);
        break;
      }
      
      // get the first marker
      const firstMarker = markers[0];
      
      // add text before the marker
      if (firstMarker.pos > currentPosition) {
        result += paragraph.substring(currentPosition, firstMarker.pos);
      }
      
      // find the closing marker using our helper function
      const closingPos = findClosingMarker(paragraph, firstMarker.marker, firstMarker.pos);
      
      if (closingPos === -1) {
        // No closing marker found, treat as regular text
        result += firstMarker.marker;
        currentPosition = firstMarker.pos + firstMarker.marker.length;
      } else {
        // Extract the text between markers
        const markerContent = paragraph.substring(
          firstMarker.pos + firstMarker.marker.length, 
          closingPos
        );
        
        // recursively process the content inside the markers (for nested formatting like **__text__**)
        const processedContent = paragParser(markerContent);
        
        // Add the formatted content
        result += `<span class="${firstMarker.className}">${processedContent}</span>`;
        
        // Move position past the closing marker
        currentPosition = closingPos + firstMarker.marker.length;
      }
    }
    
    return result;
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
          <div className="titleAndDateContainer">
            <h1 className="articleTitle">${title.replace(/"/g, '\\"')/*double quotes would break the string literal*/}</h1>
            {metadata.createdOn && (
              <h4 className="articleDate">{new Date(metadata.createdOn).toLocaleDateString("en-GB")}</h4>
            )}
        </div>
        ${previewContent
        .split("\n")
        .map((item) => {
          if (item.startsWith("[Image:")) {
            const imagePath = item.slice(7, -1);
            return `<div className="imageContainer"><img src="${basePath}${imagePath.slice(2)}" alt="Article Image" className="articleImage" /></div>`;
          }
          if (item.startsWith("[Video:")) {
            const videoUrl = item.slice(8, -1);
            return `<div className="iframeContainer"><iframe src="${videoUrl}" frameBorder="0" allowFullScreen className="articleVideo"></iframe></div>`;
          }
          if (item.startsWith("[Quote:")) {
            const fullQuote = item.slice(7,-1);
            var splittedQuote = fullQuote.split("|");

            const quoteText= splittedQuote[0].trim();
            let quoteOwnerV = splittedQuote[1].trim();

            if(quoteOwnerV!=""){
              quoteOwnerV = "-" + splittedQuote[1].trim();
            }

            return `<div className="quoteContainer">
              <div className="quoteText">${quoteText}</div>
              <div className="quoteOwner">${quoteOwnerV}</div>
            </div>`
          }
          // For regular paragraphs, use the paragraph parser and dangerouslySetInnerHTML
          if (!item.startsWith("[") && item.trim()) {
            return `<p className="articleText" dangerouslySetInnerHTML={{ __html: '${paragParser(item).replace(/'/g, "\\'").replace(/"/g, '\\"')}' }} />`;
          }
          return '';
        })
        .filter(Boolean)
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

  // Render a progress bar for image uploads
  const renderUploadProgress = () => {
    if (!isUploading) return null;

    return (
      <div className="upload-progress-container">
        <div
          className="upload-progress-bar"
          style={{ width: `${uploadProgress}%` }}
        ></div>
        <div className="upload-progress-text">
          {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
        </div>
      </div>
    );
  };

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
      {showQuoteModal && (
      <div className="quote-modal">
        <div className="quote-modal-content">
          <h3>Add a quote from someone!</h3>
          <textarea
          placeholder="Quote text goes here"
          value={quoteTextInput}
          onChange={(e) => setQuoteTextInput(e.target.value)}
          rows={4}
          style={{ width: "100%" }}
        />
          <input
            type="text"
            placeholder="Who said this?"
            value={quoteOwner}
            onChange={(e) => setQuoteOwner(e.target.value)}
          />
          <button onClick={handleAddQuote}>Add</button>
          <button onClick={() => setShowQuoteModal(false)}>Cancel</button>
        </div>
      </div>
)}
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

      <div className="directoryInfo">
        <h3>Images will be uploaded to: ./public/articleImages/{title ? title : 'name-of-file'}</h3>
        <p>The directory will be created automatically when you upload your first image. Try not to change your title as the directory will be named after the article title!</p>
        <div className="formattingGuide">
          <h3>Text Formatting Guide:</h3>
          <p>
            <span className="bold">**Bold Text**</span> --&gt; Use ** around text for bold
            <br />
            <span className="italic">##Italic Text##</span> --&gt; Use ## around text for italic
            <br />
            __<span className="underlined">Underlined Text</span>__ --&gt; Use __ around text for underline
          </p>
        </div>
        {renderUploadProgress()}
      </div>

      <textarea
        placeholder="Write your article content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={addImage} style={{ display: "none" }} id="fileInput" />

      <div className="buttonContainer">
        <div className="tooltip-container">
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="tooltip-button"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Add Image"}
          </button>
          <span className="tooltip-text">Images will be uploaded to <br></br><span className="dynamicToolTipText">"./public/articleImages/{title ? title : 'name-of-file'}"</span></span>
        </div>

        <button onClick={addVideo}>Add YouTube Video</button>
        <button onClick={() => setShowQuoteModal(true)}>Add Quote</button>

      </div>

      <div className="buttonContainer">
        <button onClick={saveContent}>SAVE</button>
      </div>

        <div className="checkBoxContainer">
          <div className="checkbox">
            <label>If you want to be pinned the article to top:</label>
            
            <input type="checkbox" id="pinned" onClick={handleCheckboxClick} />

          </div>

          <div className="checkbox">
            <label>If you want your articles not show up on the front page and only be accesible via a direct link:</label>
            <input type="checkbox" id="unlisted" onClick={handleCheckboxClick} />

          </div>

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

        <div className="titleAndDateContainer">
          <h1 className="articleTitle">{title ? title : 'Title of the Article'}</h1>
          {(
            <h4 className="articleDate">{new Date().toLocaleDateString("en-GB")}</h4>
          )}
        </div>

        {previewContent
          .split("\n")
          .map((item, index) => {
            if (item.startsWith("[Image:")) {
              const imagePath = item.slice(7, -1);
              return <div key={index} className="imageContainer"><img src={basePath+imagePath.slice(1)} alt="Article Image" className="articleImage" /></div>;
            }
            if (item.startsWith("[Video:")) {
              const videoUrl = item.slice(8, -1);
              return <div key={index} className="iframeContainer"><iframe width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen className="articleVideo"></iframe></div>;
            }
            if(item.startsWith("[Quote:")){
              const fullQuote = item.slice(7,-1);
              var splittedQuote = fullQuote.split("|");
              const quoteText= splittedQuote[0].trim();
              let quoteOwnerV = splittedQuote[1].trim();
              
              if(quoteOwnerV!=""){
                quoteOwnerV = "-" + quoteOwnerV;
              }

              return <div key={index} className="quoteContainer">
                <div className="quoteText">{quoteText}</div>
                <div className="quoteOwner">{quoteOwnerV}</div>
              </div>
            }
            // For regular paragraphs, use the paragraph parser and dangerouslySetInnerHTML
            if (!item.startsWith("[") && item.trim()) {
              return <p key={index} className="articleText" dangerouslySetInnerHTML={{ __html: paragParser(item) }} />;
            }
            return null;
          }).filter(Boolean)}
      </div>
    </div>
  );
}

export default ArticleGenerator;