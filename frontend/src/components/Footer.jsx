import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#f8f8f8] text-gray-600 py-8">
            <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center">
                {/* Logo and Copyright */}
                <div className="flex flex-col items-start w-1/4">
                    <div className="mb-4">
                        {/* Replace with your logo */}
                        <div className="w-8 h-8 bg-black rounded-full"></div>
                    </div>
                    <p className="text-sm">
                        © 2025 CultureExchange, Inc. <br /> All rights reserved.
                    </p>
                </div>

                {/* Links Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 lg:mt-0">
                    {/* Explore */}
                    <div className='flex flex-col items-start'>
                        <h4 className="font-semibold mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-gray-900">Home</a></li>
                            <li><a href="/about" className="hover:text-gray-900">About</a></li>
                            <li><a href="/products" className="hover:text-gray-900">Products</a></li>
                            <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className='flex flex-col items-start'>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li><a href="/faq" className="hover:text-gray-900">FAQ</a></li>
                            <li><a href="/careers" className="hover:text-gray-900">Careers</a></li>
                            <li><a href="/sustainability" className="hover:text-gray-900">Sustainability</a></li>
                            <li><a href="/support" className="hover:text-gray-900">Support</a></li>
                        </ul>
                    </div>

                    {/* Follow */}
                    <div calssName="flex flex-col items-start">
                        <h4 className="font-semibold mb-4">Follow</h4>
                        <ul className="flex space-x-4">
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="text-gray-600 hover:text-gray-900" size={20} />
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="text-gray-600 hover:text-gray-900" size={20} />
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="text-gray-600 hover:text-gray-900" size={20} />
                                </a>
                            </li>
                            <li>
                                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                                    <FaPinterest className="text-gray-600 hover:text-gray-900" size={20} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
