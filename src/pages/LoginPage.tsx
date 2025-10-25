import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginComponent from '../components/Login';
import { useHistory } from 'react-router';

const LoginPage: React.FC = () => {
  const history = useHistory();

  // Función que se llama cuando el login es exitoso
  const handleLoginSuccess = () => {
    // Aquí puedes guardar el token de autenticación si lo tienes

    // Redirige al usuario a la página principal de la aplicación (por ejemplo, /tabs/tab1)
    history.replace('/folder/Inbox'); 
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {/* Usamos el componente de Login y le pasamos la función de éxito */}
        <LoginComponent onLoginSuccess={handleLoginSuccess} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;