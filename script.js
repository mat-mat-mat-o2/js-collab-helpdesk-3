let ticketCounter=0;

const tickets = [];

document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addTicket();
    filter();
});

document.getElementById("statusFilter").addEventListener("change", filter);

function dataSanitization(id, title, status, priority){
    title=title.trim();
    if(id===null || id>10**99){
        return false;
    } else if(title.length<3 || title.length>80){
        document.getElementById("message_add").textContent = "The title must be between 3 and 80 characters long!";
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
        tickets.push({id: formData.get('id'), title: formData.get('title'), status: formData.get('status'), priority: formData.get('priority')});
    }
    
}

function readTicketData()
{
    const lista=document.getElementById("ticketList");

    while(lista.firstChild)
    {
        lista.removeChild(lista.firstChild);
    }

    for(var i=0; i<tickets.length; i++)
    {
        var div1 = document.createElement("div");
        var li1 = document.createElement("li");
        var para1 = document.createElement("p");
        var node1 = document.createTextNode("Id: "+tickets[i].id);
        var para2 = document.createElement("p");
        var node2 = document.createTextNode("Title: "+tickets[i].title);
        var para3 = document.createElement("p");
        var node3 = document.createTextNode("Status: "+tickets[i].status);
        var para4 = document.createElement("p");
        var node4 = document.createTextNode("Priority: "+tickets[i].priority);

        para1.appendChild(node1);
        para2.appendChild(node2);
        para3.appendChild(node3);
        para4.appendChild(node4);

        div1.appendChild(para1);
        div1.appendChild(para2);
        div1.appendChild(para3);
        div1.appendChild(para4);

        li1.appendChild(div1);

        
        lista.appendChild(li1);
    }
}

function filter()
{
    const value_filter = document.getElementById("statusFilter").value;
    const list = document.getElementById("ticketList");

    list.innerHTML = "";

    let visibleCount = 0;

    for(let i = 0; i < tickets.length; i++)
    {
        if(value_filter === "all" || tickets[i].status === value_filter)
        {
            let li = document.createElement("li");

            let p1 = document.createElement("p");
            p1.textContent = "Id: " + tickets[i].id;

            let p2 = document.createElement("p");
            p2.textContent = "Title: " + tickets[i].title;

            let p3 = document.createElement("p");
            p3.textContent = "Status: " + tickets[i].status;

            let p4 = document.createElement("p");
            p4.textContent = "Priority: " + tickets[i].priority;

            li.appendChild(p1);
            li.appendChild(p2);
            li.appendChild(p3);
            li.appendChild(p4);

            list.appendChild(li);

            visibleCount++;
        }
    }

    document.getElementById("visibleCount").textContent = visibleCount;
    document.getElementById("totalCount").textContent = tickets.length;
}

function changeStatus() 
{
    let ticketId = document.getElementById("ticketId").value;
    let newStatus = document.getElementById("newStatus").value;

    if (ticketId.trim() === "" || isNaN(ticketId)) 
    {
        document.getElementById("message_change").textContent = "Id must be a number!";
        return;
    }

    let found = false;

    for (let i = 0; i < tickets.length; i++) 
    {
        if (Number(ticketId) === Number(tickets[i].id)) 
        {
            tickets[i].status = newStatus;
            found = true;
            break;
        }
    }

    if (!found)
    {
        document.getElementById("message_change").textContent = "No ticket found with this ID!";
        return;
    }

    document.getElementById("message_change").textContent = "Ticket status updated successfully!";
    filter();
}