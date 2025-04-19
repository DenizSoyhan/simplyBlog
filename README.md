<p align="center">
<img src="https://github.com/user-attachments/assets/c08ce960-d2a3-4465-9e1d-63166379b66e" width="800" />
</p><br>

This is a blog maker template repository that I made. You can see the template and some article examples [here](https://denizsoyhan.github.io/simplyBlog/).<br><br>  If you need a space to share your ideas without the hassle of watermarks and paywalls. You can customize it to your heart's content and add articles with an intuitive article generator! This project is the result of "Oh I can just my own version real quick!" delusion that all of us fall into. I hope it helps you!

## Contents of ReadMe:<br>
- [Features](#features)<br>
  - [Home Page](#home-page)
  - [Customizer](#customizer)
  - [Article Generator](#article-generator)<br>
- [How To Install](#how-to-install)<br>
  - [0)Requirements](#0requirements)
  - [1)Have The Files](#1have-the-files)
  - [2)Configure and Deploy](#2configure-and-deploy)<br>
- [How To Use](#how-to-use)<br>
  - [0) RUN THE SERVER](#0-run-the-server)
  - [1) CUSTOMIZER](#1-customizer)
  - [2) ARTICLE-GENERATOR](#2-article-generator)
  - [3) ARTICLE MANAGEMENT](#3-article-management)
  - [4) REDEPLOYMENT](#4-redeployment)<br>
- [Future Features](#future-features)<br>

# FEATURES
- ## Home Page
Default Home page looks like the image below. No worries you can make your own theme!
<p align="center">
<img src="https://github.com/user-attachments/assets/fc98bb1e-c1fb-4b67-8a87-fbbd8297405b" width="800" />
</p>

#### -Blog Header<br>
Your blog will have your desired blog header with your desired name, alt title such as "Never Been Simpler" or you can remove the alt title completely and it's own color scheme.

#### -Articles
The articles are sorted in a very intuitive way. This is explained in depth [here](##3-article-management).

- ## Article Content
You can implement **bold**, *italic*, <ins>underlined</ins> stylings, a special component called quote that you can see below, images and Youtube videos with time stamps.
<p align="center">
<img src="https://github.com/user-attachments/assets/eb43d444-02b4-4cd7-8634-f95188cda1cd" width="800" />
</p>

- ## Customizer
You will have access to a customizer on dev mode where you can decide on a theme, what font to use, name and alt title of your blog, all the footer content that we talked about in the Home Page section.
<p align="center">
<img src="https://github.com/user-attachments/assets/bbb275da-938f-4e34-b25f-482cba03a609" width="800" />
  <img src="https://github.com/user-attachments/assets/9c9934be-122d-4bdd-ba17-f690beca9fdb" width="800" />
</p>

These are some random themes I put together in 2 minutes. I don't have the *designer eye* so hopefully you can come up with stuff better than me :P

- ## Article Generator
You have an access to an article generator where you can add text, style them (**bold**, *italic*, <ins>underlined</ins>), images, youtube videos with time stamps and quotes. This generator creates the file and saves it in the appropriate folder. You can preview your article beforehand with "SAVE" button down below the page so you know how it will exactly look!
<p align="center">
  <img src="https://github.com/user-attachments/assets/f84205d5-10a0-449e-92ce-6635061269b6" width="800" />
</p>

# HOW TO INSTALL
### 0)Requirements

You will need these tools to get everything working:
>* git
>* node
>* npm

The requirements part after this is to guide Windows users for the set up.

#### Git
>You can try to check if git is already installed by typing this command in 'cmd' or your shell of choice.
```bash
git --version
```
You should see something like:
```bash
git version 2.34.1.windows.1
```

If it is not recognized:

>> Download Git from it's [official site](https://git-scm.com/downloads/win) and follow the instructions. After that try the first step if you can now see the git version.
#### Node and NPM
### Git
>Node and npm are packaged together. If you have Node you most likely have "npm". You can try to check if node and npm is already installed by typing these 2 commands in 'cmd' or your shell of choice.
```bash
node --version
npm --version
```
You should see something like:
```bash
v16.13.0
8.1.0
```

If it is not recognized:
>> Download Node from it's [official site](https://nodejs.org/en) and follow the instructions. After that try the first step if you can now see the versions.

### 1)Have The Files
This is a *Template Repository*. Meaning you can just have your own version with this button on right top side. Chooose "Create a New Repository". 
<p align="center">
  <img src="https://github.com/user-attachments/assets/9e1ca353-6631-436b-acb3-486d6281328d" width="800" />
</p>
Decide on a name for your repo! And create it.
After your version is created. Go to code and copy the SSH option for cloning. I highly recommend using this to clone and push later on after adding articles and changing themes. So if you never set your SSH keys please do. You can follow this tutorial to create your own SSH keys: 

[SSH Key Configuration](https://github.com/DenizSoyhan/SSH-key-creation-on-Windows) This is a requirement. You can't skip it.


<p align="center">
  <img src="https://github.com/user-attachments/assets/b44ccafa-a97e-49b6-823a-d948b84ad4fb" width="400" />
</p>

Open cmd on Desktop and type git clone with your copied SSH string that you got from image above:

```bash
 git clone [git@github.com:YourUserName/YourRepoName.git]

```
### 2)Configure and Deploy
Let's see if you can put it on the internet first! Then you can try to change themes and adding your own articles.<br>
After cloning the repo, navigate to the folder. There is a file called "**vite.config.js**". You need to change **/simplyBlog/** with your own repo name (put it between"/ /"). So if your repo name is "Cooking-with-Deniz" the line should read "**/Cooking-with-Deniz/**". This is quite important<br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/820ada95-17cf-4cb8-91da-99690fe3204b" width="800" />
</p>

Navigate to the folder and type "**cmd**" in the navigation bar. Type these in the terminal in order:
> This will download all dependencies
```bash
 npm install

```
This will add your **vite.config.js** to staging area of git.
```bash
 git add .

```
This will commit your staging area.
```bash
 git commit -m "This will be my first deployment"

```
This will update your remote repo on github. If you didn't change it specifically the branch name should be master.
```bash
 git push origin master

```

And the final one. This will create a seperate branch on github with gh-pages using your master branch which will be what other people see. 
```bash
 npm run deploy

```
If you see the below result with the message "**Published**"", congrats! In 1-3 minutes you should be able to see the default template for simplyBlog. To see your URL go to "**Settings**" on your github repo and click on "**Pages**". When it is done on top there should be a URL like: https://[yourUserName].github.io/[yourRepoName]/

<p align="center">
  <img src="https://github.com/user-attachments/assets/c2f833a7-a4aa-44b2-8fd2-d1a1db0634d2" width="800" />
</p>



This two-step process with pushing and deploying keeps your source code (on master branch) and your deployed build (on gh-pages branch) separate, which is the standard practice for GitHub Pages deployments.

# HOW TO USE
> ## 0) RUN THE SERVER
You can activate the server to use all the functionalites below. Type this in the command line that runs on the blog directory to start:
```bash
 npm run start

```
If you see what's below you can go to the local host adress + [yourRepoName] you will see the home page.

<p align="center">
  <img src="https://github.com/user-attachments/assets/15f36fe3-f59d-4767-a6f7-a85d48f0929c" width="800" />
</p>

> ## 1) CUSTOMIZER
Go to the customizer via http://localhost:5173/[yourRepoName]/customize
Customizer has 3 sections that you can use to change aspects of your blog:
> - Name and Slogan
> - Theme and font
> - Footer
>> ### Name and Slogan
Pretty self explanatory. You can change the name and slogan. Or leave it empty to remove these elements. When you are done click "**Apply the Name Changes**" button and the server will take care of it.

<p align="center">
  <img src="https://github.com/user-attachments/assets/dc096cf8-fc61-4f95-a2b0-c7e7874100e6" width="800" />
</p>

>> ### Theme and Font
Choose the font you want and all the colors. You can preview how the article content and the home page article listings will look. When you are done click "**Save Theme to Server**" button and the server will take care of it.

<p align="center">
  <img src="https://github.com/user-attachments/assets/9eb24f4c-83c7-4aef-a9db-fac4df390d68" width="500" />
</p>

>> ### Footer
There are several text boxes here. If you leave a box empty that social will not be included.  Type the links to socials you want to put in your footer and delete the ones you don't want. You can preview how it looks right below. One important thing you want is to include "**https://**" with your links. For example: **https://github.com/DenizSoyhan** will work but "**github.com/DenizSoyhan**" will not.When you are done click "**Save the Footer**" button and the server will take care of it.

<p align="center">
  <img src="https://github.com/user-attachments/assets/9212c91b-c52a-4d8e-8d4a-008041e46015" width="700" />
</p>



## 2) ARTICLE-GENERATOR
Go to the article generator via http://localhost:5173/[yourRepoName]/generate-article <br>
You can decide on an article title and all the images you add after this will be created with this name so try to decide on a name and not change it if possible later on.
After that you can add article content in the bigger box and by pressing **SAVE** button you can preview how your articles will look below the page. 
>> ### Text styling:
You can add **bold**, *italic*, <ins>underlined</ins> stylings to your text by following the guide which is included on generator page.
>>Text Formatting Guide:
>* ** Bold Text ** --> Use ** around text for bold with no spaces<br>
>* ##Italic Text## --> Use ## around text for italic with no spaces<br>
>* __ Underlined Text __ --> Use __ around text for underline with no spaces<br>

>> ### Images:
>> You can use the button "**Add Image**" to chose an image from your file system to add an image to your article. A copy of the image and the directory itself will be created that is located in **/simplyBlog/public/articleImages/[nameOfYourArticle]**

>> ### Youtube Videos:
>> You can use the button "**Add Youtube Video**" to paste a youtube video to add an iframe to your article. This option also accepts time-stamped videos so the reader can start the video from the exact point that you want them to.

>> ### Quotes:
>> You can use the button "**Add Quote**" to well, add a quote from someone. This is a specialized component that is stylized just for this use. If you leave the owner section empty it will still show the quote. The quote itself can't be left empty tho. The quotes looks like the image below.

<p align="center">
  <img src="https://github.com/user-attachments/assets/52abb31f-43d1-4735-a024-5e41b0aa203c" width="700" />
</p>

>> ### Pinned and Unlisted:
>> There are 2 checkboxes that you can check.
>> #### Pinned
>> This option will put your article in a pinned state. It will be shown at the top of your Home Page with a thumb-tack icon.
>> #### Unlisted
>> This option will put your article in an unlisted state. It will not be shown in the Home Page and only people with a direct link will be able to see it.

> With the "**SAVE**" button you can preview how your article will look like.

> With the "**Save To Articles Directory**" button you will add everything in your **Preview** so if you write something and not press **SAVE** button before hand it will not be in the final product. Don't forget 'If you don't see it in the preview box it doesn't exist yet'!



## 3) ARTICLE MANAGEMENT
All your articles will be located in "**/simplyBlog/src/pages/articles**" (ofc 'simplyBlog' is your own directory name).  <br>
The articles are sorted in a very intuitive way. In this directory the articles named in this manner:
> - **P-Pinned_Article.jsx**<br>
> - **12-Article_Name.jsx**
> - **13-Second_Article.jsx**
> - **U-Invisible_Article.jsx**<br><br>
> *Number* prefixes decides which article will be shown closer to the top. Bigger the number higher the priority. In this case _13-Second_Article.jsx_ will be on top of __12-Article_Name.jsx__.<br>
> The **P-Pinned_Article.jsx** will be pinned to the top of the page and has a higher priority than **13-Second_Article.jsx** and  **12-Article_Name.jsx**. If you want your readers to see an article first use this prefix!<br>
> **U-Invisible_Article.jsx** will not be shown on the Home Page and only people with the direct link to the article will be able to see them.

So change these prefixes at your heart's content. Delete an article to remove it from your home page. Start by removing the showcase articles that came with the repo. The articles also have img folders dedicated to them. You can also remove them from "**/simplyBlog/public/articleImages/**".<br>

I decided on this way of organizing because it is like organizing a homework folder.

## 4) REDEPLOYMENT
Repeat this step with every change. Every time you add or delete an article, change blog header, change the theme or change the footer you will update your **master** by commiting and pushing the changes and then redoploy the page.<br>
This two-step process with pushing and deploying keeps your source code (on master branch) and your deployed build (on gh-pages branch) separate, which is the standard practice for GitHub Pages deployments.

First add your changes to the staging area.
```bash
 git add .

```
You can check the changes you made via the command below. It will precisely show what is being changed. 
```bash
 git status

```

This will commit your staging area. The stuff after **-m** is your commit **message**. You have to write a message and it is good practice to describe what you did in a short manner like "I added a new article" or "changed the theme"
```bash
 git commit -m "This will be my first re-deployment"

```
This will update your remote repo on github. If you didn't change it specifically the branch name should be master.
```bash
 git push origin master

```

And the final one. This will create a seperate branch on github with gh-pages using your master branch which will be what other people see. 
```bash
 npm run deploy
```
If you see the below result with the message "**Published**"", congrats! In 1-3 minutes you should be able to see the default template for simplyBlog. To see your URL go to "**Settings**" on your github repo and click on "**Pages**". When it is done on top there should be a URL like: https://[yourUserName].github.io/[yourRepoName]/

<p align="center">
  <img src="https://github.com/user-attachments/assets/c2f833a7-a4aa-44b2-8fd2-d1a1db0634d2" width="800" />
</p>

## Future Features

These are the features that I want to add in the future :P

>- Preset themes so you don't have to configure stuff from scratch.
>- PDF hosting
>- More text stylings
>- More font variety
>- A way to save your progress while writing an article so if you want to continue later it is an option

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

