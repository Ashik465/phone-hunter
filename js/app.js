
const loadPhones =async(searchText) =>{

 const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`) ;

 const data = await res.json() ;
 displayPhones(data.data );

}

const displayPhones = (phones) => {

    // console.log(phones)
    const phoneContainer = document.getElementById('phones-container') ;

    phoneContainer.innerHTML="" ;

    phones.forEach(phone => {

       const div= document.createElement('div');
       div.classList.add("col");

       const {image , phone_name,brand } = phone ;

       div.innerHTML = `
       <div class="card">
                <img class = "mx-auto p-5" src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone_name}</h5>
                  <h6  >Brand name :${brand}</h6>

                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
              </div>
       
       `

       phoneContainer.appendChild(div);



       
        
    });
}


document.getElementById('search-btn').addEventListener('click' , function(){



const search = document.getElementById('search-text') ;
const searchText= search.value ;

// console.log(searchText);

loadPhones(searchText);

search.value = '' ;

})



loadPhones();