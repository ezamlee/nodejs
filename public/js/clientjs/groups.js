var popGroupCard = function(groupname){
    return `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div class="grp">
                    <a href="" data-toggle="modal" data-target="#friendslist"><h3 class="text-info"><u>${groupname}</u></h3></a>
                    <button class="btn btn-danger groupremover" data-toggle="modal" data-target="#removeGroup" value="${groupname}">Remove</button>
                </div>
            </div>
            
                    `;
};

$(document).ready(() => {
    $.ajax({
        url:"groups/list",
        success:(data)=>{
            $("#grouper").html("");
            data.forEach(function(obj){
                $("#grouper").append(popGroupCard(obj.name));
            })
        },
        fail:(err) => {
            console.log(err);
        }
    });
    var group2remove;
    $("html").on("click",".groupremover",(e) => {
        $('span.text-info:nth-child(1)').text(e.target.value);
        group2remove = e.target.value
    })
    $("html").on("click","button#1.btn.btn-info", (e)=>{
        console.log(group2remove);
        
    })

    

})