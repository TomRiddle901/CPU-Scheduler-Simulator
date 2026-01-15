const processes = [];

const form = document.getElementById("processFormMain");
const outputSection = document.getElementById("output");
const tableBody = document.getElementById("processTable");

form.addEventListener('submit', function(event){
    event.preventDefault();

    // Leggi i valori del form
    const pid = document.getElementById("pidMain");
    const arrival = document.getElementById("arrivalMain");
    const burst = document.getElementById("burstMain");
    
});