$(document).ready(function(){
  console.log("ready");
  initializeSessions();
  $("#bold").on('click',bold);
  $("#emphasis").on('click',emphasis);
  $("#strikethrough").on('click',strikethrough);
  $("#table").on('click',table);
  $("#link").on('click',link);
  $("#listol").on('click',listol);
  $("#listul").on('click',listul);
  $("#fileCode").on('click',fileCode);
  $("#code").on('click',code);
  $("#minus").on('click',hr);
  $("#paragraph").on('click',paragraph);
  $("#quoteL").on('click',blockQstart);
  $("#quoteR").on('click',blockQend);
  $("#fileImage").on('click',fileImage);
  $("#video").on('click',video);
  $("ul li:nth-child(1)").on('click',function(){header('h1');});
  $("ul li:nth-child(2)").on('click',function(){header('h2');});
  $("ul li:nth-child(3)").on('click',function(){header('h3');});
  $("ul li:nth-child(4)").on('click',function(){header('h4');});
  $("ul li:nth-child(5)").on('click',function(){header('h5');});
  $("ul li:nth-child(6)").on('click',function(){header('h6');});
  keyUpEvent();
  refreshEvent();
  $("#textarea").on("keypress",function(e){
    if(sessionStorage.getItem("fileCode") == 1){
      console.log("sessionStorage filecode is 1");
      if(e.keyCode == 13){
        console.log("enter is pressed");
        sessionStorage.enterPressed = Number(sessionStorage.enterPressed) + 1;
        if(sessionStorage.getItem("enterPressed") == 1){
          console.log("enter pressed once");
          e.preventDefault();
          $(this).val($(this).val()+"\n\t");    //append textarea with \n and \t
        } else if (sessionStorage.getItem("enterPressed") == 2) {
          console.log("enter pressed twice");
          initializeSessions();
        }
      }else {
        sessionStorage.setItem("enterPressed",0);
      }
    }
    if(sessionStorage.getItem("listul") == 1){
      if(sessionStorage.getItem("fileCode") == 1){
        sessionStorage.setItem("fileCode",0);
      }
      console.log("sessionStorage listul is 1");
      if(e.keyCode == 13){
        console.log("enter is pressed");
        sessionStorage.enterPressed = Number(sessionStorage.enterPressed) + 1;
        if(sessionStorage.enterPressed == 1){
          e.preventDefault();
          console.log("enter pressed once");
          $(this).val($(this).val()+"\n* ");
        }
        else if(sessionStorage.enterPressed == 2){
          console.log("enter pressed twice");
          $textarea.val($textarea.val().substr(0,$textarea.val().length-2))
          sessionStorage.setItem("listul",0);
          sessionStorage.setItem("enterPressed",0)
        }
      }
      else {
        initializeSessions();
      }
    }
  })
});

function refreshEvent(){
  $("#refresh").on('click',function(){
    clear();
    initializeSessions();
  })
}

function clear(){
  $("textarea").val("");
}

function keyUpEvent(){
  $("#textarea").on("keyup",function(e){
      if(e.keyCode == 8){
        console.log("backspace pressed");
        if(sessionStorage.enterPressed == 1){
          console.log("enter with backspace");
          initializeSessions();
        }
      }
    })
}
function initializeSessions(){
  sessionStorage.enterPressed = 0;
  sessionStorage.listul = 0;
  sessionStorage.fileCode = 0;
  sessionStorage.beforeFileCodeValue = "";
  sessionStorage.beforeFileCodeValue_enter = "";
  sessionStorage.beforeFileCodeValue_enter2 = "";
}

function bold(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,value,firstHalf,secondHalf;
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
    textArea.focus();
}

function emphasis(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,value,firstHalf,secondHalf;
    $textarea.focus();
    end = textArea.selectionStart;
    value = textArea.value;
    firstHalf = textArea.value.substring(0,end);
    secondHalf = textArea.value.substring(end,value.length);
    textArea.value = firstHalf+'__'+secondHalf;
    textArea.focus();
    end = firstHalf.length+2;
    start = firstHalf.length+1;
    textArea.setSelectionRange(start,end);
    window.getSelection().collapseToStart()
    textArea.focus();
}

function strikethrough(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,value,firstHalf,secondHalf;
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
    textArea.focus();
}

function table(){

}

function link(){
  var $textarea = $("textarea");
  var textArea = document.getElementById('textarea');
  var end,start,firstHalf,secondHalf;
    end = textArea.selectionStart;
    firstHalf = textArea.value.substring(0,end);
    secondHalf = textArea.value.substring(end,textArea.value.length);
    textArea.value = firstHalf + '[<text_here>](<link_here>)' + secondHalf;
    $textarea.focus();
    end = firstHalf.length + 12;
    start = firstHalf.length + 1;
    textArea.setSelectionRange(start,end);
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
  sessionStorage.setItem("listul",1);
  $textarea = $('#textarea');
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'* ');
  }else {
    $textarea.val($textarea.val()+'\n\n* ');
  }
  $textarea.focus();
}

function fileCode(){
  $textarea = $("#textarea");
  $textarea.val($textarea.val()+"\n\n\t");
  sessionStorage.setItem("fileCode",1);
  $textarea.focus();
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

function hr(){
  var textArea = document.getElementById('textarea');
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val("***\n")
  }
  else {
    $textarea.val($textarea.val()+'\n\n***\n')
  }
  textarea.focus();
}

function paragraph(){

}

function blockQstart(){
  var $textarea = $("textarea");
  if(!$textarea.val()) $textarea.val($textarea.val()+'> Blockquote')
  else {
    $textarea.val($textarea.val()+'\n> Blockquote');
  }
  $textarea.focus();
}

function blockQend(){
  var $textarea = $("textarea");
  if($textarea.val())  {
    $textarea.val($textarea.val()+'\n\n')
  }
  $textarea.focus();
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
