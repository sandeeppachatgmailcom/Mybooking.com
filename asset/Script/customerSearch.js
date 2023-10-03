 
function loadHotel(SelectedValue,generalData ){
  let innerHTML = '';
  const hotelSelect = document.getElementById("idSearchWithHotel"); 
  while (hotelSelect.options.length > 0) {
    hotelSelect.remove(0); // Remove the first option until none remain
  }
  const customValue = JSON.parse(document.getElementById("idSearchText").getAttribute("data-hotels"));
   
  for (let i =0;i<customValue.length;i++){
    if (!i){
        let newOption = document.createElement('option');
        newOption.value = ''; // Set the value attribute
        newOption.textContent = 'All hotels we connected'; // Set the visible text
        hotelSelect.appendChild(newOption);
    }
    if (customValue[i].district==SelectedValue){
         
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
      
       StartDate:document.getElementById('idStartDate').value,
       EndDate:document.getElementById('idEndDate').value,
       GuestCount:document.getElementById('idGuestCount').value,
       RoomCount:document.getElementById('idRoomCount').value,
       BudgetFrom:Number(document.getElementById('idBudgetFrom').value),
       BudgetEnd:Number(document.getElementById('idBudgetEnd').value),
       SelectTariff:document.getElementById('idSelectTariff').value       
  } 
    // document.getElementById('idCustSearchFirstDiv').innerHTML='';
  // document.getElementById('idTariffDetails').innerHTML='';
  const result = await fetch('/custom/customSearch',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
  .then(res=>{
    return res.json()
  }).catch(err=>{
    console.log(err);
  })
  
let  innerHtml = '';
let hotels = new Set();
hotels = result.add 
for(let i=0;i<result.length;i++){
   
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
//  
// document.getElementById('idCustSearchFirstDiv').innerHTML=innerHtml;
innerHtml = '';
let tariffdetails = new Set();
for (let i=0;i< result.length;i++){
  for(let j=0;j<result[i].tariffDetails.length;j++){
    
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

  

// document.getElementById('idTariffDetails').innerHTML=innerHtml;

}


async function loadRoomTariffs(companyID,companyName,image) {
   
  const data = {
    CompanySearchKey: companyID,
    priceFrom: Number(document.getElementById('idBudgetFrom').value),
    PriceEnd: Number(document.getElementById('idBudgetEnd').value),
  }
  
  const tariffdetails = await fetch('/custom/TariffSearch',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
  
  .then(res=>{
    return res.json()
  })
  .catch(err=>{
    console.log(err)
  })
   
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
    

document.getElementById('idTariffDetails').innerHTML=innerHtml;
}

async function loadtariffBasedPlans(Companyid,companyName,image,SpecialRent, tariffName  , tariffIndex  ){
   document.getElementById('idTariffDetails++').innerHTML='';
  const data = {
    Companyid:Companyid,
    companyName:companyName,
    image:image,
    SpecialRent:SpecialRent 
     
  }
  
const plans = await fetch('/custom/loadPlans',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
.then(res=>{
  return res.json();
})
.catch(err=>{
  console.log(err);
}) 
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


 
  document.addEventListener("DOMContentLoaded", function () {
    // Get the current date and time in the format "YYYY-MM-DDTHH:MM"
    const currentDate = new Date().toISOString().slice(0, 16);

    // Set the value of the input with id "idStartDate" to the current date and time
    document.getElementById("idStartDate").value = currentDate;
    document.getElementById("idStartDate").min = currentDate;
    
    document.getElementById("idEndDate").min = document.getElementById("idStartDate").value;
    document.getElementById("idEndDate").value = document.getElementById("idStartDate").value;

  });
 
  document.getElementById("idStartDate").addEventListener("change",function (){
  document.getElementById("idEndDate").value = document.getElementById("idStartDate").value;
  document.getElementById("idEndDate").min = document.getElementById("idStartDate").value;
  })

  async function loadHotelBasedResult(companyID){
    
    const data = {
      StartDate:document.getElementById("idStartDate").value,
      EndDate:document.getElementById("idEndDate").value,
      hotelId:companyID,
      district:document.getElementById("idDitrictName").value,
      GuestCount:document.getElementById("idGuestCount").value,
      RoomCount:document.getElementById("idRoomCount").value,
      BudgetFrom:document.getElementById("idBudgetFrom").value,
      BudgetEnd:document.getElementById("idBudgetEnd").value,
      SelectTariff:document.getElementById("idSelectTariff").value
    }
    const result = await fetch('/custom/loadHotelDetails',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
  .then(res=>{
    return res.json()
  }).catch(err=>{
    console.log(err);
  }) 
  let innerhtml ='';

  let tariffDetails = result.roomtypes;  
  let checkinplans = result.checkinplan;
  console.log(checkinplans);

  for (let i of tariffDetails){
  let masterhtml = `<div class="container-fluid  " >
    <div class="container-fluid d-flex  border btn" style="height :40%;background-size: cover;background-position: center;">
        <img src="${result.image1}" class="card-img-top" alt="...">
    </div>
    <div class="container-fluid d-flex justify-content-evenly border btn" >
         <div>
         <h6 class="card-title" style="text-transform: uppercase;">${result.firstName}</h6> 

         </div>
         <div class="form-check form-check-inline">
         <input class="form-check-input" type="checkbox" id="idshowallpricecheckbox" value="option1">
         <label class="form-check-label" for="idshowallpricecheckbox">SHOW ALL PRICE RANGE</label>
       </div>
         </div>     
    
    <div class="container-fluid d-flex" id="idprinttariffcard" style="flex-wrap:wrap" >
    </div>
  </div>`

  let bodycolorclass = 'btn-secondary'
if((i.SpecialRent>= Number(document.getElementById("idBudgetFrom").value)) &&(i.SpecialRent<= Number(document.getElementById("idBudgetEnd").value)))bodycolorclass = 'btn-light'
else {
   bodycolorclass = 'btn-secondary'
}

  
  innerhtml+=` <div class="card" p-2 style="width: 19rem; ">
  
    <div class="card-body ${bodycolorclass}">
    
      <h6 class="card-title">${i.tariffName} : ${i.SpecialRent}/- <small>(2pax)</small> <small> Extra pax:${i.extraPerson}/-</small> </h6>
          <select id="idCheckinPlan" class="input-group-text text-light btn col-2" name="roomCategoryID">
          <option value="0">none</option>
          
        </select>
      <div  class="d-flex">
      </button>
      </div>
      <h4 class="card-title " >Total Amount:<small id="idTotalamount${i.tariffIndex}" > </small> </h4>
      <div style="height: 80px; wrap:nowrap ; overflow-y: scroll">
      <p class="card-text">${i.Discription}</p>
      </div> 
       <div class="continer-flex">
       <div class="input-group d-flex ">
        <div class="input-group-prepend col-6">
          <span class="input-group-text col-12" id="basic-addon1">Total Room</span>
        </div>
       <input type="Number" value="${parseInt(data.RoomCount)}" onChange="calculateTotal(${i.SpecialRent},${i.extraPerson},'${i.tariffIndex}')"  id="idTotalRoomReq${i.tariffIndex}" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
     </div>
     <div class="input-group d-flex ">
        <div class="input-group-prepend col-6">
          <span class="input-group-text col-12" id="basic-addon1">Total Guest</span>
        </div>
       <input type="Number" value="${parseInt(data.GuestCount)}" onChange="calculateTotal(${i.SpecialRent},${i.extraPerson},'${i.tariffIndex}')" class="form-control" id="idTotalGuestOccs${i.tariffIndex}" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
     </div>
     <div class="input-group d-flex ">
        <div class="input-group-prepend col-6">
          <span class="input-group-text col-12" id="basic-addon1">coupon </span>
        </div>
       <input type="Number" class="form-control" id="idcoupncode${i.tariffIndex}" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
     </div>
     <div class="input-group d-flex ">
        <div class="input-group-prepend col-6">
          <span class="input-group-text col-12" id="basic-addon1">Total amount</span>
        </div>
       <input type="Number" class="form-control" id="idTotalamount${i.tariffIndex}" value="${parseInt(data.GuestCount)}" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
     </div>
       </div>
      <button class="btn btn-success" name="bookingDetails"  value="${result.CompanyID},${i.tariffIndex}"  type="button" onclick="loadDateWiseBooking(event.target.value)">Book Now </button>
      
    </div>
    </div>`
    
  document.getElementById("idTariffDetails").innerHTML =  masterhtml;
  document.getElementById("idprinttariffcard").innerHTML =  innerhtml;
  document.getElementById("idSelectTariff").textContent = i.tariffName
  }
  
   
  }

 function calculateTotal(SpecialRent,extraPax,tariffcode){
  const totalPax =parseInt(document.getElementById("idTotalGuestOccs"+tariffcode).value);
  const totalRoom =parseInt(document.getElementById("idTotalRoomReq"+tariffcode).value);
  const totalRoomCapacity = 5*totalRoom  
  const allowedPax = totalRoom * 2;
  let  additionalPax = totalPax -allowedPax;
  if (additionalPax<0) additionalPax =0;
  const totalAmpunt = (totalRoom*SpecialRent)+(additionalPax*extraPax)
  if(totalPax>totalRoomCapacity) {document.getElementById("idTotalGuestOccs"+tariffcode).style.color = 'red';
  document.getElementById("idTotalGuestOccs"+tariffcode).max=totalRoomCapacity
}
  else  document.getElementById("idTotalGuestOccs"+tariffcode).style.color = 'black'
  document.getElementById("idTotalamount"+tariffcode).innerText =totalAmpunt 
  console.log(totalPax,'totalPax',totalRoom,'totalRoom', SpecialRent,'SpecialRent',extraPax,'extraPax',allowedPax,'allowedPax',additionalPax,'additionalPax',totalAmpunt,'totalAmpunt'); 
 }


  async function loadDateWiseBooking(credential){
     
    let  temp = credential.split(',') ; 
    const data = {
      StartDate:document.getElementById("idStartDate").value,
      EndDate:document.getElementById("idEndDate").value,
      hotelId:temp[0],
      district:document.getElementById("idDitrictName").value,
      GuestCount:document.getElementById("idGuestCount").value,
      RoomCount:document.getElementById("idRoomCount").value,
      BudgetFrom:document.getElementById("idBudgetFrom").value,
      BudgetEnd:document.getElementById("idBudgetEnd").value,
      SelectTariff:temp[1],
      loggeduser:document.getElementById("idloggedusermenubar").textContent
    }
    const result = await fetch('/custom/confirmBooking',{method:'post',headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
    .then((res)=>{
      return res.json()
    })
    .catch((err)=>{
      console.log(err)
    })}
