let card=document.querySelector(".cards");
let all=document.querySelector("#id-all");
let men=document.querySelector("#id-men");
let ele=document.querySelector("#id-electronics");
let woman=document.querySelector("#id-woman");
let input=document.querySelector(".search");
let price50=document.querySelector("#id-50");
let price100=document.querySelector("#id-100");
let price500=document.querySelector("#id-500");
let price1000=document.querySelector("#id-1000");
let side=document.querySelector(".side");




let list = JSON.parse(localStorage.getItem("cartList")) || [];
side.innerHTML = list.length;

async function data() {
    const req =await fetch('https://fakestoreapi.com/products');
    const get= await req.json();
 
    allCards=[]
   
    get.map((para)=>{
     const body=document.createElement("div");
     body.setAttribute("class","card p-3 text-center mt-3")
     card.appendChild(body)


     const solution=document.createElement("div");
     solution.setAttribute("class"," d-flex justify-content-center")
     body.appendChild(solution)


     const img=document.createElement("img");
     img.setAttribute("src",para.image);
     solution.appendChild(img)
     img.setAttribute("class"," card-img-top img-fluid w-50")
     const cardbody=document.createElement("div")
     cardbody.setAttribute("class","card-body")
     body.appendChild(cardbody)


     const title=document.createElement("h6")
     title.setAttribute("class","card-title")
     const titletext=document.createTextNode(para.title)
     title.appendChild(titletext)
     cardbody.appendChild(title)



     const text=document.createElement("p")
     text.setAttribute("class","card-text")
     const des=document.createTextNode("Some quick example ")
     text.appendChild(des)
     cardbody.appendChild(text)



     const price=document.createElement("h5")
     price.setAttribute("class","text-danger")
     const product=document.createTextNode(`$ ${para.price}`)
     price.appendChild(product)
     cardbody.appendChild(price)


     const buy=document.createElement("button");
     buy.innerHTML="Buy This Product"
     buy.setAttribute("class","btn btn-outline-dark fw-bold mt-1 button-add")
     buy.setAttribute("data-id", para.id);
     cardbody.appendChild(buy)


     let cat=document.createElement("p");
     cat.innerHTML=`${para.category}`;
     cardbody.appendChild(cat);

   document.querySelectorAll(".button-add").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      if (!list.includes(id)) {
         list.push(id);
        localStorage.setItem("cartList", JSON.stringify(list));    
      }
       side.innerHTML = list.length;
   });
 });

    
     allCards.push({ element: body, category: para.category, productprice: para.price, ides: para.id, img:img, ptitle:para.title  });

})



};




    function filterprice(min, max ) {
      allCards.forEach(({ element, productprice }) => {
        if (productprice >= min && productprice <= max) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    }
    function filterCards(categories) {
      allCards.forEach(({ element, category }) => {
        if (categories.includes("all") || categories.some(cat => category.toLowerCase().includes(cat))) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    }
    



    all.addEventListener("click",()=>{
      all.classList.add("active")
      men.classList.remove("active")
      ele.classList.remove("active")
      woman.classList.remove("active")
    
    filterCards(["all"])
    })
  

     men.addEventListener("click",()=>{
      all.classList.remove("active")
      men.classList.add("active")
      ele.classList.remove("active")
      woman.classList.remove("active");

      filterCards(["men's clothing"])
    });

 
    ele.addEventListener("click",()=>{
      all.classList.remove("active")
      men.classList.remove("active")
      ele.classList.add("active")
      woman.classList.remove("active")
      filterCards(["electronics"])
  
    })

    woman.addEventListener("click",()=>{
      all.classList.remove("active")
      men.classList.remove("active")
      ele.classList.remove("active")
      woman.classList.add("active")

      filterCards(["women's clothing","jewelery"]) 

  
    })

    input.addEventListener("keydown",(e)=>{
      if(e.key==="Enter"){
        search=input.value;
       
      }   
  
  
     if(search.includes("men" )|| search.includes("MEN")){
       filterCards(["men's clothing"])    
     }
  
  
     if(search.includes("electronics" )|| search.includes("ELECTRONICS")){
      filterCards(["electronics"])    
    }
  
    
    if(search.includes("WOMEN" )|| search.includes("women")){
     
      filterCards(["women's clothing"]) 
    }
    if(search.includes("jewelery" )|| search.includes("JEWELERY")){
     
      filterCards(["jewelery"])
    }
  
  
  
  })
  //now pricing categorie funtions started
  price50.addEventListener("click",()=>{
    price50.classList.add("active")
    price100.classList.remove("active")
    price500.classList.remove("active")
    price1000.classList.remove("active")

    filterprice(1,50)
  })
  price100.addEventListener("click",()=>{
    price50.classList.remove("active")
    price100.classList.add("active")
    price500.classList.remove("active")
    price1000.classList.remove("active")
    filterprice(50,100)
  })

  price500.addEventListener("click",()=>{
    price50.classList.remove("active")
    price100.classList.remove("active")
    price500.classList.add("active")
    price1000.classList.remove("active")
    filterprice(100,500)
  })

  price1000.addEventListener("click",()=>{
    price50.classList.remove("active")
    price100.classList.remove("active")
    price500.classList.remove("active")
    price1000.classList.add("active")
    filterprice(500,1000)
  })

 
  




       
      
       
        data()
 
