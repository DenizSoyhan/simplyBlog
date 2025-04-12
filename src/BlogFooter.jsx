import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faInstagram, faLinkedin, faSquareXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'


import BlogFooterConfig from './FooterConfig'

function BlogFooter() {
  return (
    <div className="footerContainer">
      {BlogFooterConfig.personName ? <h3 id='creatorName'>{BlogFooterConfig.personName}</h3> : ""}

      {BlogFooterConfig.contact ? <h4 id='creatorContact'>{BlogFooterConfig.contact}</h4> : ""}

      <div className='seperator'></div>



      <div className="logoContainer">

        {BlogFooterConfig.insta ? (
          <div id='instaContainer'>
            <a href={BlogFooterConfig.insta} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faInstagram} />
            </a>
          </div>
        ) : <div id='instaContainer' className='hide'>
          <a href={BlogFooterConfig.insta} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='icon' icon={faInstagram} />
          </a>
        </div>}

        {BlogFooterConfig.github ? (
          <div id='githubContainer'>
            <a href={BlogFooterConfig.github} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faGithub} />
            </a>
          </div>
        ) : <div id='githubContainer' className='hide'>
          <a href={BlogFooterConfig.github} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='icon' icon={faGithub} />
          </a>
        </div>}

        {BlogFooterConfig.twitter ? (
          <div id='twitterContainer'>
            <a href={BlogFooterConfig.twitter} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faSquareXTwitter} />
            </a>
          </div>
        ) : <div id='twitterContainer' className='hide'>
          <a href={BlogFooterConfig.twitter} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='icon' icon={faSquareXTwitter} />
          </a>
        </div>}

        {BlogFooterConfig.linkedin ? (
          <div id='linkedinContainer'>
            <a href={BlogFooterConfig.linkedin} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faLinkedin} />
            </a>
          </div>
        ) : <div id='linkedinContainer' className='hide'>
          <a href={BlogFooterConfig.linkedin} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='icon' icon={faLinkedin} />
          </a>
        </div>}

        {BlogFooterConfig.facebook ? (
          <div id='facebookContainer'>
            <a href={BlogFooterConfig.facebook} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faFacebook} />
            </a>
          </div>
        ) : <div id='facebookContainer' className='hide'>
          <a href={BlogFooterConfig.facebook} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='icon' icon={faFacebook} />
          </a>
        </div>}

        {BlogFooterConfig.pWebsite ? (
          <div id='websiteContainer'>
            <a href={BlogFooterConfig.pWebsite} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faGlobe} />
            </a>
          </div>
        ) :
          <div id='websiteContainer' className='hide'>
            <a href={BlogFooterConfig.pWebsite} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faGlobe} />
            </a>
          </div>}

        {BlogFooterConfig.youtube ? (
          <div id='youtubeContainer'>
            <a href={BlogFooterConfig.youtube} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon className='icon' icon={faYoutube} />
            </a>
          </div>
        ) : <div id='youtubeContainer' className='hide'>
          <a href={BlogFooterConfig.youtube} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className='icon' icon={faYoutube} />
          </a>
        </div>}

      </div>
    </div>
  )
}

export default BlogFooter