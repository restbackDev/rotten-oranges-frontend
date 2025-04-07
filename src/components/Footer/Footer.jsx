import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; {new Date().getFullYear()} Rotten Oranges. Gnale Kourouma, Jason Almero, and Michelle Tan. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;