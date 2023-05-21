//https://dog.ceo/api/breeds/image/random


//API Setup
function getDog(){
    return new Promise((resolve, reject)=>{
        const request = new XMLHttpRequest();
        request.open('Get','https://dog.ceo/api/breeds/image/random');
        
        request.addEventListener('load', function (){
            const data = JSON.parse(request.responseText);
            console.log(data);

            resolve(data);
        });
        request.addEventListener('error', function(){
            reject(new Error('Error fetching dog from api to dog.js'))
        })
        request.send();
    });
}

//const getHtml = document.querySelector('.htmlElement') 

//Html Setup
/* const testImg = document.querySelector("#dogimg");

console.log(testImg.src); */
//Fetch


export{getDog}


