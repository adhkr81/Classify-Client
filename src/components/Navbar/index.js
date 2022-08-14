import styles from "./style.module.css";


export function Navbar ({handleNav}) {

    return (

    <nav className={`navbar ${styles.bgBlue}`}>
        <ul className={`d-flex justify-content-between align-items-center m-1 ${styles.navItems}`} >
            <li className="nav-item">
                <span className={`${styles.logoFont}`}><button className={styles.buttonClear} id="classify" onClick={handleNav}>Classify</button></span>
            </li>
            <li className="nav-item">
                <div className={`container ${styles.textWhite}`}><button className={styles.buttonClear} id="about" onClick={handleNav}>About us</button></div> 
            </li>
            <li className="nav-item">
                <div className={`container ${styles.textWhite}`}><button className={styles.buttonClear} id="mission" onClick={handleNav}>Our mission</button></div> 
            </li>
            <li className="nav-item">
                <div className={`container ${styles.textWhite}`}><button className={styles.buttonClear} id="faq" onClick={handleNav}>FAQs</button></div> 
            </li>
            <li className="nav-item">
                <div className={`container ${styles.textWhite}`}><button className={styles.buttonClear} id="login" onClick={handleNav}>Login</button></div> 
            </li>
            <li className="nav-item">
            <button className={`btn btn-danger ${styles.button}`} id="create" onClick={handleNav}>Create an account</button>
            </li>
        </ul>
    </nav>
    
    )
}