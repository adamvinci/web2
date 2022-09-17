const dateTimeNow = new Date();


function addDateTimeMessage(message){
    return message + " : "+ dateTimeNow.toLocaleDateString()+dateTimeNow.toLocaleTimeString();
}

alert(addDateTimeMessage("This is the best moment to have a look at this website !"))
