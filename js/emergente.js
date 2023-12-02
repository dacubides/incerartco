window.onload = init;
    function init(){
        document.querySelector(".emergente .menor").addEventListener("click",adios);
        document.querySelector(".emergente .mayor").addEventListener("click",hola);
    }
        
    function adios(){
        location.href="https://www.cartoonnetwork.es/juegos";
    }    
    function hola(){
        document.querySelector(".emergente").style.display="none";
        document.querySelector("#container").style.opacity="1";
    }    