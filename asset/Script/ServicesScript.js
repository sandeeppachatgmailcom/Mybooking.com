const { json } = require("express");

 
function loadserviceobject(){
const serviceObject = {
 Serviceindex : document.getElementById("iDServiceindex").value ,
 ServiceName : document.getElementById("iDServiceName").value ,
 ServiceImages1 : document.getElementById("iDServiceImages1").value ,
 ServiceImages2 : document.getElementById("iDServiceImages2").value ,
 ServiceImages3 : document.getElementById("iDServiceImages3").value ,
 ServiceImages4 : document.getElementById("iDServiceImages4").value ,
 hsnCode : document.getElementById("iDhsnCode").value ,
 username : document.getElementById("loggeduser").value ,
 blocked : document.getElementById("iDblocked").value ,
 ServiceAmount : document.getElementById("iDAmount").value ,
}
return serviceObject;
}
 



async function UploadImage(idinputElement, IdOutElement, IdStoreElement) {
    let formData = new FormData();
    roomImageInput = document.getElementById(idinputElement)
    for (const file of roomImageInput.files) {
        formData.append("roomiMages", file);
    }
    console.log(formData);
    if (formData) {
        const result = await fetch('/DocumentUpload/uploadImage', { method: 'post', body: formData }
        )
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            })
        if (result) {
            console.log(result)
            document.getElementById(IdOutElement).style.backgroundImage = 'url(' + result + ')';

        }
        return result
    }

}


async function saveService(){
    const serviceObject = {
        Serviceindex : document.getElementById("iDServiceindex").value ,
        ServiceName : document.getElementById("iDServiceName").value ,
        ServiceImages1 : await UploadImage('iDServiceImages1','idImage1Div11','iDServiceImages1') ,
        ServiceImages2 : await  UploadImage('iDServiceImages2','idImage1Div22','iDServiceImages2') ,
        ServiceImages3 :await  UploadImage('iDServiceImages3','idImage1Div33','iDServiceImages3') ,
        ServiceImages4 :await  UploadImage('iDServiceImages4','idImage1Div44','iDServiceImages4')  ,
        hsnCode : document.getElementById("iDhsnCode").value ,
        username : document.getElementById("loggeduser").innerText ,
        blocked : document.getElementById("iDblocked").checked ,
        ServiceAmount : document.getElementById("iDAmount").value 
       }
       console.log(serviceObject);
    //const data =  loadserviceobject();
    let result =await fetch('/facilty/saveFacilty',{ method: 'POST', headers: { "Content-Type": "Application/json" }, body: JSON.stringify(serviceObject) })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err);
    })
    console.log(result);
    if(result.saved){alert("Service Saved Success!!!")
     window.location.reload()
}
    else if(result.updated){alert("Service Saved Success!!!")
     window.location.reload()
}
    else if(result.exist){alert("No Changes found ")}
     
    
}
function loadServiceDatas(inputObj){
     
    serviceDataObj= JSON.parse(inputObj);
    console.log( JSON.parse(inputObj));
    console.log(serviceDataObj,'serviceDataObj');
      document.getElementById("iDServiceindex").value = serviceDataObj.Serviceindex ;
      document.getElementById("iDServiceName").value = serviceDataObj.ServiceName  ;
     document.getElementById("idImage1Div11").style.backgroundImage = "url('" + serviceDataObj.ServiceImages1  + "')";
      document.getElementById("idImage1Div22").style.backgroundImage = "url('" + serviceDataObj.ServiceImages2  + "')";
       document.getElementById("idImage1Div33").style.backgroundImage = "url('" + serviceDataObj.ServiceImages3  + "')";
      document.getElementById("idImage1Div44").style.backgroundImage = "url('" + serviceDataObj.ServiceImages4  + "')";
      document.getElementById("iDhsnCode").value = serviceDataObj.hsnCode;
      document.getElementById("loggeduser").value = serviceDataObj.username ;
      document.getElementById("iDblocked").value = serviceDataObj.blocked ;
      document.getElementById("iDAmount").value = serviceDataObj.ServiceAmount; 
}
 
