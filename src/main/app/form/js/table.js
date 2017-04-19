angular.module('ngAppDemo', ['ultimateDataTableServices']).controller('ngAppDemoController', ['$scope','datatable',function($scope,datatable) {
    var datatableConfig = {
            "name":"simple_datatable",
            "pagination":{
                "mode":'local'
            }
    };
    var send = {}; // data to send
    
    function handleFileSelect(evt) {
        var file = evt.target.files[0];
        var filename = file.name;
        
        Papa.parse(file, {
            header: true,
            dynamicTyping: false,
            skipEmptyLines: false,
            complete: function(results) {
                var hasErrors = false;
                var errors = [];

                for (i=0; i<results.data.length; i+= 1) {
                    var obj = results.data[i];
                    // Some preprocessing for bad characters in key
                    $.each(obj, function(key, value) {
                        if (key == "checksum") {
                            Object.defineProperty(obj, "md5",
                                    Object.getOwnPropertyDescriptor(obj, key));
                            delete obj[key];
                        } else if (key == "ID" || key == "Id" || key == "iD") {
                            Object.defineProperty(obj, "id",
                                    Object.getOwnPropertyDescriptor(obj, key));
                            delete obj[key];
                        } else if (key != "filename" && key != "md5" && key != "id" && key != "total"){
                            delete obj[key];
                        }
                    });
                    
                    // Check empty object / empty line in CSV
                    if (obj.filename == "" && !obj.hasOwnProperty("md5")) {
                        // Remove from data
                        results.data.splice(i);
                    } 
                    // required properties all available? 
                    else if (!obj.hasOwnProperty("filename") || !obj.hasOwnProperty("md5") || !obj.hasOwnProperty("id")){
                        // add to error
                        var error = {"error": "One of the required properties are missing."};
                        $.each(obj, function(key, value) {
                            error[key] = value; // append to error
                        });
                        errors.push(error);
                        hasErrors = true;
                    } 
//                    else if (obj.md5 == 'd41d8cd98f00b204e9800998ecf8427e') {
//                        // add to error
//                        var error = {"error": "File is empty, because MD5 is d41d8cd98f00b204e9800998ecf8427e"};
//                        $.each(obj, function(key, value) {
//                            error[key] = value; // append to error
//                        });
//                        errors.push(error);
//                        hasErrors = true;
//                    }
                    // futher validation needed?
                }

                if (hasErrors) {
                    //console.log(errors);
                    // Show datatable
                    var columns = [];
                    var c = { "header": "error",
                            "property": "error",
                            "order":false,
                            "type": "text",
                            "edit":true
                    };
                    columns.push(c); // Add header for error message
                    for (var i=0; i<results.meta.fields.length; i+= 1) {
                        // Columns with a '-' are not displayed correctly!
                        var n = results.meta.fields[i].replace('-','_');
                        
                        var c = { "header": n,
                                "property": n,
                                "order":false,
                                "type": "text",
                                "edit":true
                        };
                        columns.push(c);
                    }
                    datatableConfig.columns = columns;

                    $scope.datatable = datatable(datatableConfig);
                    
                    $scope.datatable.setData(errors);
                } else {
                    console.log("no errors found");
                    // Show button to send to VIAA
                    $("#uploadBtn").css("visibility", "visible");
                    
                    send = {
                    	"filename": filename,
                        "data" : results.data,
                        "cp": document.getElementById('cp').value
                    };
                }
            }
        });
    }
    
    function ajax(url, formData) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            try {
                // Opera 8.0+, Firefox, Safari
                xhr = new XMLHttpRequest();
            } catch (e) {
                // Internet Explorer Browsers
                try {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        // Something went wrong
                        alert("Your browser broke!");
                        return false;
                    }
                }
            }
            xhr.onload = function() {
              resolve(this.responseText);
            };
            xhr.onerror = reject;
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(formData);
          });
    }
    
    $("#uploadFile").change(handleFileSelect);
    $("#uploadBtn").on("click", function (e) {
        e.preventDefault();
        // Send to server
        ajax("/", JSON.stringify(send)).then(function(result) {
            $("#succesMsg").css("visibility", "visible");
        });
    });
}]);