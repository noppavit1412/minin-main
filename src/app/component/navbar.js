'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Function to check login status
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        // Initial check
        checkLoginStatus();

        // Optional: Add event listener to detect localStorage changes
        window.addEventListener('storage', checkLoginStatus);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className="navbar" style={navbarStyle}>
            <div className="container-fluid">
                <Link href="/" className="navbar-brand" style={brandStyle}>Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={navListStyle}>
                        <li className="nav-item">
                            <Link href="/" className="nav-link" style={linkStyle}>Tem</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className="nav-link" style={linkStyle}>Graph</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/service" className="nav-link" style={linkStyle}>Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" className="nav-link" style={linkStyle}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

const navbarStyle = {
    backgroundColor: '#fff',
    padding: '10px 20px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '1000',
};

const brandStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
};

const navListStyle = {
    display: 'flex',
    gap: '20px',
};

const linkStyle = {
    fontSize: '1rem',
    color: '#333',
    textDecoration: 'none',
    padding: '5px 10px',
    transition: 'color 0.2s ease-in-out',
};

linkStyle[':hover'] = {
    color: '#007bff',
};
