const cartTable = document.getElementById('cartTable');

window.addEventListener('load', () => {
    if(localStorage.getItem('korpa')){
        korpa = JSON.parse(localStorage.getItem('korpa'));
    }

    cartTable.innerHTML = '';

    korpa.forEach(stavka => {
        cartTable.innerHTML += `
    <tr> 
        <td>${stavka.id}</td>
        <td> <img src="http://localhost:3000/${stavka.img}" height="30px"> </td>
        <td>${stavka.name}</td>
        <td>${stavka.price}</td>
        <td>${stavka.qty}</td>
        <td>${stavka.price * stavka.qty}</td>
    </tr>
    
        
        `;
    });

    let total = korpa.reduce((acc, curVal) => {
        return acc + curVal.qty * curVal.price;

    }, 0);

    cartTable.innerHTML += `
    
    <tr> 
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Total: ${total}</td>
    </tr>
    `
})

 const clearCart = () => {
     localStorage.setItem('korpa', '[]' );
     korpa = [];
    
        cartTable.innerHTML += '';

        window.location = 'products.html'

 }