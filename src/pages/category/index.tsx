import { canSSRAuth} from '../../utils/canSSRAuth'
import Head from 'next/head'
import {Header} from '../../components/Header'
import styles from './styles.module.scss'
import { useState, FormEvent } from 'react'
import {AuthContext } from '../../contexts/AuthContext'
import { useContext} from 'react'
import { toast } from "react-toastify";


export default function Category(){
  const [name, setName] = useState('');
  const {AddCategory} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
    
  
  async function handleRegister(event:FormEvent) {
    event.preventDefault();
     if(name === '' ){
          toast.error("Preenchimento obrigatório.")
       return;
     }
     setLoading(true);

     let data={
      name
    }

    await AddCategory(data);

     setLoading(false);

  }
  
  
  return(
  <>
    <Head>
       <title>Nova Categoria - Restaurante Delivery</title>
    </Head>
    <div>
       <Header/>
      <main className={styles.container}>
        <h1>Cadastrar Categoria</h1>
        <form className={styles.form} onSubmit={handleRegister} >
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
            <button type="submit" className={styles.buttonAdd} >
               Cadastrar
            </button>
        </form>
      </main>
    </div>
  </>
 )
}
export const getServerSideProps = canSSRAuth(async(context) =>{
  return{
    props:{}
  }
})
