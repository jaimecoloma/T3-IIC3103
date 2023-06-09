const get_data = async () => {  //https://erin-ray-garb.cyclic.app
    const response = await fetch('https://t3-back-iic3103-jaimecoloma.onrender.com')  //https://t3-back-iic3103-jaimecoloma.onrender.com
    const data = await response.json()
    const bank_ops = document.getElementById('bank_ops');
    bank_ops.innerHTML = `<h4>${data.rows.length}</h4>`
    const EnvioArray = data.rows.filter((obj) => obj.operation === 2200);
    const ReversaArray = data.rows.filter((obj) => obj.operation === 2400);
    //const sumA = operationAArray.reduce((total, obj) => total + obj.amount, 0);
    const sumEnvio = EnvioArray.reduce((total, obj) => total + obj.amount, 0);
    const sumReversa = ReversaArray.reduce((total, obj) => total + obj.amount, 0);

    const send_ops = document.getElementById('send_ops');
    send_ops.innerHTML = `<h6> CANTIDAD: ${EnvioArray.length}</h6><h6> TOTAL: $${sumEnvio}</h6>`
    const reverse_ops = document.getElementById('reverse_ops');
    reverse_ops.innerHTML = `<h6>CANTIDAD: ${ReversaArray.length}</h6><h6> TOTAL: $${sumReversa}</h6>`

    const table = document.getElementById('Table');
    let limit = 0
    let numero = 1
    if (data.rows.length >= 100) {
        limit = data.rows.length - 100
    }
    for (let i = data.rows.length - 1; i >= limit; i--) {
        if(data.rows[i].operation === 2200){
            table.innerHTML += `<tr>
            <td><i class="fa fa-envelope w3-text-blue w3-large"></i></td>
            <td>${data.rows[i].operation}</td>
            <td>${data.rows[i].bank_origin}</td>
            <td>${data.rows[i].account_origin}</td>
            <td>${data.rows[i].bank_destiny}</td>
            <td>${data.rows[i].account_destiny}</td>
            <td>${data.rows[i].amount}</td>
            <td>${data.rows[i].publish_time}</td>
            <td>${data.rows[i].id}</td>
            <td>${numero}</td>
      </tr>`
        }else{
            table.innerHTML += `<tr>
            <td><i class="fa fa-backward w3-text-green w3-large"></i></td>
            <td>${data.rows[i].operation}</td>
            <td>${data.rows[i].bank_origin}</td>
            <td>${data.rows[i].account_origin}</td>
            <td>${data.rows[i].bank_destiny}</td>
            <td>${data.rows[i].account_destiny}</td>
            <td>${data.rows[i].amount}</td>
            <td>${data.rows[i].publish_time}</td>
            <td>${data.rows[i].id}</td>
            <td>${numero}</td>
      </tr>`
        }
        numero++
    }

    const Array1 = data.rows.filter((obj) => obj.amount < 10000);
    const Array2 = data.rows.filter((obj) => 10000 <= obj.amount && obj.amount < 50000);
    const Array3 = data.rows.filter((obj) => 50000 <= obj.amount && obj.amount < 100000);
    const Array4 = data.rows.filter((obj) => 100000 <= obj.amount && obj.amount < 500000);
    const Array5 = data.rows.filter((obj) => 500000 <= obj.amount && obj.amount < 1000000);
    const Array6 = data.rows.filter((obj) => 1000000 <= obj.amount && obj.amount < 10000000);
    const Array7 = data.rows.filter((obj) => 10000000 <= obj.amount);
    

    const histogram = document.getElementById('histograma'); // porcentaje == cantidad/total * 100
    histogram.innerHTML += `<p>Menor a 10.000</p>
    <div class="w3-grey">
      <div class="w3-container w3-center w3-padding w3-green" style="width:${(Array1.length/data.rows.length)*100}%">${Array1.length}</div>
    </div>
    <p>10.000 a 50.000</p>
    <div class="w3-grey">
    <div class="w3-container w3-center w3-padding w3-orange" style="width:${(Array2.length/data.rows.length)*100}%">${Array2.length}</div>
    </div>
    <p>50.000 a 100.000</p>
    <div class="w3-grey">
    <div class="w3-container w3-center w3-padding w3-red" style="width:${(Array3.length/data.rows.length)*100}%">${Array3.length}</div>
    </div>
    <p>100.000 a 500.000</p>
    <div class="w3-grey">
    <div class="w3-container w3-center w3-padding w3-blue" style="width:${(Array4.length/data.rows.length)*100}%">${Array4.length}</div>
    </div>
    <p>500.000 a 1.000.000</p>
    <div class="w3-grey">
    <div class="w3-container w3-center w3-padding w3-yellow" style="width:${(Array5.length/data.rows.length)*100}%">${Array5.length}</div>
    </div>
    <p>1.000.000 a 10.000.000</p>
    <div class="w3-grey">
    <div class="w3-container w3-center w3-padding w3-purple" style="width:${(Array6.length/data.rows.length)*100}%">${Array6.length}</div>
    </div>
    <p>Mayor a 10.000.000</p>
    <div class="w3-grey">
    <div class="w3-container w3-center w3-padding w3-pink" style="width:${(Array7.length/data.rows.length)*100}%">${Array7.length}</div>
    </div>`
    const pares = {}
    // loop of data.rows
    for (let i = 0; i < data.rows.length; i++) {
        const a = `${data.rows[i].bank_origin}-${data.rows[i].bank_destiny}`
        const b = `${data.rows[i].bank_destiny}-${data.rows[i].bank_origin}`
        if (pares[b]){
            if (data.rows[i].operation === 2200){
                pares[b] -= data.rows[i].amount
            }else{
                pares[b] += data.rows[i].amount
            }
        }else {
            pares[a] = data.rows[i].amount
        }
        }
    // loop of pares
    const conciliacion = document.getElementById('Conciliacion');
    Object.entries(pares).forEach(([key, value]) => {
        let bank1 = key.split('-')[0]
        let bank2 = key.split('-')[1]
        if (value > 0){
            conciliacion.innerHTML += `<tr>
            <td><i class="fa fa-balance-scale w3-text-yellow w3-large"></i></td>
            <td>${bank1}</td>
            <td><i class="fa fa-arrow-right w3-text-green w3-large"></i>${value}</td>
            <td>${bank2}</td>`
        } else {
            conciliacion.innerHTML += `<tr>
            <td><i class="fa fa-balance-scale w3-text-yellow w3-large"></i></td>
            <td>${bank2}</td>
            <td><i class="fa fa-arrow-right w3-text-green w3-large"></i>${value*-1}</td>
            <td>${bank1}</td>`
        }
     });

    return data
}
const data = get_data()

