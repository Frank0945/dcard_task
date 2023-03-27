import { serverService } from '@/services/serverService';
import styles from '@/styles/components/Navbar.module.css'
import Link from 'next/link';
import { signOut } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'

export default function Navbar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const q = router.query.order as string;
        if (q) setSearchQuery(q);
    }, [router.query.q]);

    const handleSearchQueryChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e: any) => {
        if (e.key == 'Enter') handleSearch();
    }

    const handleSearch = () => {
        const queryParams = new URLSearchParams(location.search);

        if (searchQuery.trim()) {
            queryParams.set('q', searchQuery.trim());
        }
        router.push('/?' + queryParams.toString());
    };

    const handleClear = () => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete('q');
        router.push('/?' + queryParams.toString());
        setSearchQuery('');
    };

    return (
        <nav className={"navbar fixed-top bg-light " + styles.navbar}>
            <div className="container-xxl">
                <Link className="navbar-brand" href="/">
                    <Image src="/task_logo.svg" alt="task_logo" width={110} height={41.43} />
                </Link>
                <div className={"input-group " + styles.inputBox}>
                    <input onKeyDown={handleKeyDown} onChange={handleSearchQueryChange} value={searchQuery} className={"form-control " + styles.searchInput} type="text" placeholder="Search" aria-label="Example text with two button addons" />
                    {searchQuery &&
                        <button onClick={handleClear} className={"btn btn-primary " + styles.clear} type="button">
                            <i className="bi bi-x-lg"></i>
                        </button>
                    }
                    <button onClick={handleSearch} className={"btn btn-primary " + styles.search} type="button">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className={"nav-link dropdown-toggle " + styles.dropdownToggle} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className={styles.userPic} src={serverService.user.getUser().picture} />
                        </a>
                        <ul className={"dropdown-menu dropdown-menu-end " + styles.dropdownMenu}>
                            <li><h6 className="dropdown-header">Hi <b>{serverService.user.getUser().name}</b>!</h6></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item" onClick={() => signOut()}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
        </nav >
    );
}