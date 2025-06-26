let email=document.querySelector(".email");
let password=document.querySelector(".password");
let user=document.querySelector(".user");
let btn=document.querySelector(".btn")



btn.addEventListener("click",()=>{
  let check= true;
   if(user.value==""){
    check= false;
     document.querySelector(".eroor-1").innerHTML=`<small class="text-danger">username is required</small>`
   }else{
    document.querySelector(".eroor-1").innerHTML=`<small class="text-success">username is  taken</small>`
   }
   if(email.value==""){
    check= false;
    document.querySelector(".eroor-2").innerHTML=`<small class="text-danger">email is required</small>`
  }else{
   document.querySelector(".eroor-2").innerHTML=`<small class="text-success">email is  taken</small>`
  }
  if(password.value==""){
    check= false;
    document.querySelector(".eroor-3").innerHTML=`<small class="text-danger">address is required</small>`
  }else{
   document.querySelector(".eroor-3").innerHTML=`<small class="text-success">address is  good</small>`
  }
   
  if(check== false){
    document.querySelector(".head").innerHTML=`<p class="text-danger mt-1">ALL THE ABOVE INFORMATIONS ARE REQUIRED</p>`
  }else{
     document.querySelector(".head").innerHTML=`<p class="text-success mt-1"> YOUR ORDER IS SUCCEFULLY CREATED</p>`
  }
})