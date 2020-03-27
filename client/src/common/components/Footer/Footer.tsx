import React from 'react';
import './Footer.scss';

const Footer = (): JSX.Element => (
    <footer>
        Copyright &copy;
        &nbsp;
        <a href="http://some-url.com">Our Company</a>
            &nbsp;&nbsp;
        {new Date().getFullYear()}
    </footer>
)

export default Footer;