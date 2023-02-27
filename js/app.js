const loadPhones = async (id) => {
  loader(true);
  const search = document.getElementById("search-text");
  const searchText = search.value;
  const searchT = id || searchText;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchT}`
  );

  const data = await res.json();
  displayPhones(data.data.slice(0, 3));
};

// display data...................................

const displayPhones = (phones) => {
  // console.log(phones)

  if(phones.length === 0) {
    document.getElementById("show-all").classList.add("d-none");
    document.getElementById("not-found").classList.remove("d-none");


  } else {
    document.getElementById("not-found").classList.add("d-none");
    document.getElementById("show-all").classList.remove("d-none");

  }
  const phoneContainer = document.getElementById("phones-container");

  phoneContainer.innerHTML = "";

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");

    const { image, phone_name, brand,slug } = phone;

    div.innerHTML = `
       <div class="card">
                <img class = "mx-auto p-5" src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone_name}</h5>
                  <h6  >Brand name :${brand}</h6>

                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                 <button onclick="showDetails('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Details
      </button>
                </div>
              </div>
       
       `;

    phoneContainer.appendChild(div);
  });

  loader(false) ;
};


// show details 

const showDetails = async (id) => {

const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)

const data = await res.json() ;

showModal(data.data);

}

// show modal 

const showModal = (phone) => {
console.log(phone);
const {name,slug,releaseDate,brand } = phone ;

const container = document.getElementById('exampleModalLabel');
container.innerText= name ;

const modalBody = document.getElementById('modal-body')
modalBody.innerHTML=`<p>
model: ${slug}</p>

<p>Release Date : ${releaseDate} </p>
brand: ${brand}

`

}








// show all data

const showAll = async () => {
  const search = document.getElementById("search-text");
  const searchText = search.value;
  console.log(searchText);

  const s =  searchText ||'iphone' 

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${s}`
  );

  const data = await res.json();
 
  displayPhones(data.data);
   document.getElementById("show-all").classList.add("d-none");
};


// spinner 

 const loader = isLoading => {

    const load =  document.getElementById("loader") ;

    if( isLoading) {

      load.classList.remove('d-none');
    }
    else {
      load.classList.add('d-none');

    }

 }


// enter button  

const inputElement = document.getElementById("search-text");

inputElement.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    

    // console.log("Enter key pressed");

  loadPhones();
  }
});




// search btn
// document.getElementById('search-btn').addEventListener('click' , function(){

// const search = document.getElementById('search-text') ;
// const searchText= search.value ;

// // console.log(searchText);

// loadPhones(searchText);

// search.value = '' ;

// })

loadPhones("iphone");
