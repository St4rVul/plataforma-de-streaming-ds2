import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  // Aquí deberás agregar tu configuración de Firebase
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthProps {
  onAuthChange: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      onAuthChange(user);
    });

    return () => unsubscribe();
  }, [onAuthChange]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error de autenticación con Google:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error de autenticación con Facebook:", error);
    }
  };

  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error de autenticación con Apple:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignUp ? "Registro" : "Inicio de Sesión"}
      </h2>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isSignUp ? "Registrarse" : "Iniciar Sesión"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Continuar con Google
        </button>
        <button
          onClick={handleFacebookSignIn}
          className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-900"
        >
          Continuar con Facebook
        </button>
        <button
          onClick={handleAppleSignIn}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Continuar con Apple
        </button>
      </div>

      <p className="mt-4 text-center">
        {isSignUp ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:underline"
        >
          {isSignUp ? "Iniciar Sesión" : "Registrarse"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
