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
  keydownEvent();
  refreshEvent();
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

function initializeSessions(){
  sessionStorage.enterPressed = 0;
  sessionStorage.listul = 0;
  sessionStorage.fileCode = 0;
  sessionStorage.listol = 0;
  sessionStorage.listnum = 0;
}

function keydownEvent(){
  $("#textarea").on("keydown",function(e){
    if(e.keyCode == 13){
      sessionStorage.enterPressed = Number(sessionStorage.enterPressed) + 1;
      if(sessionStorage.getItem("fileCode") == 1){
        console.log("sessionStorage filecode is 1");
          console.log("enter is pressed");
          if(sessionStorage.getItem("enterPressed") == 1){
            console.log("enter pressed once");
            e.preventDefault();
            $(this).val($(this).val()+"\n\t");    //append textarea with \n and \t
          } else if (sessionStorage.getItem("enterPressed") == 2) {
            console.log("enter pressed twice");
            initializeSessions();
          }
        }
        else if(sessionStorage.getItem("listul") == 1){
          if(sessionStorage.getItem("fileCode") == 1){
            sessionStorage.setItem("fileCode",0);
          }
          console.log("sessionStorage listul is 1");
          console.log("enter is pressed");
          if(sessionStorage.enterPressed == 1){
            e.preventDefault();
            console.log("enter pressed once");
            selection(3,3,"\n* ")
          }
          else if(sessionStorage.enterPressed == 2){
            console.log("enter pressed twice");
            stripOff(2);
            initializeSessions();
          }
        }
        else if (sessionStorage.getItem("listol") == 1) {
          //sessionStorage.enterPressed = Number(sessionStorage.enterPressed) + 1;
          if(sessionStorage.enterPressed == 1){
            e.preventDefault();
            sessionStorage.listnum = Number(sessionStorage.listnum) + 1;
            selection(4,4,"\n"+sessionStorage.getItem("listnum")+". ")
            //$(this).val($(this).val()+);
          }else if (sessionStorage.enterPressed == 2) {
              stripOff(3);
              initializeSessions();
            }
          }
      }else if (e.keyCode == 8) {
        console.log("backspace pressed");
        if(sessionStorage.enterPressed == 1){
          console.log("enter with backspace");
          initializeSessions();
        } else if ($(this).val().search(/(\t)$/) == ($(this).val().length-1)) {
          console.log("backspace without preceeding enter");
          initializeSessions();
        }
      }
      else{
        sessionStorage.enterPressed = 0;
      }
  })
}

function stripOff(reverse){
  var textarea = document.getElementById("textarea");
  end = textarea.selectionStart;
  value = textarea.value;
  firstHalf = textarea.value.substring(0,end-Number(reverse));
  secondHalf = textarea.value.substring(end,value.length);
  textarea.value = firstHalf+secondHalf;
}

function selection(endOffset,startOffset,midString){
  var textArea = document.getElementById('textarea');
  var end,start,value,firstHalf,secondHalf;
  end = textArea.selectionStart;
  value = textArea.value;
  firstHalf = textArea.value.substring(0,end);
  secondHalf = textArea.value.substring(end,value.length);
  textArea.value = firstHalf+midString+secondHalf;
  textArea.focus();
  end = firstHalf.length+Number(endOffset);
  start = firstHalf.length+Number(startOffset);
  textArea.setSelectionRange(start,end);
}

function bold(){
  var $textarea = $("textarea");
  $textarea.focus();
  selection(15,2,"**<strong text>**")
}

function emphasis(){
  var $textarea = $("#textarea");
  $textarea.focus();
  selection(2,1,"__")
  window.getSelection().collapseToStart()
}

function strikethrough(){
  var $textarea = $("textarea");
  $textarea.focus();
  selection(2,1,"~~");
  window.getSelection().collapseToStart();
}

