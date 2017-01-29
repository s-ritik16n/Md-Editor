$(document).ready(function(){
  console.log("ready");
  textarea = $("textarea");
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
  $("#refresh").on('click',function(){
    $("textarea").val("");
    sessionStorage.setItem("fileCode",0);
    sessionStorage.setItem("enterPressed",0);
  })
  $("#textarea").on("keyup",function(){
      if(($(this).val() == sessionStorage.getItem("beforeFileCodeValue")) ||
          ($(this).val() == sessionStorage.getItem("beforeFileCodeValue_enter")) ||
          ($(this).val() == sessionStorage.getItem("beforeFileCodeValue_enter2"))){
        console.log('removed filecode...');
        sessionStorage.setItem("fileCode",0);
        sessionStorage.setItem("enterPressed",0);
      }
  })
  $("#textarea").on("keypress",function(e){
    if(sessionStorage.getItem("fileCode") == 1){
      console.log("sessionStorage file code is 1");
      if(e.keyCode == 13){
        console.log("enter is pressed");
        sessionStorage.enterPressed = Number(sessionStorage.enterPressed) + 1;
        if(sessionStorage.getItem("enterPressed") == 1){
          console.log("enter pressed once");
          e.preventDefault();
          $(this).val($(this).val()+"\n\t");    //append textarea with \n and \t
        } else if (sessionStorage.getItem("enterPressed") == 2) {
          console.log("enter pressed twice");
          $(this).val($(this).val()+"\n");    //append textarea with \n     //leave fileCode
          sessionStorage.setItem("fileCode",0);
          sessionStorage.setItem("enterPressed",0)
        }
      }
      else {
        sessionStorage.setItem("enterPressed",0);
      }
    }
  })
});

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

}

function fileCode(){
  $textarea = $("textarea");
  sessionStorage.setItem("beforeFileCodeValue",$textarea.val());
  sessionStorage.setItem("beforeFileCodeValue_enter",$textarea.val()+"\n");
  sessionStorage.setItem("beforeFileCodeValue_enter2",$textarea.val()+"\n\n");
  console.log(sessionStorage.getItem("beforeFileCodeValue")+"1234");
  console.log(sessionStorage.getItem("beforeFileCodeValue_enter")+"1234");
  console.log(sessionStorage.getItem("beforeFileCodeValue_enter2")+"1234");
  $textarea.val($textarea.val()+"\n\n\t");
  sessionStorage.setItem("fileCode",1);
  sessionStorage.setItem("enterPressed",Number(0));
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
