const Razorpay = require('razorpay')

var instance = new Razorpay({
    key_id: 'rzp_test_6damh00ndxLBqq',
    key_secret: 'd7Y4vbTqZb7fOwcYIjWRpt6U',
  });



   

  
async function RazorCreateOrder(amount,invoiceNumber){
   
    let options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: invoiceNumber
      };
      return await instance.orders.create(options)
    
}

async function razorMatchPayment(paymentID){
    

      return await instance.payments.fetch(paymentID)
    
    
}

async function razorRefundPayment(paymentID){
    return await instance.payments.refund(paymentID)
}
module.exports = {RazorCreateOrder,razorMatchPayment,razorRefundPayment}