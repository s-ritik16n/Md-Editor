$(document).ready(function(){
  console.log("ready");
//  start();
  $("#bold").on('click',bold);
  $("#emphasis").on('click',emphasis);
  $("#strikethrough").on('click',strikethrough);
  $("#table").on('click',table);
  $("#link").on('click',link);
  $("#listol").on('click',listol);
  $("#listul").on('click',listul);
  $("#fileCode").on('click',fileCode);
  $("#code").on('click',code);
  $("#minus").on('click',minus);
  $("#paragraph").on('click',paragraph);
  $("#quoteL").on('click',quoteL);
  $("#quoteR").on('click',quoteR);
  $("#fileImage").on('click',fileImage);
  $("#video").on('click',video);
  $("ul li:nth-child(1)").on('click',h1);
  $("ul li:nth-child(2)").on('click',header('h2'));
  $("ul li:nth-child(3)").on('click',header('h3'));
  $("ul li:nth-child(4)").on('click',header('h4'));
  $("ul li:nth-child(5)").on('click',header('h5'));
  $("ul li:nth-child(6)").on('click',header('h6'));
});

function bold(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'****')
  } else {
    $textarea.val($textarea.val()+' ****')
  }
  $textarea.focus();
}

function emphasis(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'__')
  } else {
    $textarea.val($textarea.val()+' __')
  }
}

function strikethrough(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'~~')
  } else {
    $textarea.val($textarea.val()+' ~~')
  }
}

function table(){

}

function link(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'[text_here](link_here)')
  } else {
    $textarea.val($textarea.val()+' [text_here](link_here)')
  }
}
function h1(){
  var $textarea = $("textarea")
  if(!$textarea.val()){
    $textarea.val('# ')
  }
  else {
    $textarea.val($textarea.val()+'\n# ')
  }
  $textarea.focus();
}

function listol(){

}

function listul(){

}

function fileCode(){

}

function code(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'``')
  } else {
    $textarea.val($textarea.val()+' ``')
  }
}

function minus(){

}

function paragraph(){

}

function quoteL(){

}

function quoteR(){

}

function fileImage(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'[alt text](link "tooltip")')
  } else {
    $textarea.val($textarea.val()+' [alt text](link "tooltip")')
  }
}

function video() {

}
