export default function Footer() {
    return (
        <footer className="footer" style={footerStyle}>
            <div className="container">
                <div className="column">
                    <h5>About Us</h5>
                    <p>Commodo magna adipisicing dolor enim do reprehenderit excepteur occaecat. Consequat 
                        mollit commodo aliqua ad incididunt Lorem pariatur. Tempor adipisicing exercitation 
                        magna adipisicing voluptate do tempor nisi qui cillum do do fugiat officia.</p>
                </div>
            </div>
            <div className="copyright">
                © 2024 Company Name. All rights reserved.
            </div>
        </footer>
    );
}

const footerStyle = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff', // Adjust to your desired background color
    zIndex: '1000', // Ensure it stays on top of other content
    padding: '10px 0',
};
