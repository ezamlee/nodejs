var list  = [1,2,3];
var sometext = "this is #*# a #*# #*# ";
list.forEach(function(item){
    sometext = sometext.replace("#*#" , item)
    console.log(sometext);
})
 
var str = `this is mutlo
line ${list[0]} text`;
console.log(str)


