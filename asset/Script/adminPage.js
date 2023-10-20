 



async function adminlogin( email,password){
    const data = {
        userName:document.getElementById(email).value,
        password:document.getElementById(password).value
    }
    const result = await fetch('/admin/adminLogin',{method:'post',headers:{"Content-Type":"Application/json"},body:JSON.stringify(data)})
    .then(res=>{
        return res.json()
    })
    .catch(err=>{
        console.log(err);
    })
    if(result.verified){
        window.location.href=result.path
    }
    else{
        
        document.getElementById("idMessageBarAdminlogin").textContent = 'Invalid Login Credential'
    }
    }