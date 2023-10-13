

function deleteUser(id) {
    const bodyData = { id: id }; // Replace this with the appropriate data you want to send
    const del = confirm(`Do you want to proceed`);
    console.log(bodyData);
    if (del) {
        fetch('/deleteItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
            .then(() => window.location.reload())
            .catch(error => {
                // Handle any errors that occur during the fetch request
                console.log('Error:', error);
            });
    }
}



function loadElementsByButton(id) {
    const parsedItem = JSON.parse(id);
    document.getElementById("ID_Sub_Div1_Txt_Name").value = parsedItem.name;
    document.getElementById("ID_Sub_Div1_Txt_Mobile").value = parsedItem.phone;
    document.getElementById("ID_Sub_Div1_Txt_Email").value = parsedItem.email;
    document.getElementById("ID_Sub_Div2_Chkbx_Admin").checked = parsedItem.isAdmin;
    document.getElementById("ID_Sub_Div2_Chkbx_Active").checked = parsedItem.isActive;
    document.getElementById("ID_Sub_Div3_SerialNumber").value = parsedItem._id;
    document.getElementById("ID_Sub_Div3_Lbl_UserName").value = parsedItem.username;
    document.getElementById("ID_Sub_Div3_Pwd").value = parsedItem.password;
}

function ClearElementsByButton(id) {
    const parsedItem = JSON.parse(id);
    console.log(parsedItem); // This will log the _id value to the console

    // Assuming you want to access the element with the ID "ID_Sub_Div1_Txt_Name"
    document.getElementById("ID_Sub_Div1_Txt_Name").value = "";
    document.getElementById("ID_Sub_Div1_Txt_Mobile").value = "";
    document.getElementById("ID_Sub_Div1_Txt_Email").value = "";
    document.getElementById("ID_Sub_Div2_Chkbx_Admin").checked = "";
    document.getElementById("ID_Sub_Div2_Chkbx_Active").checked = "";
    document.getElementById("ID_Sub_Div1_SerialNumber").value = "";
    document.getElementById("ID_Sub_Div3_txt_UserName").text = "";
    document.getElementById("ID_Sub_Div3_Pwd").value = "";
    document.getElementById("ID_Sub_Div3_Lbl_UserName").value = "";

}
function SetFormReadOnly() {
    document.getElementById('IdHsncode').readOnly = true;
    document.getElementById('idtariffname').readOnly = true;
    document.getElementById('idRent-Single').readOnly = true;
    document.getElementById('idExtraPerson').readOnly = true;
    document.getElementById('idincludeChild').readOnly = true;
    document.getElementById('IdDefaultPlan').readOnly = true;
    document.getElementById('IdItemname').readOnly = true;
    document.getElementById('IdTaxrate').readOnly = true;
    document.getElementById('IdTariffIndex').readOnly = true;
}
function MakeHumanReadonlyFalse() {
    document.getElementById("idHid").readOnly = true,
        document.getElementById("idFirstName").readOnly = false,
        document.getElementById("idSecondName").readOnly = false,
        document.getElementById("idContactNumber").readOnly = false,
        document.getElementById("idSecondryNumber").readOnly = false,
        document.getElementById("idEmail").readOnly = false,
        document.getElementById("idHouseNumber").readOnly = false,
        document.getElementById("idHouseName").readOnly = false,
        document.getElementById("idStreetName").readOnly = false,
        document.getElementById("idDistrict").readOnly = false,
        document.getElementById("idCity").readOnly = false,
        document.getElementById("idPincode").readOnly = false,
        document.getElementById("idState").readOnly = false,
        document.getElementById("idCountry").readOnly = false,
        document.getElementById("idActive").readOnly = false,
        document.getElementById("idisAdmin").readOnly = false,
        document.getElementById("idMarried").readOnly = false,
        document.getElementById("idisLoggedIn").readOnly = false,
        document.getElementById("idPanCard").readOnly = false,
        document.getElementById("idadhaar").readOnly = false,
        document.getElementById("idDOB").readOnly = false,
        document.getElementById("idMarriedDate").readOnly = false,
        document.getElementById('idUsername').readOnly = false
}

function MakeHumanReadonly() {
    document.getElementById("idHid").readOnly = true,
        document.getElementById("idFirstName").readOnly = true,
        document.getElementById("idSecondName").readOnly = true,
        document.getElementById("idContactNumber").readOnly = true,
        document.getElementById("idSecondryNumber").readOnly = true,
        document.getElementById("idEmail").readOnly = true,
        document.getElementById("idHouseNumber").readOnly = true,
        document.getElementById("idHouseName").readOnly = true,
        document.getElementById("idStreetName").readOnly = true,
        document.getElementById("idDistrict").readOnly = true,
        document.getElementById("idCity").readOnly = true,
        document.getElementById("idPincode").readOnly = true,
        document.getElementById("idState").readOnly = true,
        document.getElementById("idCountry").readOnly = true,
        document.getElementById("idActive").readOnly = true,
        document.getElementById("idisAdmin").readOnly = true,
        document.getElementById("idMarried").readOnly = true,
        document.getElementById("idisLoggedIn").readOnly = true,
        document.getElementById("idPanCard").readOnly = true,
        document.getElementById("idadhaar").readOnly = true,
        document.getElementById("idDOB").readOnly = true,
        document.getElementById("idMarriedDate").readOnly = true,
        document.getElementById('idUsername').readOnly = true
}
function loadHumanData(item) {
    let data = JSON.parse(item)

    MakeHumanReadonly();
    document.getElementById("idHid").value = data.hrId,
        document.getElementById("idFirstName").value = data.firstName,
        document.getElementById("idSecondName").value = data.lastName,
        document.getElementById("idContactNumber").value = data.contactNumber,
        document.getElementById("idSecondryNumber").value = data.secondaryNumber,
        document.getElementById("idEmail").value = data.email,
        document.getElementById("idHouseNumber").value = data.HouseNumber,
        document.getElementById("idHouseName").value = data.HouseName,
        document.getElementById("idStreetName").value = data.StreetName,
        document.getElementById("idDistrict").value = data.district,
        document.getElementById("idCity").value = data.city,
        document.getElementById("idPincode").value = data.pincode,
        document.getElementById("idState").value = data.state,
        document.getElementById("idCountry").value = data.country,
        document.getElementById("idActive").checked = data.Active,
        document.getElementById("idisAdmin").checked = data.isAdmin,
        document.getElementById("idMarried").checked = data.married,
        document.getElementById("idisLoggedIn").checked = data.isloggedIn,
        document.getElementById("idSystemUser").checked = data.systemUser,
        document.getElementById("idPanCard").value = data.pancard,
        document.getElementById("idadhaar").value = data.adhaar,
        document.getElementById("idDOB").value = data.dob,
        document.getElementById("idMarriedDate").value = data.marriedDate
    document.getElementById('idUsername').value = data.username;
    document.getElementsByName("Gender").value = document.getElementById('flexRadioDefault1').checked
}

async function deletEdHuman() {

    const data = { hrId: document.getElementById("idHid").value }
    console.log(data)
    const result = await fetch('/Human/DeleteHuman', { method: 'post', headers: { "Content-Type": "Application/json" }, body: JSON.stringify(data) })
        .then(res => {
            return res.json()

        })
        .catch(err => {
            console.log(err)
        })
    if (result.deleted) {
        window.location.reload();
    }
}

function formAction() {
    let t = document.getElementById("Txt_search").value = 'Save';
    console.log(t)
}
function clickButton() {
    ClearElementsByButton('x');
    document.getElementById("form").action = "/save"

}
function Create() {
    document.getElementById("ID_Sub_div4_Create").style("opacity:0");
    document.getElementById("ID_Sub_div4_Submit").style.opacity = 0.1;
}
function imageload() {
    const imagepath = document.getElementById('floorimage').value;

    document.getElementById('floorimagetile').src = imagepath;
}
async function deletetariff() {
    const deletetariff = confirm('Do you want to delete?')
    console.log(deletetariff);
    const data = { tariffIndex: document.getElementById("IdTariffIndex").value }
    if (deletetariff) {
        const result = await fetch('/roomType/deleteTariff', { method: 'POST', headers: { "Content-Type": "Application/json" }, body: JSON.stringify(data) })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err)
            })
        console.log(result);
        if (result.deleted) {
            alert('tariff deleted successfully');
            window.location.reload();
        }
        console.log(result);
    }
}
async function SaveHuman() {
    const data = {
        hrId: document.getElementById('idHid').value,
        firstName: document.getElementById('idFirstName').value,
        lastName: document.getElementById('idSecondName').value,
        contactNumber: document.getElementById('idContactNumber').value,
        secondaryNumber: document.getElementById('idSecondryNumber').value,
        username: document.getElementById('idUsername').value,
        email: document.getElementById('idEmail').value,
        HouseNumber: document.getElementById('idHouseNumber').value,
        HouseName: document.getElementById('idHouseName').value,
        StreetName: document.getElementById('idStreetName').value,
        district: document.getElementById('idDistrict').value,
        city: document.getElementById('idCity').value,
        pincode: document.getElementById('idPincode').value,
        state: document.getElementById('idState').value,
        country: document.getElementById('idCountry').value,
        Active: document.getElementById('idActive').checked,
        isAdmin: document.getElementById('idisAdmin').checked,
        isSystemUser: document.getElementById('idSystemUser').checked,
        married: document.getElementById('idMarried').checked,
        isloggedIn: document.getElementById('idisLoggedIn').checked,
        pancard: document.getElementById('idPanCard').value,
        adhaar: document.getElementById('idadhaar').value,
        dob: document.getElementById('idDOB').value,
        marriedDate: document.getElementById('idMarriedDate').value,
        gender: document.getElementsByName('Gender').value,
        createduser: document.getElementsByName('loggeduser').innerHTML
    }
    console.log(data);
    const result = await fetch('/Human/SaveHuman', { method: 'POST', headers: { 'Content-Type': 'Application/json' }, body: JSON.stringify(data) })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
    if (result.saved) {
        alert('New registration done success fully');
        window.location.reload();
    }
}
function Createnew() {
    window.location.reload();
}
function loadToScreen(id) {

    const Item = JSON.parse(id);
    SetFormReadOnly()
    console.log(Item)
    document.getElementById("idtariffname").value = Item.tariffName,
        document.getElementById("idRent-Single").value = Item.roomRentSingle,
        document.getElementById("idExtraPerson").value = Item.extraPerson,
        document.getElementById("IdTaxrate").value = Item.tax,
        document.getElementById("idincludeChild").value = true,
        document.getElementById("IdDefaultPlan").value = Item.defaultCheckinplan,
        document.getElementById("IdItemname").value = Item.itemname,
        document.getElementById("IdHsncode").value = Item.HSNCode,
        document.getElementById("IdTariffIndex").value = Item.tariffIndex

}
function CreatenewHuman() {
    window.location.reload();
}
function setUser(result) {
    const data = JSON.parse(result)
    console.log(data, 'hi')

}

