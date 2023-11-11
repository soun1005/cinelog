import { NavLink } from 'react-router-dom';
import footerLogo from '../assets/CinelogLogoFooter.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrap page">
        <div className="footer-wrap__logo-wrap">
          <img src={footerLogo} alt="logo" />
        </div>
        <div className="footer-wrap link-wrap">
          <NavLink to={'/'}>
            <span>CONTACT</span>
          </NavLink>
          <span>COPYRIGHT &copy;CINELOG</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
