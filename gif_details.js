const  API_KEY = "R1mZdISX9KT4HS41pYRy3OmQsc1mDamg";
let id = JSON.parse(localStorage.getItem("details"));
console.log(id)


const details = async () => {

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`)
        let data = await response.json();

        console.log(data.data)

        append(data.data);
        

    } catch (error) {
        console.log(error)
    }





}

details()


    const append = (data)=>{

        let detail = document.getElementById("detail")
    
    
        let p= document.createElement("p")
        p.innerHTML= data.title;
    
        
        let images = document.createElement("img")
        images.src=data.images.original.url;
        detail.append(images,p)
    
    
       
    };