function Makeitreadonly() {
    document.getElementById("idtariffname").readonly = true;
    document.getElementById("idRent-Single").readonly = true;
    document.getElementById("idExtraPerson").readonly = true;
    document.getElementById("IdTaxrate").readonly = true;
    //document.getElementById("idincludeChild").readonly=true;
    //document.getElementById("IdDefaultPlan").disabled=true;
    document.getElementById("IdItemname").readonly = true;
    document.getElementById("IdHsncode").readonly = true;

}

function MakeitActive() {

    document.getElementById("idtariffname").readOnly = false;
    document.getElementById("idRent-Single").readOnly = false;
    document.getElementById("idExtraPerson").readOnly = false;
    document.getElementById("IdTaxrate").readOnly = false;
    document.getElementById("idincludeChild").readOnly = false;
    document.getElementById("IdDefaultPlan").disabled = false;
    document.getElementById("IdItemname").readOnly = false;
    document.getElementById("IdHsncode").readOnly = false;

}


async function currentUser() {
    const data =  { currentuser: document.getElementById('loggeduser').innerHTML }

    const cookie  =  { currentuser: document.cookie.split('=') }
    console.log(cookie.currentuser[1]);

    // const user = await fetch('/authenticate/findUser', { method: 'POST', headers: { "Content-Type": "Application/json" }, body: JSON.stringify(data) })
    //     .then(res => {
    //         return res.json();
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    
        document.getElementById("loggeduser").innerHTML = cookie.currentuser[1]
        
 
}
currentUser();
async function logout() {
    const data = {
        username: document.getElementById('loggeduser').innerHTML
    }
    console.log(data)
    const logoutuser = await fetch('/authenticate/logout', { method: 'POST', headers: { "Content-Type": "Application/json" }, body: JSON.stringify(data) })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
    console.log(logoutuser.logout,'result')
    if (logoutuser.logout) {

        window.location.assign("/");
       
    }
     
}


