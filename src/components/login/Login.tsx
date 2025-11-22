import { useState } from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonSpinner } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseError, initializeApp } from 'firebase/app';
import { ContainerProps, GoogleLoginResponse } from './types/types';
import firebaseConfig from '../../firebase-config/firebaseConfig';

import api from '../../services/axios-instance/api';
import axios, { AxiosError } from 'axios';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const LoginComponent = (props: ContainerProps) => {

  const { onLoginSuccess } = props;
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      const firebaseIdToken = await result.user.getIdToken();

      console.log('Login con Google exitoso. ID Token:', firebaseIdToken);

      const response = await api.post<GoogleLoginResponse>('/auth/google/login', {}, {
        headers: {
          'Authorization': `Bearer ${firebaseIdToken}`, 
        },
      });

      console.log('response: ', response);
      
      onLoginSuccess(result.user, firebaseIdToken);

    } catch (e: unknown) {
      console.error('Error durante el inicio de sesión con Google:', e);
      // --- Manejo de errores de Firebase ---
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/popup-closed-by-user') {
          setError('Proceso de inicio de sesión cancelado.');
        } else {
          setError(`Error de Firebase: ${e.message}`);
        }
        return; // Salir del catch
      }

      // --- Manejo de errores de Axios (Errores HTTP del Backend) ---
      // Usamos type guards de Axios para verificar si es un error HTTP
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;
        if (axiosError.response) {
          // El backend respondió con un estado fuera de 2xx (ej. 401 Unauthorized)
          const errorMessage = axiosError.message || `Error del Servidor (${axiosError.response.status}).`;
          setError(errorMessage);
          return;
        }
      }

      // --- Error Desconocido ---
      setError('Ocurrió un error inesperado. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='absolute pt-18 w-[90%] h-1/3 flex flex-col bottom-0 left-[5%]'>
      <p className='mb-5 text-gray-50 text-base text-center font-[Montserrat]'>¡Pongamos orden a tus finanzas ahora mismo!</p>
      <IonButton        
        fill="clear" 
        expand="block"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="
          h-11 rounded-full 
          bg-white/5
          normal-case 
          border-t-2 border-t-white/10
          border-b-2 border-b-white/10
          backdrop-blur-md
          text-white
        "
      >
        {isLoading ? 
          (
            <IonSpinner name="crescent" className="text-white" />
          ) 
        : 
          (
            <div className="flex items-center justify-center w-full gap-3 text-base font-medium tracking-wide">              
              <IonIcon icon={logoGoogle} className="text-xl" />
              <span>Iniciar sesión con Google</span>
            </div>
          )
        }
      </IonButton>
    </div>
    // <IonGrid fixed>
    //   <IonRow className="ion-justify-content-center">
    //     <IonCol size="12" size-md="6" size-lg="4">
    //       <h2 className="ion-text-center ion-padding-vertical">
    //         Inicia Sesión en tu Agente Financiero
    //       </h2>
          
    //       {error && (
    //         <IonNote color="danger" className="ion-padding-start ion-padding-bottom">
    //           {error}
    //         </IonNote>
    //       )}

    //       <div className="ion-padding-top">
    //         <IonButton 
    //           expand="block" 
    //           onClick={handleGoogleLogin} 
    //           color="primary"
    //           disabled={isLoading}
    //         >
    //           {isLoading ? (
    //             <IonSpinner name="crescent" />
    //           ) : (
    //             <>
    //               <IonIcon icon={logoGoogle} slot="start" />
    //               Ingresar con Google
    //             </>
    //           )}
    //         </IonButton>
    //       </div>
          
    //     </IonCol>
    //   </IonRow>
    // </IonGrid>
  );
};

export default LoginComponent;
