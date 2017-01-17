$(document).ready(function(){
  console.log("ready");
  start();
});

function start(){
  $(".fa-bold").on('click',bold);
  $(".fa-italic").on('click',func('italic'));
  $(".fa-strikethrough").on('click',func('strikethrough'));
  $(".fa-table").on('click',func('table'));
  $(".fa-link").on('click',func('link'));
  $(".fa-header").on('click',func('header'));
  $(".fa-list-ol").on('click',func('listol)'));
  $(".fa-list-ul").on('click',func('listul'));
  $(".fa-file-code-o").on('click',func('fileCode'));
  $(".fa-code").on('click',func('code'));
  $(".fa-minus").on('click',func('minus'));
  $(".fa-paragraph").on('click',func('paragraph'));
  $(".fa-quote-left").on('click',func('quoteL'));
  $(".fa-quote-right").on('click',func('quoteR'));
  $(".fa-file-image-o").on('click',func('fileImage'));
  $(".fa-youtube-play").on('click',func('video'));

}

function bold(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'****')
  } else {
    $textarea.val($textarea.val()+' ****')
  }
}

function func(){

}
/*
function func(pressed){
  switch (pressed) {
    case '"bold"':
    console.log("clicking bold");

    $textarea.val($textarea.val()+'****')

      break;
    case 'italic':
    console.log("clicking bold");
    $textarea.val($textarea.val()+'****')
    break;
    case 'strikethrough':
    console.log("clicking bold");
    $textarea.val($textarea.val()+'****')
      break;
    case 'table':
    console.log("clicking bold");
    $textarea.val($textarea.val()+'****')
      break;
    case 'link':
    console.log("clicking bold");
    $textarea.val($textarea.val()+'****')
      break;
    case 'header':

      break;
    case 'listol':

      break;
    case 'listul':

      break;
    case 'fileCode':

      break;
    case 'code':

      break;
    case 'minus':

      break;
    case 'paragraph':

      break;
    case 'quoteL':

      break;
    case 'quoteR':

      break;
    case 'fileImage':

      break;
    case 'video':

      break;
    default:

  }
  $textarea.focus();
}
*/
