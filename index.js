/* search field */
const searchField=()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    searchField.value='';
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    
    fetch(url)
    .then(res => res.json())
    .then(json => displaySearchResult(json.data.slice(0,20)));
}

/* display search result */

const displaySearchResult= phones =>{
    const phonesArea = document.getElementById('phones-area');
    phonesArea.textContent='';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
            <div class="card">
             <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body text-center">
                <h3 class="card-title my-2">${phone.phone_name}</h3>
                <h4 class="my-3">${phone.brand}</h4>
                <button type="button" class="btn btn-primary">See Detail</button>
             </div>
            </div>`;
        phonesArea.appendChild(div);
    })

}