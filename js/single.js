const slika = document.querySelector('#slika');
const naziv = document.querySelector('#naziv');
const cijena = document.querySelector('.price');
const opis = document.querySelector('#opis');
const kolicina = document.querySelector('#qty');
const kategorije = document.querySelector('.category');

const forma = document.querySelector('form');

const brStavki = document.querySelector('#brStavki')

let currentId = null;
// let currentProduct = [];
// let korpa = [];

window.addEventListener('load', () => {
    currentId = localStorage.getItem('singleProduct');

    // korpa = JSON.parse(localStorage.getItem('korpa')) ;

    brStavki.innerHTML = korpa.length;

    fetch(`http://localhost:3000/${currentId}`)
    .then(res => {
        return res.json();
    })
    .then (resJson => {

        slika.innerHTML = `
        <img src="http://localhost:3000/${resJson[0].img}" alt="Photo">`;
        naziv.textContent = `${resJson[0].name}`;
        cijena.textContent = `${resJson[0].price}`;
        opis.textContent = `${resJson[0].desc}`;

        kolicina.innerHTML = '';

        for (let i = 1; i <= resJson[0].qty; i++) {
            kolicina.innerHTML += ` <option value="${i}">${i}</option>`
            
        }

        kategorije.innerHTML = " ";

        let katTemp = resJson[0].category.trim().split(' , ');
        katTemp.forEach((element, idx ) => {

            if(katTemp.lenght != idx+1){

                kategorije.innerHTML += `<a href="">${element.trim()}</a>`
            }else {
                kategorije.innerHTML += `<a href="">${element.trim()}</a>`
            }

        });

    })
})



forma.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(event.target.kolicina.value);

    fetch(`http://localhost:3000/${currentId}`)
    .then(res => {
        return res.json();
    })
    .then (resJson => {
        resJson[0].qty = event.target.kolicina.value;
        // korpa.push({
        //     id: resJson[0].id,
        //     name: resJson[0].name,
        //     price: resJson[0].price,
        //     img: resJson[0].img,
        //     desc: resJson[0].desc,
        //     category: resJson[0].category,
        //     qty: resJson[0].qty
        // })
        // console.log(korpa);

        if(!localStorage.getItem('korpa')){
            localStorage.setItem('korpa', '[]');
        };
        korpa = JSON.parse(localStorage.getItem('korpa')) ;
        korpa.push(resJson[0]);

        console.log(korpa);
        localStorage.setItem('korpa', JSON.stringify(korpa));

    })
    .catch(err => console.log(err))
    .finally(_ => {
        window.location = "products.html";
    })
})