function table(){
  var rowcol;
  do {
    rowcol = promptUser();
  } while ((rowcol != null) && (rowcol.length <2));
  if(rowcol!= null){
    arr = rowcol.split(",");
    createTable(arr);
    $("#textarea").focus();
    document.getElementById("msg").innerHTML = "PS: Tables aren't a part of core Markdown"
    setTimeout(function(){
      document.getElementById("msg").innerHTML = ""
    },3000)
  }
}

function promptUser(){
  let rowcol = prompt("Enter number of rows and columns (comma seperated)");
  return rowcol;
}

function createTable(arr){
    $textArea = $("#textarea");
    $textArea.val($textArea.val()+"| ")
    for (var i = 0; i < arr[0]; i++) {
      $textArea.val($textArea.val()+"column_head |")
    }
    $textArea.val($textArea.val()+"\n")
    for (var i = 0; i < arr[0]; i++) {
      $textArea.val($textArea.val()+"--- |")
    }
    $textArea.val($textArea.val().substr(0,$textArea.val().length-2));
    $textArea.val($textArea.val()+"\n");
    for (var i = 0; i < arr[1]; i++) {
      for (var j = 0; j < arr[0]; j++) {
        $textArea.val($textArea.val()+"data |")
      }
      $textArea.val($textArea.val().substr(0,$textArea.val().length-2));
      $textArea.val($textArea.val()+"\n");
    }
  }

function link(){
  var $textarea = $("textarea");
  $textarea.focus();
  selection(12,1,"[<text_here>](<link_here>)")
}

function header(size){
  var $textarea = $("textarea")
  switch (size) {
    case 'h1':
      if(!$textarea.val()){
        $textarea.val('# ')
      }
      else {
        $textarea.focus();
        selection(4,4,"\n\n# \n\n");
      }
      break;
    case 'h2':
      if(!$textarea.val()){
        $textarea.val('## ')
      }
      else {
        $textarea.focus();
        selection(5,5,"\n\n## \n\n");
      }
      break;
    case 'h3':
      if(!$textarea.val()){
        $textarea.val('### ')
      }
      else {
        $textarea.focus();
        selection(6,6,"\n\n### \n\n");
      }
      break;
    case 'h4':
      if(!$textarea.val()){
        $textarea.val('#### ')
      }
      else {
        $textarea.focus();
        selection(7,7,"\n\n#### \n\n");
      }
      break;
    case 'h5':
      if(!$textarea.val()){
        $textarea.val('##### ')
      }
      else {
        $textarea.focus();
        selection(8,8,"\n\n##### \n\n");
      }
      break;
    case 'h6':
      if(!$textarea.val()){
        $textarea.val('###### ')
      }
      else {
        $textarea.focus();
        selection(9,9,"\n\n###### \n\n");
      }
      break;
  }
  $textarea.focus();
}

function listol(){
  initializeSessions();
  sessionStorage.listol = 1;
  sessionStorage.listnum = 1;
  $textarea = $('#textarea');
  if(!$textarea.val()){
    $textarea.val($textarea.val()+"\n"+sessionStorage.getItem("listnum")+". ");
  }else {
    $textarea.focus();
    selection(5,5,"\n\n"+sessionStorage.getItem("listnum")+". \n\n")
  }
}

function listul(){
  initializeSessions();
  sessionStorage.setItem("listul",1);
  $textarea = $('#textarea');
  if(!$textarea.val()){
    $textarea.val($textarea.val()+'* ');
  }else {
    $textarea.focus();
    selection(4,4,"\n\n* \n\n")
  }
}

function fileCode(){
  $textarea = $("#textarea");
  if(!$textarea.val()){
    $textarea.val($textarea.val()+"\n\t");
  }else {
    $textarea.val($textarea.val()+"\n\n\t")
  }
  sessionStorage.setItem("fileCode",1);
  $textarea.focus();
}

function code(){
  var $textarea = $("textarea")
  selection(7,1,"`<code>`")
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
