import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMAwlNIPRijMg35_fVV5g4yeCJzeQrlX4",
  authDomain: "outofcollge.firebaseapp.com",
  projectId: "outofcollge",
  storageBucket: "outofcollge.appspot.com",
  messagingSenderId: "161672537009",
  appId: "1:161672537009:web:1256c7260e6ac2ae409390",
  measurementId: "G-1L91RB0PRY",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const saveImage = getStorage(app);
