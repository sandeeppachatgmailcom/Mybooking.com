
function readmoreplan(Element,toggleElement){
     
    document.getElementById(Element).style.display='none'
    document.getElementById(toggleElement).style.display='contents' 
   } 
   function readlesspaln(Element,toggleElement){  
     
    document.getElementById(toggleElement).style=null
    document.getElementById(toggleElement).style.display='none'
    document.getElementById(Element).style.display=''
    document.getElementById(Element).style.height='20px'
    document.getElementById(Element).style.overflow='hidden'
     
   }  

   function CalculateRentWithPlan(input){
     
    let temp = input.split(',')
    
    const SalesDetails ={
            planCapacity:parseInt( temp[0]),
            planAmount:parseInt( temp[1]),
            planExtraCharge:parseInt( temp[2]),
            rentExtraCharge:parseInt( temp[3]),
            rentExtraPersonCount:parseInt( temp[4]),
            rentSpecialAmount:parseInt( temp[5]),
            rentTotalDays:parseInt( temp[6]),
            rentTotalRooms:parseInt( temp[7]),
            totalOccupancy:parseInt( temp[8]),
            planIndex:temp[9]
    }
    const rent = SalesDetails.rentTotalRooms*SalesDetails.rentTotalDays*SalesDetails.rentSpecialAmount;
    const rentExtraPax = SalesDetails.rentExtraPersonCount*SalesDetails.rentExtraCharge*SalesDetails.rentTotalDays;
    const planExtraPax= SalesDetails.totalOccupancy- (SalesDetails.planCapacity*SalesDetails.rentTotalRooms)
    const planCharge = SalesDetails.planAmount*SalesDetails.rentTotalRooms;
    let planExtraCharge = planExtraPax* SalesDetails.planExtraCharge;
    if(planExtraCharge<0) planExtraCharge=0;
    const TotalAmount = rent+rentExtraPax+planCharge+planExtraCharge;
     
     
    document.getElementById('idplanAmountReservation').innerText = planCharge+planExtraCharge+'/-';
    document.getElementById('idfinalAmount').innerText = TotalAmount ;
    document.getElementById("idCheckinPlan").innerText =  SalesDetails.planIndex;
    
}

async function saveReservation(bookingDetails) {
  let data = JSON.parse(bookingDetails);
  data.checkinplan = document.getElementById("idCheckinPlan").innerText;
  data.totalAmount = document.getElementById("idfinalAmount").innerText;
  data.specialRequest = document.getElementById("idSpecialRequest").value;
  
  const result = await fetch("/reservation/savereservation", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
    var options = {
    key: "rzp_test_6damh00ndxLBqq",
    amount: result.totalAmount * 100,
    currency: "INR",
    name: "Machintko",
    order_id: result.order.id,
    handler:async function (response) {
      response.bookingDetails = bookingDetails;
      response.reservationNumber = result.result.reference
      // After successful payment, send confirmation to the server
      await fetch("/reservation/confirmPayment", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      })
        .then((res) => res.json())
        .then((confirmPayment) => {
         
        })
        .catch((err) => {
          console.log(err);
        });
    },
  };

  var rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", function (response) {
    // Handle payment failure if needed
  });
  rzp1.open();
}



