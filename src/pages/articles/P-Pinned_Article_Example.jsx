export const metadata = {
    title: "Pinned Article Example",
    file: "P-Pinned_Article_Example.jsx",
    imgDirectory: "Pinned Article Example",
    createdOn: "2025-04-16T08:27:49.992Z",
    description: "This article has a special flag that allows it to be pinned at the top. It is the first thing everyone will see!",
    generatedBy: "ArticleGenerator"
  };


  export default function Pinned_Article_Example() {
    return (
      <div className="articleContainer">
          <div className="titleAndDateContainer">
            <h1 className="articleTitle">Pinned Article Example</h1>
            {metadata.createdOn && (
              <h4 className="articleDate">{new Date(metadata.createdOn).toLocaleDateString("en-GB")}</h4>
            )}
        </div>
        <p className="articleText" dangerouslySetInnerHTML={{ __html: 'Your pinned articles are showcased at the top of the homepage. They can be created with the \'Pinned\' flag turned or by going to <span class=\"bold\">\"simplyBlog/src/pages/articles\"</span> and changing the prefix at the start of the file name to\"<span class=\"bold\">P</span>-[Rest of the file name]\" instead of \"<span class=\"bold\">[Number]</span>-[Rest of the file name]\"' }} />
<p className="articleText" dangerouslySetInnerHTML={{ __html: 'Example: \"12-This_will_be_pinned_later_on\" --> \"P-This_will_be_pinned_later_on\"' }} />
<p className="articleText" dangerouslySetInnerHTML={{ __html: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores alias nam minima expedita tenetur nesciunt, perferendis, quam dolorum voluptatum fugit voluptatibus rem iusto? Aliquid, explicabo? Assumenda quasi beatae consequatur fugit impedit nesciunt possimus pariatur amet? Eos explicabo ullam ut, consectetur natus minima eaque, quaerat quae, voluptatum numquam et! Molestiae ratione, at blanditiis necessitatibus aspernatur illum dolorum!' }} />
<div className="imageContainer"><img src={`${import.meta.env.BASE_URL}articleImages/Pinned Article Example/2024-11-06_19-10.png`} />
</div>
<p className="articleText" dangerouslySetInnerHTML={{ __html: '      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aliquam atque quae provident iure quos cupiditate esse maiores. Architecto vel quis dolorem eaque cupiditate officiis. Voluptas minus minima quo cumque, illum earum voluptatem provident odio eveniet temporibus eum perferendis nisi blanditiis rem recusandae nulla aperiam sint natus, asperiores, voluptatibus eligendi. Architecto qui maxime natus alias, possimus quis magni, deserunt necessitatibus asperiores fugiat incidunt, unde quidem assumenda repudiandae nostrum? Eveniet beatae quo ea odit voluptate eius ipsum nisi harum quis eligendi? Velit autem ullam consequuntur rerum quos! Est maiores neque assumenda ex possimus laudantium adipisci quisquam reiciendis, veniam dolor officiis perspiciatis necessitatibus error iste, recusandae fugiat velit animi ipsa autem explicabo quos. Qui, quae? Architecto velit vero, ad accusantium quam sint nihil veritatis soluta, ea rerum quisquam!' }} />
<p className="articleText" dangerouslySetInnerHTML={{ __html: '      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic quam illo doloribus id fuga culpa odit dolores mollitia debitis eos quod incidunt, maiores ipsam eligendi maxime excepturi et similique optio magnam fugit consequatur laboriosam ab! Voluptate error tempore quidem eos ullam necessitatibus inventore modi unde fugit facilis nobis laborum exercitationem fuga, soluta doloribus impedit! Laudantium eum, ipsa, soluta ut minima eveniet temporibus quae tenetur deleniti, error vitae in suscipit quasi dolorem.' }} />
      </div>
    );
  }