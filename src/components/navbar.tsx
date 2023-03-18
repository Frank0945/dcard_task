import { serverService } from '@/services/serverService';
import styles from '@/styles/components/Navbar.module.css'
import Link from 'next/link';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react'

export default function Navbar() {
    useEffect(() => {
        console.log(serverService.user.getUser().picture);
    }, []);
    return (
        <nav className={"navbar fixed-top bg-light " + styles.navbar}>
            <div className="container-xxl">
                <Link className="navbar-brand" href="/">
                    <img src="/task_logo.svg" alt="task_logo" width={110} />
                </Link>
                <div className={styles.inputBox}>
                    <input type="text" className={"form-control " + styles.searchInput} placeholder="Search" />
                </div>

                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className={"nav-link dropdown-toggle " + styles.dropdownToggle} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className={styles.userPic} src={serverService.user.getUser().picture} />
                        </a>
                        <ul className={"dropdown-menu dropdown-menu-end " + styles.dropdownMenu}>
                            <li><h6 className="dropdown-header">Hi <b>{serverService.getSession()?.user?.name}</b>!</h6></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={() => signOut()}>Sign out</button></li>
                        </ul>
                    </li>
                </ul>

            </div>
        </nav>
    );
}