

async function cancelBooking(bookingID){
const result = await fetch ('/user/cancelBooking',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify({bookingID:bookingID})})
.then(res=>{
    
    return res.json()
})
.catch(err=>{
    console.log(err);
})
if(!result.status){
    swal({
            title: "Failed",
            text: result.message,
            icon: "error",
            button: "OK",
          });
}
else {
    swal({
        title: "success",
        text: result.message,
        icon: "success",
        button: "OK",
      });
}
console.log(result)
}
async function paymentHistory(userID){
    console.log(userID);
const data ={
    userID :userID  
} 
const result = await fetch('/user/getPaymentHistory',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
.then(res=>{
    return res.json();
})
.catch(err=>{
    console.log(err);
})
console.log(result);
}