async function SaveRooms() {

    if (!document.getElementById("idroomname").value) alert('Roomname cannot be empty');
    if (!document.getElementById("idroomnumber").value) alert('idroomnumber cannot be empty');
    if (document.getElementById("idroomname").value && document.getElementById("idroomnumber").value) {
        const formData = new FormData();
        formData.append("roomName", document.getElementById("idroomname").value)
        formData.append("roomNumber", document.getElementById("idroomnumber").value)
        formData.append("userCreated", document.getElementById("loggeduser").innerHTML)
        formData.append("billing", document.getElementById("idBilling").checked)
        formData.append("rentOut", document.getElementById("idRentout").checked)
        formData.append("NormalOccupancy", document.getElementById("idNormalOccupancy").value)
        formData.append("roomIndex", document.getElementById("IdRoomindexvalue").value)
        formData.append("floor", document.getElementById("idFloorindex").value)
        formData.append("roomType", document.getElementById("idTariffIndex").value)
        formData.append("interCom", document.getElementById("idIntercom").value)
        formData.append("size", document.getElementById("idroomsize").value)
        formData.append("blocked", document.getElementById("IdBlocked1").checked)
        formData.append("maxOccupancy", document.getElementById("IdMaxOccupancy").value)
        formData.append("minimumPax", document.getElementById("IdMinOccupany").value)
        formData.append("guestId", document.getElementById("IdGuestId").value)
        formData.append("checkinId", document.getElementById("IdCheckinref").value)
        formData.append("status", document.getElementById("IDStatus").value)
        const roomImageInput = document.getElementById('IdImages');
        for (const file of roomImageInput.files) {
            formData.append("roomiMages", file);
        }
        console.log(formData)
        const result = await fetch('/rooms/SaveRooms', { method: 'POST', body: formData })
            .then(res => {

                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
        console.log('reached back');
        if (result.saved) {

            alert("Rooms Saved SuccessFully");
            window.location.reload();
        }
    }
}

async function deleteRoom() {
    let Confirmdel = confirm('Do you want to delete the room')
    if (Confirmdel) {
        data = { Roomindex: document.getElementById("IdRoomindexvalue").value }
        const result = await fetch('/rooms/deleteRoom', { method: 'POST', headers: { "Content-Type": "Application/json" }, body: JSON.stringify(data) })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err)
            })
        if (result.deleted) {
            alert('Room Deleted ')
            window.location.reload();
        }
    }
}

