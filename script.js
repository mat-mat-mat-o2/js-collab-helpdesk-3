let ticketCounter=0;

const tickety = [];

document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addTicket();
});

function dataSanitization(id, title, status, priority){
    title=title.trim();
    if(id===null || id>10**99){
        return false;
    } else if(title.length<3 || title.length>80){
        return false;
    } else if(status!=='new' && status!=='doing' && status!=='done'){
        return false;
    } else if(priority!=='low' && priority!=='normal' && priority!=='high'){
        return false;
    }
    
    return true;
}

function addTicket()
{
    const form = document.getElementById('ticketForm');
    const formData = new FormData(form);

    formData.append('status', 'new');
    formData.set('id', ticketCounter);

    if(dataSanitization(formData.get('id'), formData.get('title'), formData.get('status'), formData.get('priority'))){
        ticketCounter += 1;
        console.log(true);
        tickety.push({id: formData.get('id'), title: formData.get('title'), status: formData.get('status'), priority: formData.get('priority')});
        console.log(tickety[0].status);
    }
    
}

function readTicketData()
{
    
}

function filter()
{
    const value_filter = document.getElementById('statusFilter').value;
    console.log(value_filter);
}