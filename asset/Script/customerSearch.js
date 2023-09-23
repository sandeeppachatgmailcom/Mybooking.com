 
   
function loadHotel(SelectedValue,generalData ){
  let innerHTML = '';
  const hotelSelect = document.getElementById("idSearchWithHotel"); 
  while (hotelSelect.options.length > 0) {
    hotelSelect.remove(0); // Remove the first option until none remain
  }
  const customValue = JSON.parse(document.getElementById("idSearchText").getAttribute("data-hotels"));
  console.log(customValue);
  for (let i =0;i<customValue.length;i++){
    if (!i){
        let newOption = document.createElement('option');
        newOption.value = ''; // Set the value attribute
        newOption.textContent = 'All hotels we connected'; // Set the visible text
        hotelSelect.appendChild(newOption);
    }
    if (customValue[i].district==SelectedValue){
        console.log(customValue[i]);
        let newOption = document.createElement('option');
        newOption.value = customValue[i].CompanyID; // Set the value attribute
        newOption.textContent = customValue[i].lastName; // Set the visible text
        hotelSelect.appendChild(newOption);
         
    }
  } 
  
  
 }
 
 async function loadSearchResult(){
 if (!document.getElementById('idBudgetEnd').value) document.getElementById('idBudgetEnd').value=3000000
  const data = {
       SearchText:document.getElementById('idSearchText').value,
       SearchWithHotel:document.getElementById('idSearchWithHotel').value,
       StartDate:document.getElementById('idStartDate').value,
       EndDate:document.getElementById('idEndDate').value,
       GuestCount:document.getElementById('idGuestCount').value,
       RoomCount:document.getElementById('idRoomCount').value,
       BudgetFrom:Number(document.getElementById('idBudgetFrom').value),
       BudgetEnd:Number(document.getElementById('idBudgetEnd').value),
       SelectTariff:document.getElementById('idSelectTariff').value       
  } 
  console.log(data)
  document.getElementById('idCustSearchFirstDiv').innerHTML='';
  document.getElementById('idTariffDetails').innerHTML='';
  const result = await fetch('/custom/customSearch',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
  .then(res=>{
    return res.json()
  }).catch(err=>{
    console.log(err);
  })
  console.log(result);
let  innerHtml = '';
let hotels = new Set();
hotels = result.add 
for(let i=0;i<result.length;i++){
  console.log( result[i],'hello');
  innerHtml+= `<div class="card btn col-3">
  <img class="w-100"  src="${result[i].image1}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title" data-hotelTariffs="${result[i].tariffDetails}" >${result[i].lastName}</h5>
    <div class="d-flex justify-content-center">
      <h6 class="bi bi-star-fill text-warning"></h6>
      <h6 class="bi bi-star-fill text-warning"></h6>
      <h6 class="bi bi-star-fill text-warning"></h6>
      <h6 class="bi bi-star-fill"></h6>
      <h6 class="bi bi-star-fill"></h6>
    </div>
    <p class="card-text">${result[i].Companydiscription}</p>
  </div>
  <div class="card-footer">
    <small class="text-body-secondary">Last updated 3 mins ago</small>
    <a href="#idTariffDetails" onclick="loadRoomTariffs('${result[i].CompanyID}','${result[i].lastName}','${result[i].image1}') " class="link-fancy">
    <button class="btn btn-primary">Details</button>
    </a>
    </div>
</div>`
}
console.log(innerHtml );
document.getElementById('idCustSearchFirstDiv').innerHTML=innerHtml;
innerHtml = '';
let tariffdetails = new Set();
for (let i=0;i< result.length;i++){
  for(let j=0;j<result[i].tariffDetails.length;j++){
    console.log(result[i].tariffDetails);
    tariffdetails.add({companyID:result[i].CompanyID,
                CompanyName:result[i].lastName,
                CompanyID:result[i].companyID,
                tariffName:result[i].tariffDetails[j].tariffName,
                tariffID:result[i].tariffDetails[j].tariffIndex,
                roomRentSingle:result[i].tariffDetails[j].roomRentSingle,
                SpecialRent:result[i].tariffDetails[j].SpecialRent,
                imagePath:result[i].image1,
                Discription:result[i].tariffDetails[j].Discription
              })
  }
}
console.log(Object.keys(tariffdetails),'resched end of tariff');
for (const i of  tariffdetails){     
  innerHtml+= `
  <div class="card p-3 col-3" >
      <img src="${i.imagePath}" class="card-img-top" alt="...">
      <div class="card-body">
      <h6 class="bi text-warning">${i.CompanyName}</h6>
          <h5 class="card-title">${i.tariffName}</h5>
          <h3 class="bi text-warning">${i.SpecialRent}/-</h3>
        <p class="card-text">${i.Discription} </p>
        <a href="#TariffDetails" > <button type="button" onclick="loadtariffBasedPlans('${i.CompanyID}','${i.CompanyName}','${i.imagePath}','${i.SpecialRent}','${i.tariffName}',${i.tariffID}  )" class="btn btn-primary"> Next!!</button>
        </a>
        </div>
    </div>`
 
}

 
console.log(innerHtml);

// document.getElementById('idTariffDetails').innerHTML=innerHtml;

}


async function loadRoomTariffs(companyID,companyName,image) {
   
  const data = {
    CompanySearchKey: companyID,
    priceFrom: Number(document.getElementById('idBudgetFrom').value),
    PriceEnd: Number(document.getElementById('idBudgetEnd').value),
  }
  console.log(data);
  const tariffdetails = await fetch('/custom/TariffSearch',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
  
  .then(res=>{
    return res.json()
  })
  .catch(err=>{
    console.log(err)
  })
  console.log(tariffdetails);
  let innerHtml = '';
  for (const i of  tariffdetails){     
    innerHtml+= `
    <div class="card p-3 col-3" >
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h6 class="bi text-warning">${companyName}</h6>
            <h3 class="card-title">${i.tariffName},${i.SpecialRent}/-</h3>
            <h5 class="bi text-secondary">Extra Pax:${i.extraPerson}</h5>
          <p class="card-text">${i.Discription} </p>
          <a href="#idTariffDetails++" > <button type="button" onclick="loadtariffBasedPlans('${companyID}','${companyName}','${image}','${i.SpecialRent}','${i.tariffName}','${i.tariffIndex}'  )" class="btn btn-primary"> Next!!</button>
         </a>
          </div>
      </div>`
   
  }
   
console.log(innerHtml);

document.getElementById('idTariffDetails').innerHTML=innerHtml;
}

async function loadtariffBasedPlans(Companyid,companyName,image,SpecialRent, tariffName  , tariffIndex  ){
  console.log(Companyid,companyName,image,SpecialRent );
  document.getElementById('idTariffDetails++').innerHTML='';
  const data = {
    Companyid:Companyid,
    companyName:companyName,
    image:image,
    SpecialRent:SpecialRent 
     
  }
  console.log(data);
const plans = await fetch('/custom/loadPlans',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
.then(res=>{
  return res.json();
})
.catch(err=>{
  console.log(err);
})
console.log(plans);
let innerhtml = '';
for (let i of plans){
  const total =Number( i.amount) +Number( SpecialRent) ; 
innerhtml+=` <div class="card" style="width: 18rem;">
<img src="${image}" class="card-img-top p-1" alt="...">
<div class="card-body">
  <h6 class="card-title">${tariffName} : ${SpecialRent}/- <small>(2pax)</small> </h6>
  <small> Extra pax:${i.extraCharge}/-</small>
  <button class="btn btn-secondary" > <h4 class="card-title ">${i.planName} :${i.amount}/- <small>(2pax)</small> </h4>  
    <small> Extra Pax 350/-</small>
  </button>
  <div  class="d-flex">
    
    
  </button>
  
  <div class="btn-group col-6"   role="group" aria-label="Basic mixed styles example">
      gouest count:
      <button type="button"  style="border:1px solid grey" class="btn btn-danger col-4 bi bi-arrow-up-circle-fill">   </button>
      <input type="text" style="border:1px solid grey"  class="btn   col-4">  
      <button type="button" style="border:1px solid grey" class="btn btn-success col-4 bi bi-arrow-down-circle-fill">  </button>
  </div>
  
</div>
  <h4 class="card-title text-secondary" >Total Amount:<small>${total}/- </small> </h4>
  <p class="card-text">${i.discription}</p>
  <a   data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-success  ">Add to Cart</a>
</div>
</div>`

 

}
console.log(innerhtml);
document.getElementById('idTariffDetails++').innerHTML=innerhtml;
 
}

function readmore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}