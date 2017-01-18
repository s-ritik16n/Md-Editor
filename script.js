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
  $("ul li:nth-child(1)").on('click',function(){header('h1');});
  $("ul li:nth-child(2)").on('click',function(){header('h2');});
  $("ul li:nth-child(3)").on('click',function(){header('h3');});
  $("ul li:nth-child(4)").on('click',function(){header('h4');});
  $("ul li:nth-child(5)").on('click',function(){header('h5');});
  $("ul li:nth-child(6)").on('click',function(){header('h6');});
  $("#refresh").on('click',function(){
    $("textarea").val("");
  })
});

var textArea = document.getElementById("textarea");
var $textarea = $("textarea");

function bold(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,value,firstHalf,secondHalf;
  /*if(!$textarea.val()){
    $textarea.val($textarea.val()+'****');
    $textarea.focus();
    end = textArea.selectionStart;
    start = end-2;
    textArea.setSelectionRange(start,end);
    window.getSelection().collapseToStart();
  } else {*/
    $textarea.focus();
    end = textArea.selectionStart;
    value = textArea.value;
    firstHalf = textArea.value.substring(0,end);
    secondHalf = textArea.value.substring(end,value.length);
    textArea.value = firstHalf+'**<strong text>**'+secondHalf;
    textArea.focus();
    end = firstHalf.length+15;
    start = firstHalf.length+2;
    textArea.setSelectionRange(start,end);
  //  window.getSelection().collapseToStart();
    //}
  textArea.focus();
}

function emphasis(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,value,firstHalf,secondHalf;
  /*if(!$textarea.val()){
    $textarea.val($textarea.val()+'_<Emphasized text>_');
    $textarea.focus();
    end = textArea.selectionStart;
    start = end-1;
    textArea.setSelectionRange(start,end);
    window.getSelection().collapseToStart();
  } else {*/
    $textarea.focus();
    end = textArea.selectionStart;
    value = textArea.value;
    firstHalf = textArea.value.substring(0,end);
    secondHalf = textArea.value.substring(end,value.length);
    textArea.value = firstHalf+'_<Emphasized text>_'+secondHalf;
    textArea.focus();
    end = firstHalf.length+18;
    start = firstHalf.length+1;
    textArea.setSelectionRange(start,end);
    //window.getSelection().collapseToStart();
    //}
  textArea.focus();
}

function strikethrough(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,value,firstHalf,secondHalf;
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'~~');
    $textarea.focus();
    end = textArea.selectionStart;
    start = end-1;
    textArea.setSelectionRange(start,end);
    window.getSelection().collapseToStart();
  } else {
    $textarea.focus();
    end = textArea.selectionStart;
    value = textArea.value;
    firstHalf = textArea.value.substring(0,end);
    secondHalf = textArea.value.substring(end,value.length);
    textArea.value = firstHalf+'~~'+secondHalf;
    textArea.focus();
    end = firstHalf.length+2;
    start = firstHalf.length+1;
    textArea.setSelectionRange(start,end);
    window.getSelection().collapseToStart();
    }
  textArea.focus();
}

function table(){

}

function link(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,firstHalf,secondHalf;
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'[<text_here>](<link_here>)')
    $textarea.focus();
    end = 12;
    start = 1;
    textArea.setSelectionRange(start,end);
  } else {
    end = textArea.selectionStart;
    firstHalf = textArea.value.substring(0,end);
    secondHalf = textArea.value.substring(end,textArea.value.length);
    textArea.value = firstHalf + '[<text_here>](<link_here>)' + secondHalf;
    $textarea.focus();
    end = firstHalf.length + 12;
    start = firstHalf.length + 1;
    textArea.setSelectionRange(start,end);
  }
}

function header(size){
  var $textarea = $("textarea")
  switch (size) {
    case 'h1':
    if(!$textarea.val()){
      $textarea.val('# ')
    }
    else {
      $textarea.val($textarea.val()+'\n# ')
    }
      break;
    case 'h2':
    if(!$textarea.val()){
      $textarea.val('## ')
    }
    else {
      $textarea.val($textarea.val()+'\n## ')
    }
      break;
    case 'h3':
    if(!$textarea.val()){
      $textarea.val('### ')
    }
    else {
      $textarea.val($textarea.val()+'\n### ')
    }
      break;
    case 'h4':
    if(!$textarea.val()){
      $textarea.val('#### ')
    }
    else {
      $textarea.val($textarea.val()+'\n#### ')
    }
      break;
    case 'h5':
    if(!$textarea.val()){
      $textarea.val('##### ')
    }
    else {
      $textarea.val($textarea.val()+'\n##### ')
    }
      break;
    case 'h6':
    if(!$textarea.val()){
      $textarea.val('###### ')
    }
    else {
      $textarea.val($textarea.val()+'\n###### ')
    }
      break;
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
  var $textarea = $("textarea")
  var textArea = document.getElementById('textarea')
  var end,start;
  console.log(textArea);
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'`<code>`')
    $textarea.focus();
    textArea.setSelectionRange(1,7);
  } else {
    var end = textArea.selectionStart;

    $textarea.val($textarea.val()+'`<code>`');

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
    $textarea.val($textarea.val()+'[<alt_text>](<link> "<tooltip>")')
  } else {
    $textarea.val($textarea.val()+' [<alt_text>](<link> "<tooltip>")')
  }
}

function video() {

}
