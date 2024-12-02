// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCu4z3IFUKvzJHVldqyrIYpgT-IQzawrso",
authDomain: "marvel-app-6bd52.firebaseapp.com",
projectId: "marvel-app-6bd52",
storageBucket: "marvel-app-6bd52.firebasestorage.app",
messagingSenderId: "823750623787",
appId: "1:823750623787:web:2cbf772a95a4cca450a06e"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const registroForm = document.getElementById('registroForm')
registroForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.getElementById('correoRegistro').value;
    const password = document.getElementById('passwordRegistro').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        console.log('Usuario Registrado: ', user);
    })
    .catch((error) =>{
        console.error("No ha sido posible registrarse", error)
    })
});


const LoginForm = document.getElementById('LoginForm')
LoginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = document.getElementById('correoLogin').value;
    const password = document.getElementById('passwordLogin').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        console.log('El usuario ha iniciado sesion: ', user);
    })
    .catch((error) =>{
        console.error("No ha sido posible iniciar sesion", error)
    })
});


const logoutButton = document.getElementById('CerrarSesion');
logoutButton.addEventListener('click', () =>{
    signOut(auth)
        .then (() => {
            console.log("El usuario ha cerrado sesion")
    })
    .catch((error) =>{
        console.error("No ha sido posible cerrar sesion", error)
    })
});

onAuthStateChanged(auth, (user) =>{
    if (user){
        new Notification("Bienvenido a Marvel");
        document.getElementById("auth").style.display = "none";
        document.getElementById("content").style.display = "block";
    }else{
        new Notification("Debes iniciar sesion para no perderte de nada");
        document.getElementById("auth").style.display = "block";
        document.getElementById("content").style.display = "none";
    }
})