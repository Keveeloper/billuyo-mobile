import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import LoginComponent from '../components/login/Login';
import { User } from 'firebase/auth'; // Importamos el tipo User

// const LoginPage: React.FC = () => {
const LoginPage = () => {
  const router = useIonRouter();

  // Función que se llama cuando el login de Firebase es exitoso
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido al Agente Financiero</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        {/* Usamos el componente de Login y le pasamos la función de éxito */}
        <LoginComponent onLoginSuccess={handleLoginSuccess} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
