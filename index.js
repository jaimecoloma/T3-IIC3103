const get_data = async () => {
    const response = await fetch('https://t3-iic3103-jaimecoloma.onrender.com/')
    const data = await response.json()
    console.log(data.rows[0])
    //const firstRow = response[0];
    //for (let columnName in firstRow) {
    //    const columnValue = firstRow[columnName];
    //    console.log(columnName + ": " + columnValue);
    //  }
    //console.log(data)
    return data
}
const data = get_data()
const bank_ops = document.getElementById('bank_ops');
bank_ops.innerHTML = `<h3>100</h3>`