async function deletePlan() {
    let Confirmdel = confirm('Do you want to delete the Checkin Plan')
    if (Confirmdel) {
        data = { planIndex: document.getElementById("idplanIndex").value }
        const result = await fetch('/checkinplan/deletePlan', { method: 'POST', headers: { "Content-Type": "Application/json" }, body: JSON.stringify(data) })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err)
            })
        if (result.deleted) {
            alert('plan Deleted ')
            window.location.reload();
        }
    }
}




function loadRoomDatas(roomdata) {
    MakeRoomreadOnly()
    console.log(roomdata);
    let data = JSON.parse(roomdata)
    console.log(data);
    
    let path = data.roomiMages[0];
    document.getElementById("idIntercom").value = data.interCom,
        document.getElementById("idroomname").value = data.roomName,
        document.getElementById("idroomnumber").value = data.roomNumber,
        document.getElementById("idNormalOccupancy").value = data.NormalOccupancy,
        document.getElementById("IdRoomindexvalue").value = data.roomIndex,
        document.getElementById("idroomsize").value = data.size,
        document.getElementById("IdBlocked1").checked = data.blocked,
        document.getElementById("IdMaxOccupancy").value = data.maxOccupancy,
        document.getElementById("IdMinOccupany").value = data.minimumPax,
        document.getElementById("IdGuestId").value = data.guestId,
        document.getElementById("IdCheckinref").value = data.checkinId
        document.getElementById("idBilling").checked = data.billing,
        document.getElementById("idRentout").checked = data.rentOut,
        document.getElementById("idFloorindex").value = data.floor,
        document.getElementById("idTariffIndex").value = data.roomType,

        console.log(path)
    document.getElementById("IdRoomgaeTile1").style.backgroundImage = "url('" + path + "')";
}
function MakeRoomreadOnly() {
    document.getElementById("idroomname").readOnly = true,
        document.getElementById("idroomnumber").readOnly = true,
        document.getElementById("idNormalOccupancy").readOnly = true,
        document.getElementById("IdRoomindexvalue").readOnly = true,
        document.getElementById("idIntercom").readOnly = true,
        document.getElementById("idroomsize").readOnly = true,
        document.getElementById("IdMaxOccupancy").readOnly = true,
        document.getElementById("IdMinOccupany").readOnly = true,
        document.getElementById("IdGuestId").readOnly = true,
        document.getElementById("IdCheckinref").readOnly = true

}

