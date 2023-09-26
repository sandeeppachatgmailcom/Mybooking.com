

async function SaveCompany() {

    let companyform = new FormData();
    companyform.append("firstname", document.getElementById("idFirstName").value)
    companyform.append("CompanyID", document.getElementById("idCompanyID").value)
    companyform.append("lastName", document.getElementById("idlastName").value)
    companyform.append("contactNumber", document.getElementById("idcontactNumber").value)
    companyform.append("secondaryNumber", document.getElementById("idsecondaryNumber").value)
    companyform.append("email", document.getElementById("idemail").value)
    companyform.append("buildingNumber", document.getElementById("idbuildingNumber").value)
    companyform.append("BuildingNameName", document.getElementById("idBuildingNameName").value)
    companyform.append("StreetName", document.getElementById("idStreetName").value)
    companyform.append("district", document.getElementById("iddistrict").value)
    companyform.append("city", document.getElementById("idcity").value)
    companyform.append("pincode", document.getElementById("idpincode").value)
    companyform.append("state", document.getElementById("idstate").value)
    companyform.append("country", document.getElementById("idcountry").value)
    companyform.append("Active", document.getElementById("idActive").checked)
    companyform.append("pancard", document.getElementById("idpancard").value)
    companyform.append("RegisteredDate", document.getElementById("iddor").value)
    companyform.append("createduser", document.getElementById("loggeduser").value)
    companyform.append("Companydiscription", document.getElementById("idCompanydiscription").value)

    const compImageInput2 = document.getElementById('IdCompanyImages2');
    for (let file of compImageInput2.files) {
        companyform.append("roomiMages", file);
    }
    const compImageInput = document.getElementById('IdCompanyImages1');
    for (let file of compImageInput.files) {
        companyform.append("roomiMages", file);
    }


    const result = await fetch('/Company/SaveCompany', { method: 'POST', body: companyform }).
        then(res => {
            return res.json();
        }).catch(err => {
            console.log(err);
        })
    console.log(result);
    if (result) {
        window.location.reload();
    }
}

function convertToUpperCase() {
    var input = document.getElementById("myInput");
    input.value = input.value.toUpperCase();
}

