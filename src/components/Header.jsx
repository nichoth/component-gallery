import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle, menuLinks }) => (
  <header className="pt-4 pb-2 xl:pb-4">
    <div className="container xl:flex xl:justify-between xl:items-center">
      <Link
        to="/"
        className="table text-4xl font-light italic text-white font-sans bg-grey-800 uppercase leading-none pt-2 px-2 hover:text-teal-500 sm:mx-auto border-0 xl:text-left xl:whitespace-no-wrap xl:mx-0"
      >
        {siteTitle}
      </Link>

      <nav>
        <ul className="flex flex-wrap sm:justify-center -mx-4 mt-2 lg:mt-0">
          {menuLinks.map(link => (
            <li key={link.name} className="mx-4 my-2">
              <Link
                to={link.link}
                className="whitespace-no-wrap font-sans xlg:text-sm border-0"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
