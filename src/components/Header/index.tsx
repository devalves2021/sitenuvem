import styles from './styles.module.scss'
import Link from 'next/link'
import {FiLogOut } from 'react-icons/fi'
import {AuthContext } from '../../contexts/AuthContext'
import { useContext} from 'react'
 

export function Header(){
    const { signOut } = useContext(AuthContext);
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                     <text style={{fontSize:'24px', color:'#FF3F4B', flex:1}}>Restaurante<text style={{fontSize:'24px', color:'#FFF'}}>Delivery</text></text>
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="/category">
                        <a>Categoria</a>
                    </Link>
                   
                    <Link href="/product">
                        <a>Cardapio</a>
                    </Link>
              
                 <button onClick={signOut} >
                     <FiLogOut color="#fff" size={24}/>
                 </button>
                </nav>
            </div>
        </header>
    )
}