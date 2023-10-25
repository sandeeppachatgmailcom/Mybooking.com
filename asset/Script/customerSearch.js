 
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
 

// async function loadRoomTariffs(companyID,companyName,image) {
   
//   const data = {
//     CompanySearchKey: companyID,
//     priceFrom: Number(document.getElementById('idBudgetFrom').value),
//     PriceEnd: Number(document.getElementById('idBudgetEnd').value),
//     startDate:document.getElementById("idStartDate").value,
//     endDate:document.getElementById("idEndDate").value
//   }
  
//   const tariffdetails = await fetch('/custom/TariffSearch',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
  
//   .then(res=>{
//     return res.json()
//   })
//   .catch(err=>{
//     console.log(err)
//   })
   
//   let innerHtml = '';
//   for (const i of  tariffdetails){     
//     innerHtml+= `
//     <div class="card p-3 col-3" >
//         <img src="${image}" class="card-img-top" alt="...">
//         <div class="card-body">
//         <h6 class="bi text-warning">${companyName}</h6>
//             <h3 class="card-title">${i.tariffName},${i.SpecialRent}/-</h3>
//             <h5 class="bi text-secondary">Extra Pax:${i.extraPerson}</h5>
//           <p class="card-text">${i.Discription}</p>
//           <a href="#idTariffDetails++" > <button type="button" onclick="loadtariffBasedPlans('${companyID}','${companyName}','${image}','${i.SpecialRent}','${i.tariffName}','${i.tariffIndex}'  )" class="btn btn-primary"> Next!!</button>
//          </a>
//           </div>
//       </div>`
   
//   }
    

// document.getElementById('idTariffDetails').innerHTML=innerHtml;
// }

// async function loadtariffBasedPlans(Companyid,companyName,image,SpecialRent, tariffName  , tariffIndex  ){
//    document.getElementById('idTariffDetails++').innerHTML='';
//   const data = {
//     Companyid:Companyid,
//     companyName:companyName,
//     image:image,
//     SpecialRent:SpecialRent 
     
//   }
  
// const plans = await fetch('/custom/loadPlans',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
// .then(res=>{
//   return res.json();
// })
// .catch(err=>{
//   console.log(err);
// }) 
// let innerhtml = '';
// for (let i of plans){
//   const total =Number( i.amount) +Number( SpecialRent) ; 
// innerhtml+=` <div class="card" style="width: 18rem;">
// <img src="${image}" class="card-img-top p-1" alt="...">
// <div class="card-body">
//   <h6 class="card-title">${tariffName} : ${SpecialRent}/- <small>(2pax)</small> </h6>
//   <small> Extra pax:${i.extraCharge}/-</small>
//   <button class="btn btn-secondary" > <h4 class="card-title ">${i.planName} :${i.amount}/- <small>(2pax)</small> </h4>  
//     <small> Extra Pax 350/-</small>
//   </button>
//   <div  class="d-flex">
    
    
//   </button>
  
//   <div class="btn-group col-6"   role="group" aria-label="Basic mixed styles example">
//       gouest count:
//       <button type="button"  style="border:1px solid grey" class="btn btn-danger col-4 bi bi-arrow-up-circle-fill">   </button>
//       <input type="text" style="border:1px solid grey"  class="btn   col-4">  
//       <button type="button" style="border:1px solid grey" class="btn btn-success col-4 bi bi-arrow-down-circle-fill">  </button>
//   </div>
  
// </div>
//   <h4 class="card-title text-secondary" >Total Amount:<small>${total}/- </small> </h4>
//   <p class="card-text">${i.discription}</p>
//   <a   data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-success  ">Add to Cart</a>
// </div>
// </div>`

 

// }
 
// document.getElementById('idTariffDetails++').innerHTML=innerhtml;
 
