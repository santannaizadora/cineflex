import './index.css';

const Footer = (props) => {
    const { poster, title, isSession, sessionName, sessionDay } = props
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-content-poster">
                    <img src={poster} alt={title} />
                </div>
                <div>
                    <h1 className="footer-content-title">{title}</h1>
                    <p>{isSession ? `${sessionDay} - ${sessionName}`: ''}</p>
                </div>
            </div>
        </footer>
    ) 
}

export default Footer;