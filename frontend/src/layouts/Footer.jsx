import { NavLink } from 'react-router-dom';
import footerLogo from '../assets/CinelogLogoFooter.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="page">
        <div className="logo-wrap">
          <img src={footerLogo} alt="logo" />
        </div>
        <div className="link-wrap">
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
