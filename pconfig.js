/**
 * This code is provided under the Apache 2.0 license.
 * Please read the LICENSE.md file for more information
 * 
 * Copyright (c) 2013 Matthew Congrove (http://github.com/mcongrove)
 */
var PConfig=function(){
this.init=function()
{
  this.setFormValues();
};
  this.getUrlParams=function()
{
  var params={};
  var bits=window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/g,function(match,key,value){params[key]=value;});
  return params;
};
this.getFormFields=function(){
  var field_ids=[];
  var fields_input=document.getElementsByTagName("input");
  var fields_select=document.getElementsByTagName("select");
  var fields_textarea=document.getElementsByTagName("textarea");
  for(var i=0,x=fields_input.length;i<x;i++){
    if(fields_input[i].type!="submit"&&fields_input[i].type!="reset"){
      field_ids.push(fields_input[i].id);
    }
  }
  for(var i=0,x=fields_select.length;i<x;i++){
    field_ids.push(fields_select[i].id);
  }
  for(var i=0,x=fields_textarea.length;i<x;i++){
    field_ids.push(fields_textarea[i].id);
  }
  return field_ids;
};
this.getFormValues=function(){
  var fields=this.getFormFields();
  var values={};
  for(var i=0,x=fields.length;i<x;i++){
    var field=document.getElementById(fields[i]);
    var value=field.value;
      if(field.hasAttribute("data-type")){
        switch(field.getAttribute("data-type").toLowerCase()){
          case"string":
          case"char":
          case"character":
          break;
          case"int":
          case"integer":
          case"num":
          case"number":
          value=parseInt(value);
          break;
        }
      }
      values[fields[i]]=value;
    }console.log(values);
    return values;
};
this.setFormValues=function(){
  var params=this.getUrlParams();
  for(key in params){
    var field=document.getElementById(key);
    if(document.contains(field)){
      field.value=decodeURIComponent(params[key]);
    }
  }
};
this.onSubmit=function(_event){
  var location="pebblejs://close#"+encodeURIComponent(JSON.stringify(PConfig.getFormValues()));
  window.location.href=location;
};
this.onCancel=function(_event){
  window.location.href="pebblejs://close#failure";
};
};
PConfig=new PConfig();
