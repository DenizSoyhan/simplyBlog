export const metadata = {
    title: "Youtube Video Showcase",
    file: "95-Youtube_Video_Showcase.jsx",
    imgDirectory: "Youtube Video Showcase",
    createdOn: "2025-04-16T09:00:45.244Z",
    description: "You can include a Youtube video to talk about in your writing. The time-codes are supported so you can make the reader jump to a specific moment in the video when they click on it. ",
    generatedBy: "ArticleGenerator"
  };


  export default function Youtube_Video_Showcase() {
    return (
      <div className="articleContainer">
          <div className="titleAndDateContainer">
            <h1 className="articleTitle">Youtube Video Showcase</h1>
            {metadata.createdOn && (
              <h4 className="articleDate">{new Date(metadata.createdOn).toLocaleDateString("en-GB")}</h4>
            )}
        </div>
        <p className="articleText" dangerouslySetInnerHTML={{ __html: 'Hey let\'s talk about a movie clip. But I only want you to hear how she wants to be a <span class=\"bold\">great big huge elephant!</span>' }} />
<div className="iframeContainer"><iframe src="https://www.youtube.com/embed/V9I7D5mZri8?start=14" frameBorder="0" allowFullScreen className="articleVideo"></iframe></div>
<p className="articleText" dangerouslySetInnerHTML={{ __html: 'I went to the Youtube video. Stopped at the right time and right click to \"Copy Video URL at the current time\". And use the \"Add Youtube Video\" button to add it to my article. ' }} />
<p className="articleText" dangerouslySetInnerHTML={{ __html: 'So my readers and I know exactly which part of the clip we are talking about! She craves to be <span class=\"bold\"><span class=\"italic\">great big huge elephant</span></span>. With a huge trunk like that!' }} />
      </div>
    );
  }