function loadpage(pagenumber) {

}
function uploadImageToParent(fileInputId, parentElementId, relativeElementID) {
    const fileInput = document.getElementById(fileInputId);
    const parentElement = document.getElementById(parentElementId);
    const relativeElement = document.getElementById(relativeElementID);
    if (fileInput.files.length > 0) {
        const imageUrl = URL.createObjectURL(fileInput.files[0]);
        parentElement.style.backgroundImage = `url(${imageUrl})`;
        relativeElement.style.backgroundImage = `url(${imageUrl})`;
    } else {

        parentElement.style.backgroundImage = 'none';
        relativeElement.style.backgroundImage = 'none';
    }
}
async function loadPincode() {
    const data = {
        pincode: document.getElementById('idpincode').value
    };

    try {


        const response = await fetch('/authenticate/loadPincode', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        const selectcity = document.getElementById('idcity');
        const selectdistrict = document.getElementById('iddistrict');
        const selectstate = document.getElementById('idstate');
        const selectcountry = document.getElementById('idcountry');
        while (selectcity.options.length > 0) {
            selectcity.remove(0);
        }
        while (selectdistrict.options.length > 0) {
            selectdistrict.remove(0);
        }
        while (selectstate.options.length > 0) {
            selectstate.remove(0);
        }
        while (selectcountry.options.length > 0) {
            selectcountry.remove(0);
        }

        let city = new Set();
        let district = new Set();
        let state = new Set();
        let country = new Set();

        console.log(result, 'result');

        if (result) {
            result.forEach(item => {
                city.add(item.officename);
                district.add(item.Districtname);
                state.add(item.statename);
                country.add("India");
            });
        }

        
        city.forEach(cityName => {
            const newOption = document.createElement('option');
            newOption.value = cityName;
            newOption.textContent = cityName;
            selectcity.appendChild(newOption);
            
        });

        district.forEach(districtName => {
            const newOption = document.createElement('option');
            newOption.value = districtName;
            newOption.textContent = districtName;
            selectdistrict.appendChild(newOption);
             
        });

        state.forEach(stateName => {
            const newOption = document.createElement('option');
            newOption.value = stateName;
            newOption.textContent = stateName;
            selectstate.appendChild(newOption);
            
        });

        country.forEach(countryName => {
            const newOption = document.createElement('option');
            newOption.value = countryName;
            newOption.textContent = countryName;
            selectcountry.appendChild(newOption);
            
        });
    } catch (err) {
        console.error(err);
    }
}

async function loadCompanies(value) {
    const company = JSON.parse(value);
    console.log(company);
    document.getElementById("idpincode").value = company.pincode;
    await loadPincode();
    document.getElementById("idFirstName").value = company.firstName;
    document.getElementById("idCompanyID").value = company.CompanyID;
    document.getElementById("idlastName").value = company.lastName;
    document.getElementById("idcontactNumber").value = company.contactNumber;
    document.getElementById("idsecondaryNumber").value = company.secondaryNumber;
    document.getElementById("idemail").value = company.email;
    document.getElementById("idbuildingNumber").value = company.buildingNumber;
    document.getElementById("idBuildingNameName").value = company.BuildingName;
    document.getElementById("idStreetName").value = company.StreetName;
    document.getElementById("iddistrict").value = company.district;
    document.getElementById("idcity").value = company.city;
    document.getElementById("idstate").value = company.state;
    document.getElementById("idcountry").value = company.country;
    document.getElementById("idActive").checked = company.Active;
    document.getElementById("idpancard").value = company.pancard;
    document.getElementById("iddor").value = convertToHTMLDatetimeFormat(company.RegisteredDate);
    document.getElementById("idpancard").value = company.pancard;
    document.getElementById("idCompanydiscription").value = company.Companydiscription;
    document.getElementById("IdCompanyImagesbuton2").style.backgroundImage = "url('" + company.image2 + "')";
    document.getElementById("IdCompanyImagesbuton1").style.backgroundImage = "url('" + company.image1 + "')";
    document.getElementById("idShowCompanyImage2").style.backgroundImage = "url('" + company.image2 + "')";
    document.getElementById("idShowCompanyImage1").style.backgroundImage = "url('" + company.image1 + "')";
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

async function saveTariffToCompanies(tariffIndex){
    
    const id = tariffIndex;
    alert(document.getElementById(`idCompTariffname+${id}`).value);
    newTariff = {
        tariffName: document.getElementById(`idCompTariffname+${id}`).value ,
        roomRentSingle: document.getElementById(`idRent-Single+${id}`).value,
        specialRent:document.getElementById(`idSpecialRent+${id}`).value,
        extraPerson: document.getElementById(`idExtraPerson+${id}`).value,
        tax: document.getElementById(`IdTaxrate+${id}`).value,
        includeChild: document.getElementById(`idincludeChild+${id}`).checked,
        defaultCheckinplan: document.getElementById(`IdDefaultPlan+${id}`).value,
        username: document.getElementById(`loggeduser`).innerHTML,
        tariffIndex: document.getElementById(`IdTariffIndex+${id}`).value,
        Discription:document.getElementById(`iddiscription+${id}`).value,
        CompanyID:document.getElementById(`idCompanyId+${id}`).innerText 
    }
    console.log(newTariff),'new tariff';
    const result = await fetch('/vedurehomepage/saveTariff',{method:'post',headers:{"Content-Type":"application/json"},body:JSON.stringify(newTariff)})
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    })
    console.log(result);
    if(result.update){
        swal({
            title: "success",
            text: "Tariff updated!",
            icon: "success",
            button: "OK",
          });
        
          disabletariffModal(id)
    }
    else if(result.saved){
        swal({
            title: "success",
            text: "Tariff added!",
            icon: "success",
            button: "OK",
          });
        
          disabletariffModal(id)
    }
    else if(result.matched){
        swal({
            title: "success",
            text: "No changes found!",
            icon: "success",
            button: "OK",
          });
        
          disabletariffModal(id)
    }
}

