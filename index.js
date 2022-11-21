const API_KEY = "R1mZdISX9KT4HS41pYRy3OmQsc1mDamg";


// create function "trending"  to show trending gifs on home page

const trending = async () => {

    try {

        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=25&rating=g`)
        let data = await response.json();
        append(data.data);

    } catch (error) {
        console.log(error)

    }

};
trending()
const append = async (data) => {

    data.forEach((el) => {

        let trendings = document.getElementById("trendings")


        let images = document.createElement("img")
        images.src = el.images.downsized.url;
        trendings.append(images)

        images.addEventListener("click", () => {
            details_gif(el.id)
        })


    })


}
//creating function to open clicked gif in other tab 

const details_gif = async (id) => {

    localStorage.setItem("details", JSON.stringify(id))
    window.location.href = "/gif_details.html"

}



let random_gif = document.getElementById("random");
random_gif.addEventListener("click", () => {
    random()
})

const random = async () => {

    let gif = document.getElementById("trendings")
    gif.innerHTML = null;

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`)

        let data = await response.json();
        console.log(data.data)



        let img = document.createElement("img")
        img.src = data.data.images.original_still.url;
        gif.append(img)

        img.addEventListener("click", () => {
            details_gif(data.data.id)
        })



    } catch (error) {
        console.log(error)
    }



}
// categories
// sort gifs with categories once clicked on categories button 
//also show sortig button 

let categories_gif = document.getElementById("categories");
categories_gif.addEventListener("click", () => {
    categories()
})

const categories = async () => {

    let categories = document.getElementById("trendings")
    categories.innerHTML = null


    try {

        const response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${API_KEY}`)
        let result = await response.json();
        localStorage.setItem("categories", JSON.stringify(result.data))



        sorting = document.getElementById("sorting")

        let sorting_z_a = document.createElement("button")
        sorting_z_a.innerText = "ZtoA"

        sorting.append(sorting_z_a)

        let sorting_a_z = document.createElement("button")
        sorting_a_z.innerText = "AtoZ"
        sorting.append(sorting_a_z)

        let sort;

        sorting_z_a.onclick = () => {
            sorting_cat(sort = false);

        }
        sorting_a_z.onclick = () => {
            sorting_cat(sort = true);

        }



        result.data.forEach((el) => {
            let name = document.createElement("p")
            name.innerHTML = el.name

            let images = document.createElement("img")
            images.src = el.gif.images.downsized.url;
            images.addEventListener("click", () => {
                details_gif(el.gif.id)
            })

            categories.append(name, images)

        })



    } catch (error) {
        console.log(error)

    }

};

const sorting_cat = (sort) => {
    // it will only run if sort is true

    let data = JSON.parse(localStorage.getItem("categories"))
    if (sort == false) {
        data = data.reverse();
    }

    //it will run every time
    let sorted = document.getElementById("trendings")
    sorted.innerHTML = null
    // console.log(data)


    data.forEach((el) => {
        let name = document.createElement("p")

        name.innerHTML = el.name

        let images = document.createElement("img")
        images.src = el.gif.images.downsized.url;
        images.addEventListener("click", () => {
            details_gif(el.gif.id)
        })

        sorted.append(name, images)

    })



}

//search with type
//type something and respective gifs must show


let gifs= document.getElementById("gify");
gifs.addEventListener("click", () => {
    gify()
})





let search = document.getElementById("search")
search.addEventListener("input",function(){

    debounce(gify,1000)
})

async function gify() {

    let trendings= document.getElementById("trendings")
    trendings.innerHTML=null

    

    let gify_name = document.getElementById("search").value

    



    try {
        let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${gify_name}&limit=25&offset=0&rating=g&lang=en`);
        


        let res = await response.json(); 
        console.log(res.data)

        res.data.forEach((el) => {
            let name = document.createElement("p")
    
            name.innerHTML = el.name
    
            let images = document.createElement("img")
            images.src = el.images.downsized.url;
            images.addEventListener("click", () => {
                details_gif(el.gif.id)
            })
    
            trendings.append(name, images)
    
        })


        

    }
    catch (err) {
        console.log('err:', err);
    }

}


let id;

function debounce(func,delay){

    if(id){
        clearTimeout(id);
    }

    
    id=setTimeout(function(){
        func();
        
    },delay);

}









//translate

let translate_btn = document.getElementById("translate_btn");
translate_btn.addEventListener("click", () => {
    translates()
})


const translates = async () => {

    let translates = document.getElementById("trendings")
    translates.innerHTML = null;

    let query = document.getElementById("search").value

    if (query == "") {
        alert("please provide the input")

    }
    let response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=${query}`)

    let data = await response.json();
    console.log(data)


    let p = document.createElement("p")
    p.innerHTML = data.data.title;


    let images = document.createElement("img")
    images.src = data.data.images.original.url;
    translates.append(images, p)




}