// }

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
    // document.getElementById("idStartDate").value = currentDate;
    document.getElementById("idStartDate").min = currentDate;
    // console.log(document.getElementById("idStartDate").value)
    // console.log(document.getElementById("idEndDate").value);
    document.getElementById("idEndDate").min = document.getElementById("idStartDate").value;
    if(document.getElementById("idEndDate").value< document.getElementById("idStartDate").value){
    document.getElementById("idEndDate").value = document.getElementById("idStartDate").value;}

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
  let innerhtml =' ';

  let tariffDetails = result.roomtypes;  
  let checkinplans = result.checkinplan;
  console.log(tariffDetails,'tariffDetails');

  document.getElementById("idTariffDetails").innerHTML = `
  <div class="container-fluid" >
    <div class="container-fluid d-flex  border btn" style="height :400px ;background-size: cover;background-position: center;">
    <img src="${result.image1}" class="card-img-top col-4" alt="...">
    <img src="${result.image2}" class="card-img-top col-4" alt="...">
    <img src="${result.image3}" class="card-img-top col-4" alt="...">
    
    </div>
    <div class="container-fluid d-flex justify-content-evenly border btn" >
         <h6 class="card-title" style="text-transform: uppercase;">${result.firstName}</h6> 
    </div>     
    <div class="container-fluid d-flex" id="idprinttariffcard" style="flex-wrap:wrap" >
    </div>
  </div>`
  
     

 
  const graceHours = .5;
  let temp = data.StartDate.split('T');
  const fromdate =new Date(temp[0]);
  let  arrivalTime = temp[1].split(':')
  temp = data.EndDate.split('T');
  const todate = new Date(temp[0]);
  let  deptTime = temp[1].split(':')
  const days =todate-fromdate;
  let diffDays = calculateDays(data.StartDate,data.EndDate) 
   
  deptTime = ((parseInt(deptTime[0])*60)+(parseInt(deptTime[1])))/60 
  arrivalTime = ((parseInt(arrivalTime[0])*60)+(parseInt(arrivalTime[1])))/60
  const timeDiff = deptTime - arrivalTime ;
  if(timeDiff>graceHours) diffDays++; 
   
  document.getElementById("")




