

console.log("javascript is loaded");





const weatherForm=document.querySelector('form');
const search=document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('testing');

    const location=search.value;
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{

    
        response.json().then((data)=>{

            console.log('data in fetch side:'+data);
            if(data.error)
            {
                console.log('Fetch error');
                console.log(data.error);
            }
            else{
                console.log('Fetch error passed');
                console.log(data.location);
                console.log(data.forecast);
            }
        })  
    })
})