function removeAddTable(){
	var el = document.getElementById('add_table');
	if(el){
		el.parentNode.removeChild(el);
	}
}
function removeContentTable(){
	var el = document.getElementById('content_table');
	if(el){
		el.parentNode.removeChild(el);
	}
}
function removeAllOptions(select){
	var i;
	var selectbox=document.getElementById(select)
	for(i=selectbox.options.length-1;i>=0;i--){
		selectbox.remove(i);
	}
}
function clearModelsList(tablename) {
	var selectControl = document.getElementById(tablename);
	while(selectControl.childNodes.length > 0) {
		selectControl.removeChild(selectControl.childNodes[0]);
	}
}
function createHeadCellWithText(text){
	var cell = document.createElement("th");
	var textNode = document.createTextNode(text);
	cell.appendChild(textNode);
	return cell;
}
function createCellWithText(textv,id,objindex,fval){
	var cell = document.createElement("td");
	var textNode = document.createTextNode(textv);
	cell.appendChild(textNode);
	cell.setAttribute('id', id);	
	cell.setAttribute('onclick', 'change(this,' +objindex + ',"'+textv+'","'+fval+'");');
	return cell;
}
function change(element,objindex,textv,fval) {
	if(fval == 'disabled'){
			alert ("This field must edited with the udpdate link on the left.");
			return false;
	}
	var id = element.id;
	var textValue = document.getElementById(id).firstChild.nodeValue;
	var e = document.createElement("input");
	document.getElementById(id).appendChild(e);	
	e.setAttribute('size', '5');
	e.setAttribute('id', id +'_input');
	e.setAttribute('onkeydown', 'checkForm(event,id,' +objindex+ ',"'+textv+'","'+fval+'");');
	e.setAttribute('value', textValue);
	e.setAttribute('onBlur', 'releaseForm(id);');
	element.replaceChild(e,element.childNodes[0]);
	e.focus();
}
function releaseForm(id){
	var tdcell = id.replace(/_input/,'');
	var oTd = document.getElementById(tdcell);
	var oInput = document.getElementById(id);
	var inputValue = document.getElementById(id).value;
	var textNode = document.createTextNode(inputValue);
	oTd.replaceChild(textNode, oInput);
}
function checkForm(e,id,objindex,textValue,fval) {
	if (e.keyCode == 13) {
		var inputValue = document.getElementById(id).value;
		var valid = false;
		if(fval == 'int'){
			valid = checkCellSubmit(inputValue);
		}else if(fval == 'text'){
			valid = validateText(inputValue);
		//}else if(fval == 'disabled'){
		//	valid = validateDisabled(inputValue);
		}else{
		}
		if(valid){
			submitCell(id,inputValue,objindex);
		}else{
			var tdcell = id.replace(/_input/,'');
			document.getElementById(tdcell).innerHTML = textValue;
			document.getElementById(tdcell).focus();
		}
	}else{
		return;
	}
}
//function validateDisabled(v){
//	alert ("This field must edited with the \'udpdate\' link on the left.");
//	return false;	
//}
function validateText(v){
	if(v.length > 40){
		alert ("This value is to big");
		return false;
	}	
	var goodChars = /[0-9\.a-zA-Z]/;
	var DecimalFound = false;
	if(goodChars.test(v)){
	}else{
		alert ("This field must contain something.");
		return false;	
	}
	return true;
}
function checkCellSubmit(v){
	if(v.length > 8){
		alert ("This value is to big");
		return false;
	}	
	var goodChars = /[0-9\.]/;
	var DecimalFound = false;
	if(goodChars.test(v)){
      for (var i = 0; i < v.length; i++) {
      	var ch = v.charAt(i)
         if (i == 0 && ch == "-") {
        		continue;
         }
         if (ch == "." && !DecimalFound) {
         	DecimalFound = true;
            continue;
         }
         if (ch < "0" || ch > "9") {
         	alert ("This field must only contain numbers");
         	return false;
         }
      }		
	}else{
		alert ("This field must only contain numbers");
		return false;	
	}
	return true;
}
function submitCell(id,inputValue,objindex){
	var obj = objid[objindex];
	var request;
	try{
		request = new XMLHttpRequest();
	}catch(error){
		try{
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(error){
			return true;
		}
	}
	request.open('GET', '/cgi-bin/updateCell.pl?value=' + inputValue + '&cell=' + id + '&table=' + obj.mysqlTable,true);
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			var xmlDoc = request.responseXML;
			var options = xmlDoc.documentElement.getElementsByTagName("option");		
			for (var x = 0; x < options.length; x++){	
				var result = (options[x].getAttribute("result"));				
				if (result == '1'){
					var tdcell = id.replace(/_input/,'');
					var oTd = document.getElementById(tdcell);
					var oInput = document.getElementById(id);
					var textNode = document.createTextNode(inputValue);
					oTd.replaceChild(textNode, oInput);			
					oTd.style.backgroundColor = "#CDA";	
				}else{
					alert('The update failed. ' + '(' + result + ')');
				}
			}		
		}
	}
	request.send(null);
}

