function addBookMark(){
    var name = document.getElementById("nameOfPage").value;
    var link = document.getElementById("linkOfPage").value;
    if(name=="" || link=="")
        document.getElementById("errorBox").innerHTML="Please Fill the form before submitting it";
    else{
        var listOfAll = document.getElementById("listOfAll").innerHTML;
        var newData = "<li><h3>"+name+"</h3><h4><a href=""+link+"" target="_blank">"+name+"</a></h4></li>";
        document.getElementById("listOfAll").innerHTML = listOfAll+newData;
            document.getElementById("nameOfPage").value="";
    document.getElementById("linkOfPage").value="";
    }