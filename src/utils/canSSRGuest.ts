import { GetServerSideProps,GetServerSidePropsContext,GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

//função para paginas que só pode ser acessadas por visitantes

export function canSSRGuest<p>(fn: GetServerSideProps<p>){
    return async(context: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<p>> => {
            const cookies = parseCookies(context);
       // se o cara tentar acessar a pagina poremtendo já um login salvo redirecionarmos
       if(cookies['@nextauth.token']){
           return{
               redirect:{
                destination: '/dashboard',
                permanent: false,
               }
           }
       }     
        return await fn(context);
    }
}