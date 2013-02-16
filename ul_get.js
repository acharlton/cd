function getData(objindex,order){
	var obj = objid[objindex];
	var type = obj.eqType;
	var mission = obj.mission;
	var tablename = obj.tableName;
	var del = obj.mysqlTable;
	var tableDiv = obj.tableDiv;
	
	var script = obj.getScript;
	updateH3(tablename,objindex,obj.headerDiv); //ul_common.js
	removeAddTable();
	removeContentTable();
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
	//console.log(script,order,tableDiv);
	request.open('GET', 'http://10.180.12.121/cgi-bin/' + script + '?order=' + order + '&type='+ type +'&mission=' + mission,true);
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			//console.log("clearing " + obj.tableDiv);
			clearModelsList(obj.tableDiv);
			//var div = document.getElementById('table_header');	
			//var content = div.appendChild(document.createElement('div'));
			//content.setAttribute('id',tableDiv);			
			var xmlDoc = request.responseXML;
			var options = xmlDoc.documentElement.getElementsByTagName("option");		
			var divTable = document.getElementById(tableDiv);	
			var table = divTable.appendChild(document.createElement('table'));
			table.setAttribute('id',tablename);			
			var thead = table.appendChild(document.createElement('thead'));
			var tbody = table.appendChild(document.createElement('tbody'));
			var tr = thead.appendChild(document.createElement('tr'));
			tr.className='rowH';
			var th = tr.appendChild(document.createElement('th'));
			th.className='rowH';
			th.appendChild(document.createTextNode('Delete'));
			var th = tr.appendChild(document.createElement('th'));
			th.className='rowH';
			th.appendChild(document.createTextNode('Update'));
			//header row display
			for (var i = 0; i < obj.getThText.length; i++) {
				tr.appendChild(createThCellWithText(objindex,obj.getThText[i]));
			}
			
			var rowCount = 0;
			for (var x = 0; x < options.length; x++){	
				for (var i = 0; i < obj.getThText.length; i++) {
					obj.getFieldVals[i] = options[x].getAttribute(obj.getThText[i]);
				}
				var id = obj.getFieldVals[0];

				rowCount++;
				var rowClass = "rowB";
				if (rowCount % 2 == 0){
					rowClass = "rowA";
				}
				var row = document.createElement("tr");
				row.setAttribute('id','row_' + id);
				row.className = rowClass;

				var cell = document.createElement("td");
				var newlink = cell.appendChild(document.createElement('a'));
				newlink.setAttribute('href', 'javascript:delete_record("' + id + '","' +tablename + '","' + del + '")');
				newlink.setAttribute('title', 'delete this record');				
				newlink.appendChild(document.createTextNode("delete"));
				row.appendChild(cell);

				var cell = document.createElement("td");
				var newlink = cell.appendChild(document.createElement('a'));
				newlink.setAttribute('href', 'javascript:update_record("'+id+'","'+objindex+'")');
				newlink.setAttribute('title', 'update this record');				
				newlink.appendChild(document.createTextNode("update"));
				row.appendChild(cell);
			
				// add each cell in the row
				for (var i = 0; i < obj.getThText.length; i++) {
					var rowid = 'row_' + id + '_' + obj.getThText[i];
					//console.log(escape(obj.getFieldVals[i]));
					//console.log(encodeURIComponent(obj.getFieldVals[i]));
					row.appendChild(createCellWithText(obj.getFieldVals[i],rowid,objindex,obj.fieldValidate[i]));
				}	
				tbody.appendChild(row);
			}
			// used to indicate which value was just added from ul_add.js			
			var id = document.getElementById('updaterow2').value;			
			var myFocus = document.getElementById('row_' + id);
			if (myFocus){
                        	myFocus.style.backgroundColor = "#CDA";
                        	myFocus.firstChild.focus;	
				document.getElementById('updaterow2').value = null;
			}	
		} 
	}
	request.send(null);
}

