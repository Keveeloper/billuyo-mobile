import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonGrid, IonRow, IonCol, IonNote } from '@ionic/react';

interface ContainerProps {
  onLoginSuccess: () => void;
}

const LoginComponent: React.FC<ContainerProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError(''); // Limpiar errores anteriores

    // Lógica de validación simple (puedes reemplazarla con una llamada a una API real)
    if (email === 'test@ionic.com' && password === 'password') {
      console.log('Login exitoso!');
      onLoginSuccess(); // Llama a la función que redirigirá al Home
    } else {
      setError('Email o contraseña incorrectos. Usa: test@ionic.com / password');
    }
  };

  return (
    <IonGrid fixed>
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" size-md="6" size-lg="4">
          <IonList lines="full" className="ion-padding-top">
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput 
                type="email" 
                value={email} 
                onIonChange={(e) => setEmail(e.detail.value!)} 
                required 
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput 
                type="password" 
                value={password} 
                onIonChange={(e) => setPassword(e.detail.value!)} 
                required 
              />
            </IonItem>
          </IonList>

          {error && (
            <IonNote color="danger" className="ion-padding-start">
              {error}
            </IonNote>
          )}

          <div className="ion-padding">
            <IonButton expand="block" onClick={handleLogin}>
              Ingresar
            </IonButton>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoginComponent;