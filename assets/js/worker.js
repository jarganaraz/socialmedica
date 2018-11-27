// Hard-coded, replace with your public key
const publicVapidKey = 'BPiy_PtMVfrpL_VNAVMSUxWRI8KznMNVZa0qQKKA25nfZuOWz0UtJq1c-ugFQ5ojQhg3NJWLgI__PARvJSKCknc';

if ('serviceWorker' in navigator) {
  console.log('Registering service worker');

  run().catch(error => console.error(error));
}


async function run() {
  console.log('Registering service worker');
  const registration = await navigator.serviceWorker.
    register('../assets/js/worker.js', {scope: '/'});
  console.log('Registered service worker');

  console.log('Registering push');
  const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
  console.log('Registered push');

  console.log('Sending push');
  await fetch('https://localhost:3800/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Sent push');
}


console.log('Loaded service worker!');

self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  self.registration.showNotification(data.title, {
    body: 'Hello, World!',
    icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
  });
});