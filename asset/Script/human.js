 

async function loadFloorMap(){
    let fromDate = document.getElementById("idfromDate").value;
    let toDate = document.getElementById("idtoDate").value;
    if(!fromDate) fromDate= new Date();
    if(!toDate) toDate= new Date();
    data = {
     fromDate :fromDate, 
     toDate :toDate, 
     floorIndex :document.getElementById("idfloorindex").value, 
     RoomIndex :document.getElementById("idroomNumber").value, 
     TariffIndex :TariffIndex = document.getElementById("idRoomtype").value, 
     blocked  :document.getElementById("idBlocked").checked,  
     }
    console.log(data);
    const result = await fetch('/floorMap/AggregatePage',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)}).then(res=> {return  res.json()}).catch(err=>console.log(err)) 
    console.log(result);
    let tabledata = '';
    result.map((values) => {
            tabledata += `
            <div class="m-1" 
            style="background-image: url('${values.roomiMages}');border: 6px rgb(252, 202, 85, 0.866) solid;  background-color: rgba(106, 102, 102, 0); width: 15%; height: 250px;  background-position: center ;  border-radius: 5px;  background-size:cover  ;">
           
              <div class="p-1">
                  <div>
                    <div class="d-flex">
                      <h4 class="text-light ">
                        ${values.tariffMaster[0].tariffName}
                      </h4 class="text-light ">
                      <h6 class="text-light ">( MAX load: ${values.maxOccupancy})</h6>
                    </div>
                    <div class="row">
                      <div class="row">
                        <div class="col-6 text-start">
                          <button class="btn btn-transparent50" data-toggle="modal" data-target="#exampleModal"
                            style="border-radius: 50px;">
                            <h1 class="text-light ">
                              ${values.roomNumber}
                            </h1>
                          </button>
                        </div>
                        <div class="col-6 text-end">
                          <button data-bs-toggle="collapse" data-bs-target="#collapseExample"
                            class="btn  text-light  btn-transparent  bi bi-bootstrap-reboot "> </button>
                          <button class="btn  txt-success text-light   bi bi bi-box-arrow-in-down-left"> </button>
                          <button class="btn  txt-success text-light   bi bi-bell"> </button>
                        </div>
                      </div>
                    </div>
                    <div class="transparent-div">
                      <h6 class=" text-light  "> Tariff :${values.tariffMaster[0].roomRentSingle}
                      </h6>
                      <h6 class=" text-light  "> EP :${values.tariffMaster[0].extraPerson}
                      </h6>
                    </div>
                </div>
    
                </div> 
            </div>            
            `;
        });

        console.log(tabledata);
        document.getElementById("myDynamicDivinFloorMap").innerHTML=tabledata;
       
         
}


