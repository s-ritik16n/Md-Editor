$(document).ready(function(){
  console.log("ready");
  initializeSessions();
  $("#bold").on('click',bold);
  $("#emphasis").on('click',emphasis);
  $("#table").on('click',table);
  $("#link").on('click',link);
  $("#listol").on('click',listol);
  $("#listul").on('click',listul);
  $("#fileCode").on('click',fileCode);
  $("#code").on('click',code);
  $("#minus").on('click',hr);
  $("#quoteL").on('click',blockQstart);
  $("#fileImage").on('click',fileImage);
  $("header ul span li div div ul li:nth-child(1)").on('click',function(){header('h1');});
  $("header ul span li div div ul li:nth-child(2)").on('click',function(){header('h2');});
  $("header ul span li div div ul li:nth-child(3)").on('click',function(){header('h3');});
  $("header ul span li div div ul li:nth-child(4)").on('click',function(){header('h4');});
  $("header ul span li div div ul li:nth-child(5)").on('click',function(){header('h5');});
  $("header ul span li div div ul li:nth-child(6)").on('click',function(){header('h6');});
  $("#copy").on("click",copy);
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
  $("#textarea").val("");
  $("#textarea").focus();
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
            selection(2,0,"\n\t");
            window.getSelection().collapseToEnd();
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

function delSelection(){
  if(window.getSelection().toString().length > 0){
    window.getSelection().deleteFromDocument();
  }
}

function bold(){
  var $textarea = $("textarea");
  $textarea.focus();
  selection(15,2,"**<strong text>**")
  console.log();
}

function emphasis(){
    delSelection();
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
    if(rowcol == null) break;
  } while ((rowcol.split(",")[0] <= 0) || (rowcol.split(",")[1] <=0));
  if((rowcol!= null) && (rowcol.length > 0) && (Number(rowcol.split(",")[0])>0) && (Number(rowcol.split(",")[1])>0)){
    arr = rowcol.split(",");
    createTable(arr);
    document.getElementById("msg").innerHTML = "PS: Tables aren't a part of core Markdown"
    setTimeout(function(){
      document.getElementById("msg").innerHTML = ""
    },3000)
  }
  $("#textarea").focus();
}

function promptUser(){
  let rowcol = prompt("Enter number of rows and columns (comma seperated)");
  return rowcol;
}

function createTable(arr){
    $textArea = $("#textarea");
    selection(4,0,"\n\n| ");
    window.getSelection().collapseToEnd();
    //$textArea.val($textArea.val()+"| ")
    for (var i = 0; i < arr[0]; i++) {
      if(i != (arr[0]-1)){
        selection(14,0," column_head |");
        window.getSelection().collapseToEnd();
      } else {
        selection(13,0," column_head\n");
        window.getSelection().collapseToEnd();
      }
      //$textArea.val($textArea.val()+"column_head |")
    }
    //    $textArea.val($textArea.val()+"\n")
    for (var i = 0; i < arr[0]; i++) {
      if(i != (arr[0]-1)){
        selection(5,0,"--- |");
        window.getSelection().collapseToEnd();
      } else {
        selection(5,0,"--- \n");
        window.getSelection().collapseToEnd();
      }
      //$textArea.val($textArea.val()+"--- |")
    }
    //$textArea.val($textArea.val().substr(0,$textArea.val().length-2));
    //$textArea.val($textArea.val()+"\n");
    for (var i = 0; i < arr[1]; i++) {
      for (var j = 0; j < arr[0]; j++) {
        if(j != (arr[0]-1)){
          selection(5,0,"... |");
          window.getSelection().collapseToEnd();
        } else {
          selection(3,0,"...");
          window.getSelection().collapseToEnd();
        }
        //$textArea.val($textArea.val()+"data |")
      }
      //$textArea.val($textArea.val().substr(0,$textArea.val().length-2));
      selection(1,0,"\n");
      window.getSelection().collapseToEnd();
      //$textArea.val($textArea.val()+"\n");
    }
    selection(1,0,"\n");
    window.getSelection().collapseToEnd();
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
    $textarea.val("\n\t");
  }else {
    selection(3,0,"\n\n\t\n\n");
    window.getSelection().collapseToEnd();
  }
  sessionStorage.setItem("fileCode",1);
  $textarea.focus();
}

function code(){
  var $textarea = $("textarea")
  if(!$textarea.val()){
    selection(7,1,"`<code>`")
  } else {
    selection(8,2," `<code>` ")
  }
}

function hr(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    $textarea.val("***\n\n");
    $textarea.focus();
  } else {
    selection(7,0,"\n\n***\n\n");
    window.getSelection().collapseToEnd();
  }
}

function blockQstart(){
  var $textarea = $("textarea");
  $textarea.focus();
  if(!$textarea.val()){
    selection(12,2,"> Blockquote")
  } else {
    selection(14,4,"\n\n> Blockquote\n\n")
  }
}

function fileImage(){
  var $textarea = $("textarea");
  if(!$textarea.val()){
    selection(11,1,'[<alt_text>](<link> "<tooltip>")')
  } else {
    selection(12,2,' [<alt_text>](<link> "<tooltip>") ')
    //$textarea.val($textarea.val()+' [<alt_text>](<link> "<tooltip>")')
  }
}

function copy(){
  var textarea = document.querySelector("#textarea");
  textarea.focus();
  textarea.setSelectionRange(0,textarea.value.length);
  var succeed;
  try {
    if(textarea.value != ""){
      succeed = document.execCommand("copy");
      alert("text copied to clipboard");
      textarea.setSelectionRange(textarea.value.length,textarea.value.length)
    } else {
      alert("document is empty");
    }
  } catch (e) {
    alert("your browser does not support this action")
  } finally {

  }
}
