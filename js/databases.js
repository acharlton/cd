
function admin_shelters(mission){
                var dialogOpts = {
                        autoOpen: false,
                        width: 1500,
                        height: 800,
                        modal: true,
			title: mission + ' Shelters'
                }
                $("#setup_dlg").dialog(dialogOpts);
                ($("#setup_dlg").dialog("isOpen")==false) ? $("#setup_dlg").dialog("open") : $("setup_dlg").dialog("close");
                var obj = {
                	order: "id",
                        mission: mission,
			// for delete_record()
			tableName: 'locations',
                        tableNameAdd: 'add_table',
                        tableDiv: "table_content",
                        headerDiv: "table_header",
                        getScript: "cd_get_shelters.pl",
                        updateScript: "cd_update_shelters.pl",
                        addScript: "cd_add_shelters.pl",
			// for delete_record()
                        mysqlTable: "locations",
                        getThText: ['id','name','address','postcode','area','owner','contact1','contact2','lat','lng'],
                        getFieldVals:  [],
                        getFieldTexts: [],
			// should match fields in getThText
                        fieldInputs:  ['input','select','input','input','input','input','input','input','input','input'],
			// should match fields in getThText + 1
                        fieldTypes:  ['text','option','text','text','text','text','text','text','text','text','text','button'],
			// should match fields in getThText
                        fieldSizes: ['10','10','10','10','10','10','10','10','10','10','10'],
                        fieldValidate: ['int','disabled','text','int','int','int','int','int','int','int','int'],

			// visible text labels for display only
                        updateThText: ['name','address','postcode','area','owner','contact1','contact2','lat','lng','commit'],
			// all fields + commit button must match table field names
                        updateTdIds: ['name','address','postcode','area','owner','contact1','contact2','lat','lng','commit'],
			//all fields from database without commit button
                        updateTdTextNodes: ['name','address','postcode','area','owner','contact1','contact2','lat','lng'],
                        updateRequired: ['1','1','0','1','1','0','0','0','1','1'],
                        updateDataType: ['varchar','varchar','int','varchar','varchar','varchar','varchar','double','double'],
			// DOM input field: text|select
                        updateTdInputTypes:  ['input','input','input','input','input','input','input','input','input','input'],
			// DOM element type: option|text
                        updateTdTypes:  ['text','text','text','text','text','text','text','text','text','button'],
                        updateTdSizes: ['10','10','10','10','10','10','10','10','10'],

                        selectsId: ['district'],
                        selectsTableName: ['districts'],
                        selectsValue: ['district'],
                        selectsUpdateScripts: ['cd_getList.pl'],
                        selectsScripts: ['cd_getList.pl'],
			// used only for update
                        updateOffset: [3,4,5,6,7,8,9,10,11,12,13]
		}
                objid[0] = obj;
                getData(0,"id");// ul_get.js
}

