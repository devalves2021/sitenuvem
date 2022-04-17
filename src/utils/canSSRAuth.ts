import { GetServerSideProps,GetServerSidePropsContext,GetServerSidePropsResult } from 'next'
import { parseCookies ,destroyCookie  } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError';

//função para paginas que só pode ser acessadas usuarios logados

export function canSSRAuth<p>(fn: GetServerSideProps<p>){
    return async(context: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<p>> => {
            const cookies = parseCookies(context);
       // se o cara tentar acessar a pagina poremtendo já um login salvo redirecionarmos
        const token = cookies['@nextauth.token'];
        if (!token){
            return{
                redirect:{
                    destination:'/',
                    permanent: false
                }     
            }
        }
       try{
        return await fn(context);
       }catch(err){
           if(err instanceof AuthTokenError ){
               destroyCookie(context,'nextauth.token');
            return{
                redirect:{
                    destination:'/',
                    permanent: false
                }
            }

         }
       }
        
    }
}