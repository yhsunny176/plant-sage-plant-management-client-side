import React from 'react';
import { Link } from 'react-router';
import { useTheme } from '@/hooks/useTheme';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const { theme } = useTheme();

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Plants', path: '/all-plants' },
    { name: 'Add Plants', path: '/add-plant' },
    { name: 'My Plants', path: '/my-plants' },
    { name: 'Care Tips', path: '/care-tips' }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: FaFacebookF,
      url: 'https://facebook.com/plantsage'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/plantsage'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://instagram.com/plantsage'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinIn,
      url: 'https://linkedin.com/company/plantsage'
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      url: 'https://youtube.com/@plantsage'
    }
  ];

  return (
    <footer className="bg-footer-background text-white-base">
      <div className="container mx-auto px-4 py-12 max-w-10/12 xl:max-w-6xl 2xl:max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Section 1: Logo and Description */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <img
                  src={theme === "light" ? "/logo-primary.png" : "/logo-darkmode.png"}
                  alt="Plant Sage Logo"
                  className="h-12 w-auto mb-4"
                />
              </Link>
            </div>
            <p className="text-white-base/80 text-base leading-relaxed mb-6">
              Plant Sage is your ultimate companion for plant care and gardening.
              Discover, grow, and nurture your green friends with expert guidance
              and a passionate community of plant lovers.
            </p>
            <div className="flex items-center space-x-1 text-base text-white-base/70">
              <span>© 2024 Plant Sage.</span>
              <span>All rights reserved.</span>
            </div>
          </div>

          {/* Section 2: Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white-base mb-6">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-white-base/80 hover:text-white-base text-base transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Section 3: Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white-base mb-6">
              Contact & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-white-base/70 mt-1 flex-shrink-0" size={14} />
                <div>
                  <p className="text-base text-white-base/80 mb-1">Email Us</p>
                  <a
                    href="mailto:support@plantsage.com"
                    className="text-base text-white-base hover:text-white-base/80 transition-colors duration-300"
                  >
                    support@plantsage.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaPhone className="text-white-base/70 mt-1 flex-shrink-0" size={14} />
                <div>
                  <p className="text-base text-white-base/80 mb-1">Call Us</p>
                  <a
                    href="tel:+1234567890"
                    className="text-base text-white-base hover:text-white-base/80 transition-colors duration-300"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-white-base/70 mt-1 flex-shrink-0" size={14} />
                <div>
                  <p className="text-base text-white-base/80 mb-1">Visit Us</p>
                  <p className="text-base text-white-base/70">
                    123 Garden Street<br />
                    Green City, GC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Social Media Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white-base mb-6">
              Follow Us
            </h3>
            <p className="text-base text-white-base/80 mb-6">
              Stay connected with our plant community and get the latest tips,
              updates, and inspiration.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-white-base/10 hover:bg-white-base/20 text-white-base hover:text-heading-primary rounded-full transition-colors duration-300"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <IconComponent size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-white-base/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-6 text-base text-white-base/70">
              <Link to="/privacy" className="hover:text-white-base transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white-base transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white-base transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
            <div className="text-base text-white-base/70">
              Made with love by Plant Sage Team
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;