function MakeRoomreadOnlyFalse() {

    document.getElementById("idroomname").readOnly = false,
        document.getElementById("idroomnumber").readOnly = false,
        document.getElementById("idNormalOccupancy").readOnly = false,
        document.getElementById("IdRoomindexvalue").readOnly = true,
        document.getElementById("idIntercom").readOnly = false,
        document.getElementById("idroomsize").readOnly = false,
        document.getElementById("IdMaxOccupancy").readOnly = false,
        document.getElementById("IdMinOccupany").readOnly = false,
        document.getElementById("IdGuestId").readOnly = false,
        document.getElementById("IdCheckinref").readOnly = false

}


async function SearchRoom() {
    const idSearchname = document.getElementById("idSearchname").value;
    const data = { searchvalue: idSearchname }
    const result = await fetch('/rooms/searchRooms', { method: 'POST', headers: { "Content-Type": "Application/json" }, data: JSON.stringify(data) })
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.log(err)
        })
    if (result) {

    }
}

async function SaveTariff() {
    newTariff = {
        tariffName: document.getElementById("idtariffname").value,
        roomRentSingle: document.getElementById("idRent-Single").value,
        extraPerson: document.getElementById("idExtraPerson").value,
        tax: document.getElementById("IdTaxrate").value,
        includeChild: document.getElementById("idincludeChild").value,
        defaultCheckinplan: document.getElementById("IdDefaultPlan").value,
        itemname: document.getElementById("IdItemname").value,
        HSNCode: document.getElementById("IdHsncode").value,
        username: document.getElementById("loggeduser").innerHTML,
        tariffIndex: document.getElementById("IdTariffIndex").value
    }
    console.log(newTariff);
    const result = await fetch('/roomType/saveCategory ', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTariff)
    })

        .then(data => {
            return data.json();
        })
        .catch(ERR => {
            console.log(ERR.message)
        })
    console.log(result);
    window.location.reload();
    if (result.Saved) alert("tariff Saved Successfully");

}

function Createnew() {
    window.location.reload();
}
function convertToCustomFormat(inputDateTime) {
    // Create a Date object from the input date-time string
    const dateObject = new Date(inputDateTime);

    // Extract date components
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = String(dateObject.getFullYear()).slice(-2); // Get the last 2 digits of the year

    // Extract time components
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');

    // Format the date and time in 'dd-mm-yy,hh-mm-ss' format
    const formattedDateTime = `${day}-${month}-${year},${hours}-${minutes}-${seconds}`;

    return formattedDateTime;
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the date input element by its ID
    const dateInput = document.getElementById("idfromDate");

    if (dateInput) {
        // Create a new Date object to represent the current date
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        // Set the default value of the date input element
        dateInput.value = formattedDate;
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Get the date input element by its ID
    const dateInput = document.getElementById("idtoDate");

    if (dateInput) {
        // Create a new Date object to represent the current date
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        // Set the default value of the date input element
        dateInput.value = formattedDate;
    }
});
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

  async function verifyOtp(){
    const mobile = document.getElementById().value ; 
  }
  
