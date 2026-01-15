const processes = [];

const form = document.getElementById("processFormMain");
const outputSection = document.getElementById("output");
const tableBody = document.getElementById("processTable");

form.addEventListener('submit', function(event){
    event.preventDefault();

    // Leggi i valori del form
    const pid = document.getElementById("pidMain").value;
    const arrival = parseInt(document.getElementById("arrivalMain").value);
    const burst = parseInt(document.getElementById("burstMain").value);
    const priority = parseInt(document.getElementById("priorityMain").value);

    // Inserisci processo nell'array
    processes.push({id: pid, arrival: arrival, burst: burst, priority: priority});

    // Mostra la sezione output
    outputSection.hidden = false;

    // Aggiorna la tabella
    tableBody.innerHTML = '';
    processes.forEach(proc => {
        const row = `<tr>
        <td>${proc.id}<td>
        <td>${proc.arrival}<td>
        <td>${proc.burst}<td>
        <td>${proc.priority}<td>
        <tr>`;
        tableBody.innerHTML += row;
    });

    // Resetta form
    form.reset();
});