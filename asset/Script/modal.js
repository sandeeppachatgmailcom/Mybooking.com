async function loginvendure(){
    const data = {Username : document.getElementById('idUserName').value ,
    Password : document.getElementById('idUserPassword').value }
    
    
    const  result = await fetch ('/authenticate/vendurelogin',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
    .then( res=>{
        return res.json()
    })
    .catch(err=>{
        
    })
    
    window.location.assign("/vedurehomepage/loadhomepage");
    
  }
  