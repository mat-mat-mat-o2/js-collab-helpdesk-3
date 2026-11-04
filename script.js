class Ticket{
    constructor(id, title, status, priority){
        this.id = id;
        this.title = title;
        this.status = status;
        this.priority = priority;
    }
}

function dataSanitization(id, title, status, priority){
    title.trim();

    if(id===null || id>Math.pow(10, 99)){
        return false;
    } else if(title.length<3 || title.length>80){
        return false;
    } else if(status!=="new" && status!=="doing" && status!=="done"){
        return false;
    } else if(priority!=="low" && priority!=="normal" && priority!=="high"){
        return false;
    }
    
    return true;
}

function readTicketData()
{
    for(let i=0; i<)
    {

    }
}