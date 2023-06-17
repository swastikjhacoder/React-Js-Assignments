import styles from '../misc/Page404.css';
import { useLocation, useNavigate } from "react-router-dom";

function ErrorPage(){
    const location = useLocation();
    const navigate = useNavigate();

    return(
        <>
            <div className={styles.errorPage}>
                <h1>Oops! Something went Wrong.</h1>
                <h2>Page Not Found</h2>
                <h4>
                    The page <code>{location.pathname}</code> does not exist.
                </h4>
                <button
                    onClick={() => {
                    navigate("/");
                    }}>
                    Go to Home
                </button>
            </div>
        </>
    );
}

export default ErrorPage;