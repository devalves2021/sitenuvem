import { useState, ChangeEvent, HTMLInputTypeAttribute , FormEvent } from 'react'
import { canSSRAuth} from '../../utils/canSSRAuth'
import Head from 'next/head'
import {Header} from '../../components/Header'
import styles from './styles.module.scss'
import { FiUpload } from 'react-icons/fi'
import {setupAPIClient } from '../../services/api'
import {toast} from 'react-toastify'


type ItemProps ={
  id:string;
  name:string;
}
interface CategoryProps{
  categoryList: ItemProps[];
}



export default function Product({categoryList}:CategoryProps){
   //console.log(categoryList);

  const[avatarUrl , setAvatarUrl]  = useState('');
  const [imgAvatar, setImgAvatar]  = useState(null);
 
  const [ categories, setCategories ] = useState(categoryList || [])
  const [categorySelected, setCategorySelected]  = useState(0)

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');


  function handleFile(event:ChangeEvent<HTMLInputElement>){
      if(!event.target.files){
        return;
      }

      const image = event.target.files[0];

      if(!image){
        return;
      }
      if(image.type === 'image/jpeg'  || image.type === 'image/png'){
         setImgAvatar(image);
         setAvatarUrl(URL.createObjectURL(event.target.files[0]))
      }
      //seelcionando uma nova categorya na lista
   

  }


  function handleChangeCategory(event){
    //console.log("POSIÇÃO DA CATEGORIA SELECIONADA", event.target.value)
    //console.log('Categoria selecionada', categories[event.target.value])
    setCategorySelected(event.target.value)

  }  
  
  
   async function handleRegister(event : FormEvent){
     event.preventDefault();
     try {

      const data = new FormData();
      if(name === '' || price === '' || description === '' || imgAvatar === null){
       toast.error('Os campos são obrigatórios seu preenchimento!')
        return;
      }

      data.append('name' , name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id',categories[categorySelected].id);
      data.append('file', imgAvatar);

      const apiClient = setupAPIClient();
      await apiClient.post('/product',data);
      
      toast.success('Dados cadastrados com sucesso!');

     } catch (err) {
       console.log(err);
       toast.error("Erro ao efetuar o cadastro!")
     }

     setName('');
     setPrice('');
     setDescription('');
     setImgAvatar(null);
     setAvatarUrl('');

  }
  return(
  <>
    <Head>
       <title>Novo produto - Restaurante Delivery</title>
    </Head>
    <div>
       <Header/>
      <main className={styles.container}>
        <h1>Novo produto</h1>
        <form className={styles.form} onSubmit={handleRegister} >
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload color='#fff' size={24}/>
              </span>

              <input type="file" accept='image/png, image/jpeg' onChange={handleFile} />
              
                {avatarUrl &&(
                    <img 
                    className={styles.preview}
                    src={avatarUrl} 
                    alt="Foto dos produtos" 
                    width={250}
                    height={250}
                    />
                )}

            </label>
          <select value={categorySelected} onChange={handleChangeCategory}>
            {categories.map((item, index)=>{
                return(
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
            })}
          </select>
          <input
           type="text"
            placeholder='Digite o nome do produto'
            className={styles.input}
            value={name}
            onChange={(event)=> setName(event.target.value)}
           />
          <input
           type="text"
            placeholder='Digite o preço do produto'
            className={styles.input}
            value={price}
             onChange={(event)=>setPrice(event.target.value)} 
            />
            <textarea 
              placeholder='Descreva seu produto...'
              className={styles.input}
              value={description}
              onChange={(event)=>setDescription(event.target.value)}
            />
            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>
        </form>
      </main>
    </div>
  </>
 )
}
export const getServerSideProps = canSSRAuth(async(context) =>{
  const apliClient = setupAPIClient(context)
  const response = await apliClient.get('/category');
 // console.log(response.data);

  return{
    props:{
      categoryList: response.data
    }
  }
})
