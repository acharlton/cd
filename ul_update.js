
// updates

function update_record(id,oid){
	var obj = objid[oid];
	removeAddTable();
	buildTbl(obj,oid,updateRow); // build mini table above main one
	document.getElementById('updaterow').value = id;	
	var oTr = document.getElementById('row_' + id);	
	// populate the mini table with text nodes from the main table row that was chosen
	for (var i = 0; i < obj.updateTdTextNodes.length; i++) {
		if(obj.updateTdTypes[i] == 'text'){
			document.getElementById(obj.updateTdIds[i]).value = oTr.childNodes[obj.updateOffset[i]].innerHTML;
			//console.log("check text:",oTr.childNodes[obj.updateOffset[i]].innerHTML,document.getElementById(obj.updateTdIds[i]).value,obj.updateTdIds[i]);
		}else if(obj.updateTdTypes[i] == 'option'){
			//console.log("check option:" + oTr.childNodes[obj.updateOffset[i]].innerHTML + ":"+ document.getElementById(obj.updateTdIds[i]).value +":" +obj.updateTdIds[i]);
			loadSelect(obj.selectsId[i],obj.selectsTableName[i],obj.selectsValue[i],oTr.childNodes[obj.updateOffset[i]].innerHTML,obj.selectsUpdateScripts[i],obj.selectsUpdateFilter[i]);	
		}else if(obj.updateTdTypes[i] == 'button'){
		}		
	}	
}

function updateRow(){
	var objindex = this.rowid;
        var obj = objid[objindex];
	var id = document.getElementById('updaterow').value;
	var district = obj.mission;
        var scriptParams = '?id='+id+'&district=' + district; 
	//var scriptParams = '?id='+id;	
	//console.log(scriptParams);
	for (var i = 0; i < obj.updateTdIds.length; i++) {
		if(obj.updateTdInputTypes[i] == 'select'){
			var mySelect = document.getElementById(obj.updateTdIds[i]);
			obj.getFieldVals[i] = mySelect.options[mySelect.selectedIndex].value;
			obj.getFieldTexts[i] = mySelect.options[mySelect.selectedIndex].text;
		}else{
			obj.getFieldVals[i] = document.getElementById(obj.updateTdIds[i]).value;
			//console.log("test:", obj.getFieldVals[i]);
		}
                scriptParams +='&'+obj.updateTdIds[i]+'='+obj.getFieldVals[i];
	}	
	var script = '/cgi-bin/' + obj.updateScript + scriptParams;	
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
                        //console.log("test");
                        document.getElementById(obj.updateTdIds[i]).style.background = '#f99';
                        alert ("The " +obj.updateTdIds[i]+  " field must only contain a double between 0 and 360");
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
				var id = (options[x].getAttribute("id"));
				document.getElementById('updaterow2').value = id;
				if (result == '1'){
                                        getData(objindex,obj.order);
                                }else{
                                        alert("There has been a problem with the record insertion. (" + result + ")");
                                }
				/* this allows us to move focus on the updated record but not before teh screen is refreshed from the server 
					var myFocus = document.getElementById('row_' + id);					
					myFocus.style.backgroundColor = "#CDA";	
					myFocus.firstChild.focus;			
					for (var i = 0; i < obj.updateTdIds.length-1; i++){  // -1 to cut out the commit button
							if(obj.updateTdInputTypes[i] == 'select'){
								document.getElementById('row_' + id + '_' + obj.updateTdIds[i]).innerHTML=obj.getFieldTexts[i];
							}else{
								document.getElementById('row_' + id + '_' + obj.updateTdIds[i]).innerHTML=obj.getFieldVals[i];
							}	
					}
				*/			
			}	
		} 
	}
	request.send(null);
}

