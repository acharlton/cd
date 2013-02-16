function delete_record(id,table,delFrom){
	if (confirm("Are you sure? This will remove all associated records! ")){ 
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
		request.open('GET', '/cgi-bin/cd_delete_record.pl?id=' + id + '&table=' + delFrom,true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				var xmlDoc = request.responseXML;
				var options = xmlDoc.documentElement.getElementsByTagName("option");
				for (var x = 0; x < options.length; x++){	
					var result = (options[x].getAttribute("result"));
					if (result == '1'){
						var rid = 'row_' + id;
						var oTable = document.getElementById(table);
						var oTr = document.getElementById(rid);
						oTable.deleteRow(oTr.rowIndex);
					}else{
					}
				}	
			} 
		}
		request.send(null);
	}
}