for (let i of tariffDetails){
if(i.isActive){    
let bodycolorclass = 'btn-cyan-700'
if((i.SpecialRent>= Number(document.getElementById("idBudgetFrom").value)) &&(i.SpecialRent<= Number(document.getElementById("idBudgetEnd").value)))
{
  bodycolorclass = ' rgba(52, 152, 219, 0.853)'
}
else {
   bodycolorclass = 'rgba(224, 224, 224)'

}
if(! i.totalRoom) i.totalRoom=1;
  
  innerhtml+=`
  <div class="card" p-2 style="width: 21rem; ">
    <form action="/custom/viewReservation" method="post">
      <div onClick="calculateTotal(${i.SpecialRent},${i.extraPerson},'${i.tariffIndex}', ${diffDays})"
          class="card-body " style="background-color:${bodycolorclass}">
  
          <h6 style="text-transform: uppercase;" class="card-title">${i.tariffName} : ${i.SpecialRent}/-
          <h6 class="card-title" style="text-transform: uppercase;">${i.totalRoom-i.reservationCount} rooms available  </h6> 
         
              <small>(2pax)</small> <small > Extra pax:${i.extraPerson}/-</small> </h6>
          <select id="idCheckinPlan" class="input-group-text text-light btn col-2" name="roomCategoryID">
              <option value="0">none</option>
  
          </select>
          <div class="d-flex">
              </button>
          </div>
          <h4   class="card-title ">Total Amount:<small id="idTotalamount${i.tariffIndex}"> </small> </h4>
          <div style="height: 80px; wrap:nowrap ; overflow:hidden"   id="iDtariffDiscript${i.tariffIndex}">
              
              <p class="card-text btn"   onClick="drilldown('iDtariffDiscript${i.tariffIndex}','80')">${i.Discription}</p>
          </div>
          <div class="continer-flex">
              <div class="input-group d-flex ">
                  <div class="input-group-prepend col-4  ">
                      <span class="input-group-text col-12" id="basic-addon1"> Room</span>
                  </div>
                  <input type="Number" name="roomCount" value="${parseInt(data.RoomCount)}"
                      onChange="calculateTotal(${i.SpecialRent},${i.extraPerson},'${i.tariffIndex}')"
                      max="${i.totalRoom}" id="idTotalRoomReq${i.tariffIndex}" class="form-control" placeholder="Username"
                      aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="input-group d-flex ">
                  <div class="input-group-prepend col-4  ">
                      <span  class="input-group-text col-12" id="basic-addon1"> Guest</span>
                  </div>
                  <input name="guestCount" type="Number" value="${parseInt(data.GuestCount)}"
                      onkeypress="calculateTotal(${i.SpecialRent},${i.extraPerson},'${i.tariffIndex}')"
                      class="form-control" id="idTotalGuestOccs${i.tariffIndex}" placeholder="Username"
                      aria-label="Username" aria-describedby="basic-addon1">
              </div>
    
              <div class="input-group d-flex ">
                  <div class="input-group-prepend col-4 ">
                      <span class="input-group-text col-12" id="basic-addon1">Days </span>
                  </div>
                  <input type="Number" class="form-control" readOnly="true"
                      onkeypress="calculateTotal(${i.SpecialRent},${i.extraPerson},'${i.tariffIndex}')"
                      value="${diffDays}" id="iddaycount${i.tariffIndex}" placeholder="Username" aria-label="Username"
                      aria-describedby="basic-addon1">
              </div>
              <div class="input-group d-flex ">
                  <div class="input-group-prepend col-4  ">
                      <span class="input-group-text col-12" id="basic-addon1">arrival </span>
                  </div>
                  <input type="datetime-local" onChange="updateCustommerDays('${i.tariffIndex}')" class="form-control"
                      readOnly="true" id="idarrivaldate${i.tariffIndex}" value="${data.StartDate}" placeholder="Username"
                      aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="input-group d-flex ">
                  <div class="input-group-prepend col-4  ">
                      <span class="input-group-text col-12" id="basic-addon1">Depart </span>
                  </div>
                  <input type="datetime-local" class="form-control" onChange="updateCustommerDays('${i.tariffIndex}')"
                      readOnly="true" id="idDepartureDate${i.tariffIndex}" value="${data.EndDate}" placeholder="Username"
                      aria-label="Username" aria-describedby="basic-addon1">
              </div>
          </div>
          <button class="btn btn-success" name="bookingDetails" onClick="saveReservation(event.target.value)"
              value="${result.CompanyID},${i.tariffIndex},${data.StartDate},${data.EndDate},${diffDays}"
              type="submit">Book Now </button>
      </div>
  </form>
  </div>`
  
  document.getElementById("idprinttariffcard").innerHTML ='';
  document.getElementById("idprinttariffcard").innerHTML =  innerhtml;
  
  document.getElementById("idCheckinPlan").innerHTML =''
   
  }}  
   
  
}
function checkinPlan(){

}
async function confirmReservation(inputString){

    let temp = inputString.split(",")
    console.log(temp);
    const data ={
    reservationNumber:'',
    hrId: '',
    companID: temp[0],
    arrivalDate:temp[2],
    depart_Date:temp[3],
    tariff:temp[1],
    specialRate:document.getElementById(),value,
    TotalPax:document.getElementById(),value,
    specialrequierments:document.getElementById(),value,
    CheckinPlan:document.getElementById(),value,
}
  console.log(data); 
  }


 function calculateTotal(SpecialRent,extraPax,tariffcode){
  const totalPax =parseInt(document.getElementById("idTotalGuestOccs"+tariffcode).value);
  const totalRoom =parseInt(document.getElementById("idTotalRoomReq"+tariffcode).value);
  const days = parseInt(document.getElementById("iddaycount"+tariffcode).value);
  const totalRoomCapacity = 5*totalRoom  
  const allowedPax = totalRoom * 2;
  let  additionalPax = totalPax -allowedPax;
  if (additionalPax<0) additionalPax =0;
  const totalAmpunt = ((totalRoom*SpecialRent)+(additionalPax*extraPax))*days;
  if(totalPax>totalRoomCapacity) {document.getElementById("idTotalGuestOccs"+tariffcode).style.color = 'red';
  document.getElementById("idTotalGuestOccs"+tariffcode).max=totalRoomCapacity
}
  else  document.getElementById("idTotalGuestOccs"+tariffcode).style.color = 'black'
  document.getElementById("idTotalamount"+tariffcode).innerText =totalAmpunt 
  console.log(totalPax,'totalPax',totalRoom,'totalRoom', SpecialRent,'SpecialRent',extraPax,'extraPax',allowedPax,'allowedPax',additionalPax,'additionalPax',totalAmpunt,'totalAmpunt'); 
 }

function calculateDays(startDate,endDate){
    const graceHours = .5;
    let temp = startDate.split('T');
    const fromdate =new Date(temp[0]);
    let  arrivalTime = temp[1].split(':')
    temp = endDate.split('T');
    const todate = new Date(temp[0]);
    let  deptTime = temp[1].split(':')
    const days =todate-fromdate;
    let diffDays = Math.ceil(days / (1000 * 60 * 60 * 24)); 
    deptTime = ((parseInt(deptTime[0])*60)+(parseInt(deptTime[1])))/60 
    arrivalTime = ((parseInt(arrivalTime[0])*60)+(parseInt(arrivalTime[1])))/60
    const timeDiff = deptTime - arrivalTime ;
    if(timeDiff>graceHours) diffDays++; 
    console.log(arrivalTime ,deptTime,timeDiff.toFixed(2), diffDays.toFixed(2),'total days')
    return diffDays;
}
function updateCustommerDays (tariffCode){
  const startDate = document.getElementById("idarrivaldate"+tariffCode).value; 
  const endDate = document.getElementById("idDepartureDate"+tariffCode).value;
  const dayfield = document.getElementById("iddaycount"+tariffCode);
  dayfield.value = parseInt(calculateDays(startDate,endDate))

}


