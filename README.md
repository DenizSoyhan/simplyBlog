<p align="center">
<img src="https://github.com/user-attachments/assets/c08ce960-d2a3-4465-9e1d-63166379b66e" width="700" />
</p><br>

This is a blog maker template repository that I made. You can see the template and some article examples [here](https://denizsoyhan.github.io/simplyBlog/).<br><br>  If you need a space to share your ideas without the hassle of watermarks and paywalls. You can customize it to your heart's content and add articles with an intuitive article generator! This project is the result of "Oh I can just my own version real quick!" delusion that all of us fall into. I hope it helps you!

## Contents of ReadMe:<br>
- [Features](#features)<br>
- [How To Install](#how-to-install)<br>
- [How To Use](#how-to-use)<br>

# FEATURES
- ## Home Page
Default Home page looks like the image below. No worries you can make your own theme!
<p align="center">
<img src="https://github.com/user-attachments/assets/fc98bb1e-c1fb-4b67-8a87-fbbd8297405b" width="800" />
</p>

#### -Blog Header<br>
Your blog will have your desired blog header with your desired name, alt title such as "Never Been Simpler" or you can remove the alt title completely and it's own color scheme.

#### -Articles
The articles are sorted in a very intuitive way. The **./simplyBlog/src/pages/articles** directory consists of your articles. In this directory the articles named in this manner:
  - **P-Pinned_Article.jsx**<br>
  - **12-Article_Name.jsx**
  - **13-Second_Article.jsx**
  - **U-Invisible_Article.jsx**<br><br>
- *Number* prefixes decides which article will be shown closer to the top. Bigger the number higher the priority. In this case _13-Second_Article.jsx_ will be on top of __12-Article_Name.jsx__.
- The **P-Pinned_Article.jsx** will be pinned to the top of the page and has a higher priority than **13-Second_Article.jsx** and  **12-Article_Name.jsx**. If you want your readers to see an article first use this prefix!
- **U-Invisible_Article.jsx** will not be shown on the Home Page and only people with the direct link to the article will be able to see them.
#### -Footer<br>
You can put your name, contact e-mail adress, and all your socials (Instagram, GitHub, Twitter, LinkedIn, Facebook, Youtube, Personal Website) if you want to. 

- ## Article Content
You can implement **bold**, *italic*, <ins>underlined</ins> stylings, a special component called quote that you can see below, images and Youtube videos with time stamps.
<p align="center">
<img src="https://github.com/user-attachments/assets/eb43d444-02b4-4cd7-8634-f95188cda1cd" width="800" />
</p>

- ## Customizer
You will have access to a customizer on dev mode where you can decide on a theme, what font to use, name and alt title of your blog, all the footer content that we talked about in the Home Page section.
<p align="center">
<img src="https://github.com/user-attachments/assets/bbb275da-938f-4e34-b25f-482cba03a609" width="500" />
  <img src="https://github.com/user-attachments/assets/9c9934be-122d-4bdd-ba17-f690beca9fdb" width="500" />
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



# HOW TO USE
