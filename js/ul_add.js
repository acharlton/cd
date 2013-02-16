
// adds

function add_record(oid){
	var obj = objid[oid];
	// flush any existing update or add tables
	removeAddTable();
	//load the add row
	// ul_common.js
	buildTbl(obj,oid,addRow); // ul_common.js
	// load any select fields
	for (var i = 0; i < obj.updateTdTextNodes.length; i++) {
		if(obj.updateTdTypes[i] == 'text'){
		}else if(obj.updateTdTypes[i] == 'option'){
			// ul_common.js
			loadSelect(obj.selectsId[i],obj.selectsTableName[i],obj.selectsValue[i],'',obj.selectsScripts[i],obj.selectsFilter[i]);	
		}
	}
}

function addRow(){	
	// this is executed if the commit button is pressed
	var objindex = this.rowid;
	var obj = objid[objindex];
	var district = obj.mission;
	var scriptParams = '?district=' + district;	
	for (var i = 0; i < obj.updateTdTextNodes.length; i++) {
		// we have to handle select drop downs separately
		if(obj.updateTdInputTypes[i] == 'select'){
			var mySelect = document.getElementById(obj.updateTdIds[i]);
			obj.getFieldVals[i] = mySelect.options[mySelect.selectedIndex].value;
			obj.getFieldTexts[i] = mySelect.options[mySelect.selectedIndex].text;
		// the other type is only text input boxes and valid entries need checking
		}else{
			obj.getFieldVals[i] = document.getElementById(obj.updateTdIds[i]).value;
			//console.log(obj.updateTdIds[i],document.getElementById(obj.updateTdIds[i]).value);
		}
		//if(i > 0){
			scriptParams +='&'+obj.updateTdIds[i]+'='+obj.getFieldVals[i];
		//}else{
		//	scriptParams += obj.updateTdIds[i]+'='+obj.getFieldVals[i];
		//}
	}	
	var script = '/cgi-bin/' + obj.addScript + scriptParams;
        var valid = true;
	var illegalChars = /\D/;
	var doubletest = /[^\d.]/;
	for (var i = 0; i < obj.getFieldVals.length; i++) {
        	if ((obj.getFieldVals[i] == "")&&(obj.updateRequired[i] == '1')){
        	        document.getElementById(obj.updateTdIds[i]).style.background = '#f99';
                	valid = false;
		}else if(illegalChars.test(obj.getFieldVals[i])&&(obj.updateDataType[i]=='int')){
                	document.getElementById(obj.updateTdIds[i]).style.background = '#f99';
			alert ("The " +obj.updateTdIds[i]+  " field must only contain numbers");
                	valid = false;
		}else if(doubletest.test(obj.getFieldVals[i])&&(obj.updateDataType[i]=='double')){
                	document.getElementById(obj.updateTdIds[i]).style.background = '#f99';
                	valid = false;
		}else{
        	        document.getElementById(obj.updateTdIds[i]).style.background = '#fff';
		}
	}
        if (valid){
        }else{
		// return back to screen with no further action
                return;
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
	request.open('GET', script, true);
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			var xmlDoc = request.responseXML;
			var options = xmlDoc.documentElement.getElementsByTagName("option");
			for (var x = 0; x < options.length; x++){	
				var result = (options[x].getAttribute("result"));
				var id = (options[x].getAttribute("insertid"));
				document.getElementById('updaterow2').value = id;
				if (result == '1'){						
					getData(objindex,obj.order);
				}else{
					alert("There has been a problem with the record insertion. (" + result + ")");
				}				
			}	
		} 
	}
	request.send(null);
}
