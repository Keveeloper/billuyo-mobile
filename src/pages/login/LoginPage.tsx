import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import LoginComponent from '../../components/login/Login';
import { User } from 'firebase/auth';
import './LoginPage.scss';

/**
 * Descripción:   Página de Login que utiliza el componente de LoginComponent.
 *                Maneja la autenticación y redirección tras el login exitoso.
 * Created by:    Kevind Ospina
 * Created at:    2025-10-20
 * Last modified: 2025-11-20
 */
const LoginPage = () => {
  const router = useIonRouter();

  const handleLoginSuccess = (user: User, idToken: string) => {
    // 1. Aquí se guardaría el token de autenticación (NestJS JWT)
    //    Por ahora, guardamos el token de Firebase para simular.
    localStorage.setItem('firebaseIdToken', idToken);
    
    // NOTA: EL PRÓXIMO PASO LÓGICO ES ENVIAR ESTE idToken AL BACKEND DE NESTJS
    // para que NestJS lo verifique y devuelva su propio token JWT.

    console.log(`Usuario autenticado: ${user.email}. Redirigiendo...`);

    // 2. Redirige al usuario a la página principal de la aplicación
    router.push('/folder/Inbox', 'root', 'replace');
  };

  return (
    <IonPage>
      <IonContent className='aurora-bg' scrollY={false}>
        <img className='billuyo-logo' src="/billuyo-logo.png" alt="" />
        <div className='absolute w-1/2 top-[30%]'>
          <p className='text-sm font-[Poppins]'>Asistente de</p>
          <p className='text-gray-50 text-base font-[Montserrat]'>Finanzas personales</p>
        </div>
        <div className='absolute w-[140px] top-[52%] right-[5%]'>
          <p className='text-sm font-[Poppins]'>Control total</p>
          <p className='text-gray-50 text-base font-[Montserrat]'>solo con prompts</p>
        </div>
        <LoginComponent onLoginSuccess={handleLoginSuccess} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
