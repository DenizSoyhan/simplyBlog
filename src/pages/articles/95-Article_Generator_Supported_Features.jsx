export const metadata = {
    title: "Article Generator Supported Features",
    file: "93-Article_Generator_Supported_Features.jsx",
    imgDirectory: "Article Generator Supported Features",
    createdOn: "2025-04-16T08:46:49.628Z",
    description: "This article is here to show some features that is supported by the article generator. ",
    generatedBy: "ArticleGenerator"
  };


  export default function Article_Generator_Supported_Features() {
    return (
      <div className="articleContainer">
          <div className="titleAndDateContainer">
            <h1 className="articleTitle">Article Generator Supported Features</h1>
            {metadata.createdOn && (
              <h4 className="articleDate">{new Date(metadata.createdOn).toLocaleDateString("en-GB")}</h4>
            )}
        </div>
        <div className="quoteContainer">
              <div className="quoteText">I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.</div>
              <div className="quoteOwner">-Marilyn Monroe</div>
            </div>
<p className="articleText" dangerouslySetInnerHTML={{ __html: 'You can add this little special component called \"Quotes\" via article generator. These features are added as I figure out that I need them to convey my ideas. So this might be super niche feature that looks unimportant but just know that it is here because it came to my mind first.' }} />
<p className="articleText" dangerouslySetInnerHTML={{ __html: 'Here, we also have images. You can have an image of <span class=\"italic\"><span class=\"underlined\">Ana de Armas</span> </span> acting as <span class=\"bold\">Marilyn Monroe</span> in the 2022 movie <span class=\"bold\"><span class=\"italic\"><span class=\"underlined\">\"Blonde\"</span></span></span>.' }} />
<div className="imageContainer"><img src={`${import.meta.env.BASE_URL}articleImages/Article Generator Supported Features/blonde-marilyn-monroe--2032036311.jpg`} alt="Article Image" className="articleImage" /></div>
<p className="articleText" dangerouslySetInnerHTML={{ __html: 'Keen eyed readers might have picked up that some words are <span class=\"italic\">italic</span>, <span class=\"bold\">bold</span> or <span class=\"underlined\">underlined</span>. The article generator also supports these 3 stylings and combination of them!' }} />
      </div>
    );
  }
