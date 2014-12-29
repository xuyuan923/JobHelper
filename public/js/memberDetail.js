/**
 * Created by cassie on 14/12/23.
 */



function parseToDOM(str){
    var div = document.createElement("div");
    if(typeof str == "string")
        div.innerHTML = str;
    return div.childNodes;
}
var sugContent = $('.sug').html();
var $sugContent = $.parseHTML(sugContent)
var $$sugContent = parseToDOM($sugContent);
console.log($$sugContent);
$('.sug').append($$sugContent);
