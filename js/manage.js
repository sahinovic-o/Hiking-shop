const productTable = document.getElementById('productTable');

let proizvodi = [];
let editMode = false;
let editId = null;

window.addEventListener('load', () => {
   fetch('http://localhost:3000/')
   .then(res => res.json())
   .then(resJson => {

       console.log(resJson);
       proizvodi = resJson;
    })
    .then( _ => ispisProizvoda())
    .catch(err => console.log(err))
    
    

    

});

const ispisProizvoda = () => {
    proizvodi.forEach(proizvod => {
        productTable.innerHTML += `
        <tr> 
            <td>${proizvod.id}</td>
            <td> <img src="http://localhost:3000/${proizvod.img}" height="30px"> </td>
            <td>${proizvod.name}</td>
            <td>${proizvod.qty}</td>
            <td>${proizvod.price}</td>
            <td><button class="btn btn-info" onclick="viewProduct(${proizvod.id})">View</button></td>
            <td><button class="btn btn-warning" onclick="editProduct(${proizvod.id}>Edit</button></td>
            <td><button class="btn btn-danger" onclick="removeProduct(${proizvod.id})">Delete</button></td>
            
        </tr>
        
            
            `;
       })
}
   

const viewProduct = (id) => {
    localStorage.setItem('singleProduct', id);
    window.location = "single.html";
}

const removeProduct = (id) => {

    fetch(`http://localhost:3000/delete/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(resJson => {
        fetch('http://localhost:3000/')
        .then(proizvodiRaw => proizvodiRaw.json())
        .then(proizvodiJson => {
           proizvodi = proizvodiJson;
        })
        .then( _ => {
            ispisProizvoda();
        })
        .catch(err => console.log(err)); 


    })


}


   