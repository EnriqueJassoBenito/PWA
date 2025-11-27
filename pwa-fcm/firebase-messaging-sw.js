// Importamos las versiones compat de Firebase para SW
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// Configuración igual que en app.js
firebase.initializeApp({
  apiKey: "AIzaSyDjgZwwfsCNKR5YbDD50UgE9qLoqVqLj9A",
  authDomain: "test-login3-3e77d.firebaseapp.com",
  projectId: "test-login3-3e77d",
  storageBucket: "test-login3-3e77d.firebasestorage.app",
  messagingSenderId: "447482014567",
  appId: "1:447482014567:web:791d099e2a5f3467a49dc2",
  measurementId: "G-1HB59WGH4J"
});

const messaging = firebase.messaging();

// Evento cuando llega un mensaje en segundo plano
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Notificación";
  const options = {
    body: payload.notification?.body || "",
    icon: "/icon-192.png"
  };
  self.registration.showNotification(title, options);
});

// Manejar clics en la notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});