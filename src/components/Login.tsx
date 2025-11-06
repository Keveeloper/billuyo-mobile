import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonGrid, IonRow, IonCol, IonNote, IonIcon, IonSpinner } from '@ionic/react';
import { logoGoogle, logIn } from 'ionicons/icons';

// Importaciones de Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase-config/firebaseConfig';

// Inicializamos Firebase fuera del componente para evitar reinicializaciones
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface ContainerProps {
  onLoginSuccess: (user: User, idToken: string) => void;
}

const LoginComponent: React.FC<ContainerProps> = ({ onLoginSuccess }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Función de inicio de sesión con Google
  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      // 1. Iniciar sesión con pop-up de Google
      const result = await signInWithPopup(auth, googleProvider);
      
      // 2. Obtener el Token de ID (JWT) de Firebase
      // ESTO ES CRÍTICO: Este token se usará para autenticar en NestJS.
      const idToken = await result.user.getIdToken();

      console.log('Login con Google exitoso. ID Token:', idToken);
      
      // 3. Notificar éxito al componente padre (LoginPage)
      onLoginSuccess(result.user, idToken);

    } catch (e: any) {
      console.error('Error durante el inicio de sesión con Google:', e);
      // Firebase maneja errores como "pop-up cerrado por el usuario"
      if (e.code === 'auth/popup-closed-by-user') {
          setError('Proceso de inicio de sesión cancelado.');
      } else {
          setError('Error al iniciar sesión con Google. Intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonGrid fixed>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" size-md="6" size-lg="4">
          <h2 className="ion-text-center ion-padding-vertical">
            Inicia Sesión en tu Agente Financiero
          </h2>
          
          {error && (
            <IonNote color="danger" className="ion-padding-start ion-padding-bottom">
              {error}
            </IonNote>
          )}

          <div className="ion-padding-top">
            <IonButton 
              expand="block" 
              onClick={handleGoogleLogin} 
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <IonSpinner name="crescent" />
              ) : (
                <>
                  <IonIcon icon={logoGoogle} slot="start" />
                  Ingresar con Google
                </>
              )}
            </IonButton>
          </div>
          
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoginComponent;
