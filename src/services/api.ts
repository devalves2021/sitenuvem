import { AuthContext } from '../contexts/AuthContext';
import axios , {AxiosError} from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from "./errors/AuthTokenError";
 import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx=undefined) {
  let cookies = parseCookies(ctx);
 
  const api = axios.create({
  baseURL: 'https://pris.ly/d/cpzdohmpdceteg:2123092ee41e9a99ebeaa9774c2ed7032dcfdee415a75aca457793161793ba5c@ec2-34-207-12-160.compute-1.amazonaws.com:5432/d7mtnpj6h1mmnb',
  headers: {
    Authorization:`Bearer ${cookies['@nextauth.token']}`
  }
 })
  api.interceptors.response.use(response => {
      return response;
    },(error: AxiosError) => {
       if(error.response.status === 401){
        //qualquer erro 401(não autorizado) devemos deslogar o usuario
        if(typeof window !== undefined){
         // chamar a função para deslogar o usuario
          signOut();
        }else{
         return Promise.reject(new AuthTokenError())
        }
       }
    return Promise.reject(error);
  })
   return api;
}