function admin_offices(mission){
                var dialogOpts = {
                        autoOpen: false,
                        width: 1500,
                        height: 800,
                        modal: true,
			title: mission + ' Offices'
                }
                $("#setup_dlg").dialog(dialogOpts);
                ($("#setup_dlg").dialog("isOpen")==false) ? $("#setup_dlg").dialog("open") : $("setup_dlg").dialog("close");
                        var obj = {
                                order: "id",
                          	mission: mission,
				// for delete_record()
				tableName: 'locations',
                                tableNameAdd: 'add_table',
                                tableDiv: "table_content",
                                headerDiv: "table_header",
                                getScript: "cd_get_offices.pl",
                                updateScript: "cd_update_offices.pl",
                                addScript: "cd_add_offices.pl",
				// for delete_record()
                                mysqlTable: "locations",
                                getThText: ['id','name','address','postcode','area','owner','contact1','contact2','lat','lng'],
                                getFieldVals:  [],
                                getFieldTexts: [],
				// should match fields in getThText
                                fieldInputs:  ['input','select','input','input','input','input','input','input','input','input'],
				// should match fields in getThText + 1
                                fieldTypes:  ['text','option','text','text','text','text','text','text','text','text','text','button'],
				// should match fields in getThText
                                fieldSizes: ['10','10','10','10','10','10','10','10','10','10','10'],
                                fieldValidate: ['int','disabled','text','int','int','int','int','int','int','int','int'],

				// visible text labels for display only
                                updateThText: ['name','address','postcode','area','owner','contact1','contact2','lat','lng','commit'],
				// all fields + commit button must match table field names
                                updateTdIds: ['name','address','postcode','area','owner','contact1','contact2','lat','lng','commit'],
				//all fields from database without commit button
                                updateTdTextNodes: ['name','address','postcode','area','owner','contact1','contact2','lat','lng'],
                                updateRequired: ['1','1','0','1','0','0','0','1','1'],
                                updateDataType: ['varchar','varchar','int','varchar','varchar','varchar','varchar','double','double'],
				// DOM input field: text|select
                                updateTdInputTypes:  ['input','input','input','input','input','input','input','input','input','input'],
				// DOM element type: option|text
                                updateTdTypes:  ['text','text','text','text','text','text','text','text','text','button'],
                                updateTdSizes: ['10','10','10','10','10','10','10','10','10'],

                                selectsId: ['district'],
                                selectsTableName: ['districts'],
                                selectsValue: ['district'],
                                selectsUpdateScripts: ['cd_getList.pl'],
                                selectsScripts: ['cd_getList.pl'],
				// used only for update
                                updateOffset: [3,4,5,6,7,8,9,10,11,12,13]
                        }
                        objid[0] = obj;
                        getData(0,"id");// ul_get.js
}


        
function admin_base_radios(mission){
                var dialogOpts = {
                        autoOpen: false,
                        width: 1500,
                        height: 800,
                        modal: true,
			title: mission + ' Base Radios'
                }
                $("#setup_dlg").dialog(dialogOpts);
                ($("#setup_dlg").dialog("isOpen")==false) ? $("#setup_dlg").dialog("open") : $("setup_dlg").dialog("close");
               	var obj = {
                                order: "id",
                          	mission: mission,
				tableName: 'base_radios',
                                tableNameAdd: 'add_table',
                                tableDiv: "table_content",
                                headerDiv: "table_header",
                                getScript: "cd_get_base_radios.pl",
                                updateScript: "cd_update_base_radios.pl",
                                addScript: "cd_add_base_radios.pl",
                                mysqlTable: "base_radios",
				// 5 fields
                                getThText: ['id','serial_number','model','ani','last_check','name'],
                                getFieldVals:  [],
                                getFieldTexts: [],
				// should match fields in getThText
                                fieldInputs:  ['input','input','input','input','input','input'],
				// should match fields in getThText + 1
                                fieldTypes:  ['text','text','text','text','text','text','button'],
				// should match fields in getThText
                                fieldSizes: ['10','10','10','10','10','10','10'],
                                fieldValidate: ['int','int','int','int','int','int','int'],

                                updateThText: ['serial number','model','ani','last check','Building Name','commit'],
                                updateTdIds: ['serial_number','model','ani','last_check','name','commit'],
                                
				updateTdTextNodes: ['serial_number','model','ani','last_check','name'],
                                updateRequired: ['0','1','0','0','1'],
                                updateDataType: ['varchar','int','varchar','varchar','int'],
                                
				updateTdInputTypes:  ['input','select','input','input','select','input'],
                                updateTdTypes:  ['text','option','text','text','option','button'],
                                updateTdSizes: ['10','10','10','10','10','10','10','10','10'],
                                selectsId: ['','model','','','name'],
                                selectsTableName: ['','models','','','locations'],
                                selectsValue: ['','model','','','name'],
                                selectsUpdateScripts:   ['','cd_getList.pl','','','cd_getList.pl'],
                                selectsScripts: 	['','cd_getList.pl','','','cd_getLimitedList.pl'],
                                selectsFilter: ['','','','',mission],
                                selectsUpdateFilter: ['','','','',''],
				updateOffset: [3,4,5,6,7,8,9,10,11,12,13]
		}
                objid[2] = obj;
                getData(2,"id");
}
function admin_vehicle_radios(mission){
                var dialogOpts = {
                        autoOpen: false,
                        width: 1500,
                        height: 800,
                        modal: true,
			title: mission + ' Vehicle Radios'
                }
                $("#setup_dlg").dialog(dialogOpts);
                ($("#setup_dlg").dialog("isOpen")==false) ? $("#setup_dlg").dialog("open") : $("setup_dlg").dialog("close");
               	var obj = {
                                order: "id",
                          	mission: mission,
				tableName: 'vehicle_radios',
                                tableNameAdd: 'add_table',
                                tableDiv: "table_content",
                                headerDiv: "table_header",
                                getScript: "cd_get_vehicle_radios.pl",
                                updateScript: "cd_update_vehicle_radios.pl",
                                addScript: "cd_add_vehicle_radios.pl",
                                mysqlTable: "vehicle_radios",
				// 5 fields
                                getThText: ['id','serial_number','model','ani','last_check','name'],
                                getFieldVals:  [],
                                getFieldTexts: [],
				// should match fields in getThText
                                fieldInputs:  ['input','input','input','input','input','input'],
				// should match fields in getThText + 1
                                fieldTypes:  ['text','text','text','text','text','text','button'],
				// should match fields in getThText
                                fieldSizes: ['10','10','10','10','10','10','10'],
                                fieldValidate: ['int','int','int','int','int','int','int'],

                                updateThText: ['serial number','model','ani','last check','Building Name','commit'],
                                updateTdIds: ['serial_number','model','ani','last_check','name','commit'],
                                
				updateTdTextNodes: ['serial_number','model','ani','last_check','name'],
                                updateRequired: ['0','1','0','0','1'],
                                updateDataType: ['varchar','int','varchar','varchar','int'],
                                
				updateTdInputTypes:  ['input','select','input','input','select','input'],
                                updateTdTypes:  ['text','option','text','text','option','button'],
                                updateTdSizes: ['10','10','10','10','10','10','10','10','10'],
                                selectsId: ['','model','','','name'],
                                selectsTableName: ['','models','','','locations'],
                                selectsValue: ['','model','','','name'],
                                selectsUpdateScripts:   ['','cd_getList.pl','','','cd_getList.pl'],
                                selectsScripts: 	['','cd_getList.pl','','','cd_getLimitedList.pl'],
                                selectsFilter: ['','','','',mission],
                                selectsUpdateFilter: ['','','','',''],
				updateOffset: [3,4,5,6,7,8,9,10,11,12,13]
		}
                objid[3] = obj;
                getData(3,"id");
}
function admin_portable_radios(mission){
                var dialogOpts = {
                        autoOpen: false,
                        width: 1500,
                        height: 800,
                        modal: true,
			title: mission + ' Portable Radios'
                }
                $("#setup_dlg").dialog(dialogOpts);
                ($("#setup_dlg").dialog("isOpen")==false) ? $("#setup_dlg").dialog("open") : $("setup_dlg").dialog("close");
               	var obj = {
                                order: "id",
                          	mission: mission,
				tableName: 'portable_radios',
                                tableNameAdd: 'add_table',
                                tableDiv: "table_content",
                                headerDiv: "table_header",
                                getScript: "cd_get_portable_radios.pl",
                                updateScript: "cd_update_portable_radios.pl",
                                addScript: "cd_add_portable_radios.pl",
                                mysqlTable: "portable_radios",
				// 5 fields
                                getThText: ['id','serial_number','model','ani','last_check','name'],
                                getFieldVals:  [],
                                getFieldTexts: [],
				// should match fields in getThText
                                fieldInputs:  ['input','input','input','input','input','input'],
				// should match fields in getThText + 1
                                fieldTypes:  ['text','text','text','text','text','text','button'],
				// should match fields in getThText
                                fieldSizes: ['10','10','10','10','10','10','10'],
                                fieldValidate: ['int','int','int','int','int','int','int'],

                                updateThText: ['serial number','model','ani','last check','Building Name','commit'],
                                updateTdIds: ['serial_number','model','ani','last_check','name','commit'],
                                
				updateTdTextNodes: ['serial_number','model','ani','last_check','name'],
                                updateRequired: ['0','1','0','0','1'],
                                updateDataType: ['varchar','int','varchar','varchar','int'],
                                
				updateTdInputTypes:  ['input','select','input','input','select','input'],
                                updateTdTypes:  ['text','option','text','text','option','button'],
                                updateTdSizes: ['10','10','10','10','10','10','10','10','10'],
                                selectsId: ['','model','','','name'],
                                selectsTableName: ['','models','','','locations'],
                                selectsValue: ['','model','','','name'],
                                selectsUpdateScripts:   ['','cd_getList.pl','','','cd_getList.pl'],
                                selectsScripts: 	['','cd_getList.pl','','','cd_getLimitedList.pl'],
                                selectsFilter: ['','','','',mission],
                                selectsUpdateFilter: ['','','','',''],
				updateOffset: [3,4,5,6,7,8,9,10,11,12,13]
		}
                objid[4] = obj;
                getData(4,"id");
}



