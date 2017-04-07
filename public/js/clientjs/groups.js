$(document).ready(() => {
    $.ajax({
        url:"groups/list",
        success:(data)=>{
            console.log(data);
        },
        fail:(err) => {
            console.log(err);
        }
    })
})