import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC7BotvuDlGQ2G5joszklhbX5FJvUFylWQ",
  authDomain: "moblieprogramming-e339c.firebaseapp.com",
  projectId: "moblieprogramming-e339c",
  storageBucket: "moblieprogramming-e339c.appspot.com",
  messagingSenderId: "617021997768",
  appId: "1:617021997768:android:5f81cef6abfae21c019bfd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;