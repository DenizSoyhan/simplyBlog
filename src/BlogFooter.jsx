import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faInstagram, faLinkedin, faSquareXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

function BlogFooter(){
  return(
    <div className="footerContainer">
      <h3>Oğul Deniz Soyhan</h3>
      <div className='seperator'></div>
      <div className="logoContainer">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='icon' icon={faInstagram} />
        </a>
        <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='icon' icon={faGithub} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='icon' icon={faSquareXTwitter} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='icon' icon={faLinkedin} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='icon' icon={faFacebook} />
        </a>
        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='icon' icon={faGlobe} />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='icon' icon={faYoutube} />
        </a>
      </div>
    </div>
  )
}

export default BlogFooter