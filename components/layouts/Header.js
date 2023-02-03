import Link from 'next/link';
import Logo from '../common/Logo';
import { useEffect } from 'react';
import ConnectWallet from './ConnectWallet';
import MobileMenu from './MobileMenu';

import { useMoralis } from 'react-moralis';

const Header = ({ headerSetting = {} }) => {

    const { enableWeb3, isWeb3Enabled, account } = useMoralis();

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        const header = document.querySelector('.uni-header-navbar');
        const scrollTop = window.scrollY;
        scrollTop >= 250 ? header.classList.add('uk-sticky-fixed') : header.classList.remove('uk-sticky-fixed');
    };
    return (
        <>

            <MobileMenu />
            <ConnectWallet />
            <header className="uni-header uk-position-top">
                <div className="uni-header-navbar" data-uk-sticky="top: 70; show-on-up: false; animation: uk-animation-slide-top" data-anime="opacity:[0, 1]; translateY:[-24, 0]; onview: true; delay: 0;">
                    <div className="uk-container">
                        <nav className="uk-navbar uk-navbar-container uk-navbar-transparent">
                            <div className="uk-navbar-top">
                                <div className="uk-navbar-left">
                                    <Link href="/" className="uk-logo uk-navbar-item uk-h4 uk-h3@m uk-margin-remove">
                                        <Logo />
                                    </Link>
                                </div>
                                <div className="uk-navbar-right uk-flex-1 uk-flex-right">
                                    <ul className="uk-navbar-nav dark:uk-text-gray-10 uk-visible@m" data-uk-scrollspy-nav="closest: li; scroll: true; offset: 80" data-uk-navbar-bound>
                                        <li><a href="#uni_collection">Collection</a></li>
                                        <li><a href="#uni_minting">Mint</a></li>
                                    </ul>
                                    <div className="uk-navbar-item">
                                        <ul className="uk-subnav uk-subnav-small uk-visible@m">
                                            <li>
                                                <Link href="https://twitter.com/CantoPals"><i className="uk-icon unicon-logo-twitter"></i></Link>
                                            </li>
                                        </ul>
                                        {isWeb3Enabled ?
                                            <a className="uk-button uk-button-medium@m uk-button-default uk-button-outline uk-margin-left uk-visible@l">
                                                <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
                                            </a> :
                                            <a onClick={() => enableWeb3()} className="uk-button uk-button-medium@m uk-button-default uk-button-outline uk-margin-left uk-visible@l">
                                                <span>Connect wallet</span>
                                            </a>
                                        }
                                    </div>

                                    <div className="uk-navbar-item uk-hidden@m">
                                        {isWeb3Enabled ?
                                            <a className="uk-button uk-button-medium@m uk-button-icon uk-hidden@m uk-margin-small-right">{`${account.slice(0, 3)}...${account.slice(-4)}`}</a> :
                                            <a onClick={() => enableWeb3()} className="uk-button uk-button-medium@m uk-button-icon uk-hidden@m uk-margin-small-right">
                                                <i className="uk-icon unicon-wallet"></i>
                                            </a>
                                        }
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};
export default Header;