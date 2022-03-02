/* search field */
const searchField=()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    searchField.value='';
    /*error message hide */
    document.getElementById('search-error').style.display = 'none';
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    
    fetch(url)
    .then(res => res.json())
    .then(json => displaySearchResult(json.data.slice(0,20)));
}

/* display search result */

const displaySearchResult= phones =>{
    const phonesArea = document.getElementById('phones-area');
    phonesArea.textContent='';
    /*  phone detail inner area removed */
    const phoneDetail = document.getElementById('phone-detail');
    phoneDetail.textContent = '';
    if(phones.length === 0)
    {
        document.getElementById('search-error').style.display = 'block';
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
            <div class="card">
             <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body text-center">
                <h3 class="card-title my-2">${phone.phone_name}</h3>
                <h4 class="my-3">${phone.brand}</h4>
                <a onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary" href="#" role="button">See Detail</a>
             </div>
            </div>`;
        phonesArea.appendChild(div);
    })

}

/* load phone details */

const loadPhoneDetail = slug =>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
    .then(res => res.json())
    .then(json => displayPhoneDetail(json.data));
}

/* display phone details */

const displayPhoneDetail = phone =>{
   const phoneDetail = document.getElementById('phone-detail');
   phoneDetail.textContent = '';
   const div = document.createElement('div');
   div.classList.add('row');
   div.innerHTML = `
        <div class="col-md-6">
          <img class="w-100" src="${phone.image}" alt="">
        </div>
        <div class="col-md-6">
           <p class="fs-5"><strong>Phone-name:</strong> ${phone.name}</p>
           <p class="fs-5"><strong>Release-Date:</strong>
           ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
           <p class="fs-5"><strong>Main-Features:</strong></p>
           <ul>
              <li>${phone.mainFeatures.storage}</li>
              <li>${phone.mainFeatures.displaySize}</li>
              <li>${phone.mainFeatures.chipSet}</li>
              <li>${phone.mainFeatures.memory}</li>
              <li>Sensors:
                 <ol>
                    <li>${phone.mainFeatures.sensors[0]}</li>
                    <li>${phone.mainFeatures.sensors[1]}</li>
                    <li>${phone.mainFeatures.sensors[2]}</li>
                    <li>${phone.mainFeatures.sensors[3]}</li>
                    <li>${phone.mainFeatures.sensors[4]}</li>
                 </ol>
              </li>
           </ul>
           <p class="fs-5"><strong>Others:</strong></p>
           <ul>
              <li>${phone.others?.WLAN ? phone.others.WLAN : 'Not available'}</li>
              <li>${phone.others?.Bluetooth ? phone.others.Bluetooth : 'Not available'} </li>
              <li>${phone.others?.GPS ? phone.others.GPS : 'Not available'}</li>
              <li>${phone.others?.NFC ? phone.others.NFC : 'Not available' }</li>
              <li>${phone.others?.Radio ? phone.others.Radio : 'Not available'}</li>
              <li>${phone.others?.USB ? phone.others.USB : 'Not available'}</li>
           </ul>
        </div>`;

    phoneDetail.appendChild(div);


}