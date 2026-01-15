const processes = [];

const form = document.getElementById("processFormMain");
const outputSection = document.getElementById("output");
const tableBody = document.getElementById("processTable");
const startBtn = document.getElementById("startBtn");
const ganttDiv = document.getElementById("gantt");
const cpuParamsDiv = document.getElementById("cpuParams");
const resetBtn = document.getElementById("resetBtn");

form.addEventListener('submit', function(event){
    event.preventDefault();

    // Leggi i valori del form
    const pid = document.getElementById("pidMain").value;
    const arrival = parseInt(document.getElementById("arrivalMain").value);
    const burst = parseInt(document.getElementById("burstMain").value);
    const priority = parseInt(document.getElementById("priorityMain").value);

    // Inserisci processo nell'array
    processes.push({id: pid, arrival: arrival, burst: burst, priority: priority});

    // Ordinamento decondo il criterio FCFS
    processes.sort((a, b) => a.arrival - b.arrival);

    // Mostra la sezione output
    outputSection.hidden = false;

    // Aggiorna la tabella
    tableBody.innerHTML = '';
    processes.forEach(proc => {
        const row = `<tr>
        <td>${proc.id}</td>
        <td>${proc.arrival}</td>
        <td>${proc.burst}</td>
        <td>${proc.priority}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    // Resetta form
    form.reset();
});

startBtn.addEventListener('click', function(){
    if (processes.length === 0){
        ganttDiv.innerHTML = '';
        cpuParamsDiv.innerHTML = '';

        // Simulazione FCFS
        let currentTime = 0;
        let totalWaiting = 0;
        let totalTurnaround = 0;

        processes.forEach(proc => {
            let start = Math.max(currentTime, proc.arrival);
            let end = start + proc.burst;
            totalWaiting += start - proc.burst;
            totalTurnaround += end - proc.arrival;
            currentTime = end; 

            const ganttBlock = document.createElement('div');
            ganttBlock.style.width = `${proc.burst * 30}px`; // 30px per unità
            ganttBlock.textContent = `${proc.id} (${start}-${end})`;
            ganttDiv.appendChild(ganttBlock);
        });

        const n = processes.length;
        cpuParamsDiv.innerHTML = `<p>Tempo medio di attesa: ${(totalWaiting / n).toFixed(2)}</p>
                                <p>Tempo medio di completamento: ${(totalTurnaround / n).toFixed(2)}</p>`;
    }
});

resetBtn.addEventListener('click', function(){
    processes.length = 0;
    tableBody.innerHTML = '';
    ganttDiv.innerHTML = '';
    cpuParamsDiv.innerHTML = '';
    outputSection.hidden = true;
});