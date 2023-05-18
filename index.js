//const response = await fetch('https://7e18-190-45-93-233.ngrok-free.app/', {test: "hola"}) //, dict para enviar data CAMBIAR A NETLIFY CUANDO ESTE LISTO
//fetch('https://7e18-190-45-93-233.ngrok-free.app/', {test: "hola"}).then(res => res.json()).then(data => console.log(data))
//const response = fetch("https://b1ad-190-45-93-233.ngrok-free.app", {
//      method: "GET", // or 'PUT'
//      headers: {
//        "Content-Type": "application/json",
//        "Access-Control-Allow-Origin": "*",
//      },
//    });
//const data = await response.json()
//console.log(data)
const get_data = async () => {
    const response = await fetch('https://b1ad-190-45-93-233.ngrok-free.app/')
    const data = await response.json()
    console.log(data)
    return data
}
const data = get_data()
const bank_ops = document.getElementById('bank_ops');
bank_ops.innerHTML = `<h3>100</h3>`

//{
//"url": "https://7e18-190-45-93-233.ngrok-free.app/"
//}