function disabletariffModal(id){
    console.log(id);
    document.getElementById(`idCompTariffname+${id}`).readOnly =true,
    document.getElementById(`idRent-Single+${id}`).readOnly =true,
    document.getElementById(`idSpecialRent+${id}`).readOnly =true,
    document.getElementById(`idExtraPerson+${id}`).readOnly =true,
    document.getElementById(`IdTaxrate+${id}`).readOnly =true,
    document.getElementById(`idincludeChild+${id}`).disabled =true,
    document.getElementById(`IdDefaultPlan+${id}`).readOnly =true,
    document.getElementById(`loggeduser`).readOnly =true,
    document.getElementById(`IdTariffIndex+${id}`).readOnly =true,
    document.getElementById(`iddiscription+${id}`).readOnly =true,
    document.getElementById(`idCompanyId+${id}`).readOnly =true 
}

function EnabletariiModal(id){
    console.log(id);
    document.getElementById(`idCompTariffname+${id}`).readOnly =false,
    document.getElementById(`idRent-Single+${id}`).readOnly =false,
    document.getElementById(`idSpecialRent+${id}`).readOnly =false,
    document.getElementById(`idExtraPerson+${id}`).readOnly =false,
    document.getElementById(`IdTaxrate+${id}`).readOnly =false,
    document.getElementById(`idincludeChild+${id}`).disabled  =false,
    document.getElementById(`IdDefaultPlan+${id}`).readOnly =false,
    document.getElementById(`loggeduser`).readOnly =false,
    document.getElementById(`IdTariffIndex+${id}`).readOnly =false,
    document.getElementById(`iddiscription+${id}`).readOnly =false,
    document.getElementById(`idCompanyId+${id}`).readOnly =false
    console.log(id)
}

async function freezeTariff(tariff){
    const temp = tariff.split(',');
    console.log(temp)
data = {tariffIndex:temp[0],
        CompanyID:temp[1]}
  const result = await fetch('/vedurehomepage/disableTariff',{method:'post',headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
.then(res=>{
    return res.json()
})
.catch(err=>{
    console.log(err)
}) 
if(result.update){
    swal({
        title: "success",
        text: "Tariff freezed",
        icon: "success",
        button: "OK",
      }).then((value) => {
        window.location.reload()});
    
     
}
else if(result.saved){
    swal({
        title: "success",
        text: "Tariff added!",
        icon: "success",
        button: "OK",
      });
    
      window.location.reload();
}
else if(result.matched){
    swal({
        title: "success",
        text: "No changes found!",
        icon: "success",
        button: "OK",
      });
      window.location.reload();
       
}

console.log(result);
}

async function Activateplan(tariff){
    const temp = tariff.split(',');
    console.log(temp)
    data = {tariffIndex:temp[0],
        CompanyID:temp[1]}
    const result = await fetch('/vedurehomepage/enableTariff',{method:'post',headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    }) 
    console.log(result);
    
    if(result.update){
        swal({
            title: "success",
            text: "Tariff freezed",
            icon: "success",
            button: "OK",
          });
          window.location.reload();
         
    }
    else if(result.saved){
        swal({
            title: "success",
            text: "Tariff added!",
            icon: "success",
            button: "OK",
          });
        
          window.location.reload();  
    }
    else if(result.matched){
        swal({
            title: "success",
            text: "No changes found!",
            icon: "success",
            button: "OK",
          });
          window.location.reload();
         
    }
   
}

 

async function deleteTariffPermanently(tariff){
    const temp = tariff.split(',');
    console.log(temp)
    data = {tariffIndex:temp[0],
        CompanyID:temp[1]}
    const result = await fetch('/vedurehomepage/deletetariffPermanent',{method:'post',headers:{"Content-Type":"application/json"},body:JSON.stringify(data)})
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err)
    }) 
    console.log(result);
    
    if(result.update){
        swal({
            title: "success",
            text: "Tariff freezed",
            icon: "success",
            button: "OK",
          }).then((value) => {
            window.location.reload()});
         
    }
    else if(result.saved){
        swal({
            title: "success",
            text: "Tariff added!",
            icon: "success",
            button: "OK",
          }).then((value) => {
            window.location.reload()});
        
           
    }
    else if(result.matched){
        swal({
            title: "success",
            text: "No changes found!",
            icon: "success",
            button: "OK",
          }).then((value) => {
            window.location.reload()});
         
    }
   
}