function createThCellWithText(objindex,sortcol){
	var obj = objid[objindex];
	var th = document.createElement("th");
	var a = document.createElement('a')
	var textNode = document.createTextNode(sortcol);
	a.appendChild(textNode);
	th.appendChild(a);
	//a.setAttribute('href', 'javascript:getData("'+objindex + '","' + sortcol +  '","' + obj.eqType + '")');
	a.setAttribute('href', 'javascript:getData("'+objindex + '","' + sortcol +  '")');
	th.setAttribute('title', 'sort by this field');
	return th;
}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
function updateH3(table,objindex,header){
	var h3 = document.getElementById(header);
	h3.innerHTML = "This table: ";
	var newlink = h3.appendChild(document.createElement('a'));
	newlink.setAttribute('href', 'javascript:add_record(' + objindex + ')');
	newlink.appendChild(document.createTextNode(' add record? '));
	var content = h3.appendChild(document.createElement('div'));
	content.setAttribute('id','table_content');			
}

function loadSelect(select,table,field,selected,perlscript,filter){	
	console.log("loadSelect: select:",select,"table:",table,"field:",field,"selected:",selected,"script:",perlscript + "filter:" + filter);
	var selectControl = document.getElementById(select);
	while(selectControl.childNodes.length > 0) {
		if(selectControl.options.length > 0){			
			removeAllOptions(select);
		}	
	}		
	var request;
	try{
		request = new XMLHttpRequest();
	}catch(error){
		try{
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}catch(error){
			return true;
		}
	}
	//console.log(perlscript);
	request.open('GET', '/cgi-bin/' + perlscript + '?table=' + table + '&field=' + field + '&filter=' + filter,true);
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			var xmlDoc = request.responseXML;
			var options = xmlDoc.documentElement.getElementsByTagName("option");
			for (var x = 0; x < options.length; x++){	;
				var member = (options[x].getAttribute("member"));
				var id = (options[x].getAttribute("id"));
				if (member){
					var myselect = document.getElementById(select);
					var theOption = document.createElement("option");
					var theText = document.createTextNode(member);
					theOption.appendChild(theText);	
					theOption.setAttribute("value",id);
					if(member == selected){
						theOption.setAttribute("selected",true);
					}
					myselect.appendChild(theOption);		
				}else{
					alert("The user has not been added due to a database error. Please contact the CCO.");
				}				
			}	
		} 
	}
	request.send(null);	
}
function buildTbl(obj,oid,commit) {
		//console.log("in build: ",obj,oid);
		var headerDiv = obj.headerDiv;
		var tableDiv = obj.tableDiv;
		var tablename = obj.tableNameAdd;
		var content = document.getElementById(tableDiv);
		var div = document.getElementById(headerDiv);
		var table = document.createElement('table');
		table.setAttribute('id',tablename);
		var thead = table.appendChild(document.createElement('thead'));
		var tbody = table.appendChild(document.createElement('tbody'));
		//th
		var tr = thead.appendChild(document.createElement('tr'));
		tr.className='rowH';	
		for (var i = 0; i < obj.updateTdTextNodes.length; i++) {
			tr.appendChild(createHeadCellWithText(obj.updateThText[i]));
		}		
		//td
		var row = document.createElement("tr");
		row.className = 'rowA';
		for (var i = 0; i < obj.updateTdIds.length; i++) {
			var cellRight = row.insertCell(i);
			var el = document.createElement(obj.updateTdInputTypes[i]);
			if (obj.updateTdTypes[i] == 'option'){
			}else if (obj.updateTdTypes[i] == 'button'){
				el.type = obj.updateTdTypes[i];
				el.value = 'commit';
				el.onclick = commit;
				el.rowid = oid;
			}else{
				el.type = obj.updateTdTypes[i];
				el.size = obj.updateTdSizes[i];
			}
			el.id = obj.updateTdIds[i];
			cellRight.appendChild(el);
		}	  
		tbody.appendChild(row);	
		//div.appendChild(table);
		div.insertBefore(table,content);
		//$('#hosts_header').scrollTo(100);
		var test = document.getElementById('commit');
		test.focus();
}
