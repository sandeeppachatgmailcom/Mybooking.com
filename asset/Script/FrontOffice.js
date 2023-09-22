const roomtype = document.getElementById("idRoomtype");
const plan = document.getElementById("idtariffRent");
async function calculateRoomRent(roomtype,){

}

async function loadPlanDetails() {
    const Checkinplan = document.getElementById("idCheckinPlan");
    const selectedOption = Checkinplan.options[Checkinplan.selectedIndex];
    const data = selectedOption.getAttribute("data-Value");
    const dataValue =  JSON.parse(data) ; // This parses the string to an object
    document.getElementById("idspRent").value = dataValue.amount;
    console.log(dataValue);
}
function loadRoomType(){
const tariff = document.getElementById("idRoomtype");
const selectedOption = tariff.options[tariff.selectedIndex];
const data = selectedOption.getAttribute("data-tariff");
const dataValue =  JSON.parse(data) ; // This parses the string to an object
console.log(dataValue);
// document.getElementById("").value=dataValue.CheckinPlan

}

 async function loadCustomer() {
    const data = {firstName: document.getElementById("idGuestName").value , 
    contactNumber:document.getElementById("idContactNumber").value , 
    email:document.getElementById("idEmail").value, 
    category:document.getElementById("IdType").value, 
    IdProofNumber:document.getElementById("idDocumentId").value , 
    hrId:document.getElementById("idcustomerId").value ,
    arrivalDate:document.getElementById("idArrivalDate").value , 
    arrivalTime:document.getElementById("idarrivalTime").value, 
    depart_Date:document.getElementById("idDepartDate").value,
    TotalPax:document.getElementById("idtotalPax").value, 
    departureTime:document.getElementById("iddepartureTime").value, 
    Male:document.getElementById("idMale").value, 
    feMale:document.getElementById("idFemale").value, 
    otherSex:document.getElementById("idOther").value, 
    tariff:document.getElementById("idRoomtype").value, 
    CheckinPlan:document.getElementById("idCheckinPlan").value, 
    roomId:document.getElementById("idRoom").value, 
    Estimate:document.getElementById("idEstimate").value, 
    //discPercentage:document.getElementById("iddiscPercentage").value, 
    discAmount:document.getElementById("iddiscAmount").value, 
    spRent:document.getElementById("idspRent").value, 
    planAmount:document.getElementById("idplanAmount").value, 
    tariffRent:document.getElementById("idtariffRent").value, 
    totalAmount:document.getElementById("idtotalAmount").value, 
    Image:document.getElementById("idImage").value, 
    Plan:document.getElementById("idPlan").value, 
    CheckinBody:document.getElementById("idCheckinBody").value};
     try {
        const response = await fetch('/frontOffice/loadCheckin', {
            method: 'post',
            headers: { "Content-type": 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res=>{
            return res.json()
        })
        .catch(err=>{
            console.log(err);
        });
        console.log(response); 
        let tabledata = '';
        response.map((values) => {
            tabledata += `
                <tr>
                    <td>${values.frontDeskTransid}</td>
                    <td>${values.checkinReferance}</td>
                    <td>${values.reservationNumber}</td>
                    <td>${values.customerDetails[0].firstName}</td>
                    <td>${values.customerDetails[0].contactNumber}</td>
                    <td>${values.customerDetails[0].email}</td>
                    <td>${values.arrivalDate}</td>
                    <td>${values.depart_Date}</td>
                    <td>${values.TotalPax}</td>
                    <td>${values.adult}</td>
                    <td>  <button id="Focus_edit" value=" <%= JSON.stringify(item)  %> " onclick="loadCheckinData(event.target.value)"  class="btn btn-warning bi bi-search" type="button"> </button> 
                </td>
                </tr>
            `;
        });
        console.log(tabledata );
        document.getElementById("idCheckinBody").innerHTML = tabledata;
    } catch (error) {
        console.error(error);
    }
}

async function SaveCheckin(){
    const data = {firstName: document.getElementById("idGuestName").value , 
    contactNumber:document.getElementById("idContactNumber").value , 
    email:document.getElementById("idEmail").value , 
    category:document.getElementById("IdType").value, 
    IdProofNumber:document.getElementById("idDocumentId").value , 
    hrId:document.getElementById("idcustomerId").value ,
    arrivalDate:(document.getElementById("idArrivalDate").value).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) , 
    arrivalTime:document.getElementById("idarrivalTime").value, 
    depart_Date:(document.getElementById("idDepartDate").value).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    TotalPax:document.getElementById("idtotalPax").value, 
    departureTime:document.getElementById("iddepartureTime").value, 
    Male:document.getElementById("idMale").value, 
    feMale:document.getElementById("idFemale").value, 
    otherSex:document.getElementById("idOther").value, 
    tariff:document.getElementById("idRoomtype").value, 
    CheckinPlan:document.getElementById("idCheckinPlan").value, 
    roomId:document.getElementById("idRoom").value, 
    Estimate:document.getElementById("idEstimate").value, 
    //discPercentage:document.getElementById("iddiscPercentage").value, 
    discAmount:document.getElementById("iddiscAmount").value, 
    spRent:document.getElementById("idspRent").value, 
    planAmount:document.getElementById("idplanAmount").value, 
    tariffRent:document.getElementById("idtariffRent").value, 
    totalAmount:document.getElementById("idtotalAmount").value, 
    Image:document.getElementById("idImage").value, 
    Plan:document.getElementById("idPlan").value, 
    CheckinBody:document.getElementById("idCheckinBody").value} 
    
    
    const saved = await fetch('/frontOffice/SaveCheckin',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
    .then(res=>{
        return res.json();
    }).catch() 
    console.log(saved)
    if(saved){
        window.location.reload();

    }
}

function loadCheckinData(loadedObject){
    const data = JSON.parse(loadedObject)
    console.log((data));
    console.log(data.depart_Date);
    document.getElementById("idGuestName").value =data.customerDetails[0].firstName, 
    document.getElementById("idContactNumber").value =data.customerDetails[0].contactNumber, 
    document.getElementById("idEmail").value =data.customerDetails[0].email, 
    document.getElementById("IdType").value=data.category, 
    document.getElementById("idDocumentId").value =data.IdProofNumber, 
    document.getElementById("idcustomerId").value=data.hrId ,
    document.getElementById("idArrivalDate").value = convertToHTMLDatetimeFormat(data.arrivalDate), 
    document.getElementById("idarrivalTime").value=data.arrivalTime, 
    document.getElementById("idDepartDate").value= convertToHTMLDatetimeFormat(data.depart_Date) ,
    document.getElementById("idtotalPax").value=data.TotalPax, 
    document.getElementById("iddepartureTime").value=data.departureTime, 
    document.getElementById("idMale").value=data.Male, 
    document.getElementById("idFemale").value=data.feMale, 
    document.getElementById("idOther").value=data.otherSex, 
    document.getElementById("idRoomtype").value=data.tariff, 
    document.getElementById("idCheckinPlan").value=data.CheckinPlan, 
    document.getElementById("idRoom").value=data.roomId, 
    document.getElementById("idEstimate").value=data.Estimate, 
    document.getElementById("iddiscAmount").value=data.discAmount, 
    document.getElementById("idspRent").value=data.spRent, 
    document.getElementById("idplanAmount").value=data.planAmount, 
    document.getElementById("idtariffRent").value=data.tariffRent, 
    document.getElementById("idtotalAmount").value=data.totalAmount, 
    document.getElementById("idImage").value=data.Image, 
    document.getElementById("idPlan").value=data.Plan, 
    document.getElementById("idCheckinBody").value=data.CheckinBody
} 
     

    function convertToHTMLDatetimeFormat(inputDateTime) {
        const dateObject = new Date(inputDateTime);
      
        // Extract date components
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
      
        // Extract time components
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');
        const seconds = String(dateObject.getSeconds()).padStart(2, '0');
      
        // Format the date and time in 'yyyy-MM-ddThh:mm' format
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      
        return formattedDateTime;
      }