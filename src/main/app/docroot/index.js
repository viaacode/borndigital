  		var runningExportId = "";
  		var timerId;
  	
	  	function clearForm() {
	  		document.getElementById("media_id").value = "";
	  		$('#media_type').val("");
	  		$('#media_type').material_select();
	  		$('#destination').val("");
	  		$('#destination').material_select();
	  		document.getElementById("media_id").className = "validate";
	  		var requestbuttonText = document.getElementById("itag").previousSibling;
	  		var requestbutton = document.getElementById("requestbutton");
	  		var responsefield = document.getElementById("responsefield");
			responsefield.innerHTML = "";
			responsefield.removeAttribute("style");
			requestbuttonText.nodeValue = "Request";
			requestbutton.disabled = false;
	  	}
	  	
	  	function tryOut() {
	  		var trybutton = document.getElementById("tryoutbutton");
	  		trybutton.disabled = true;
	  		var query = document.getElementById("query").value;
	  		var jsonObject = {
	  				"query": query
					};
	  		var request = JSON.stringify(jsonObject);
	  		var ajaxRequest; // The variable that makes Ajax possible!

			ajaxPost("/tryQuery", request).then(function(result) {				
				//Success
				var resultObject = JSON.parse(result);
				var responsefield = document.getElementById("responsefield");
				
				document.getElementById("resultsheader").innerHTML = resultObject.totalNrOfResults + " results:";
				
				document.getElementById("resultscontent").innerHTML = syntaxHighlight(JSON.stringify(resultObject.mediaDataList, null, 2));
				
				//document.getElementById("resultscontent").innerHTML = resultObject.result.data;
				trybutton.disabled = false;
				$('#resultModal').openModal();
			}).catch(function() {
				// An error occurred
			  	var responsefield = document.getElementById("responsefield");
			  	responsefield.style.color = "red";
			  	responsefield.innerHTML = "An unknown error occurred.";							
			});
	  	}
	  	
	  	function formatParams( params ){
	  	  return "?" + Object
	  	        .keys(params)
	  	        .map(function(key){
	  	          return key+"="+params[key]
	  	        })
	  	        .join("&")
	  	}
	  	
	  	function syntaxHighlight(json) {
	  	    if (typeof json != 'string') {
	  	         json = JSON.stringify(json, undefined, 2);
	  	    }
	  	    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  	    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
	  	        var cls = 'number';
	  	        if (/^"/.test(match)) {
	  	            if (/:$/.test(match)) {
	  	                cls = 'key';
	  	            } else {
	  	                cls = 'string';
	  	            }
	  	        } else if (/true|false/.test(match)) {
	  	            cls = 'boolean';
	  	        } else if (/null/.test(match)) {
	  	            cls = 'null';
	  	        }
	  	        return '<span class="' + cls + '">' + match + '</span>';
	  	    });
	  	}
  	
  	
		function ajaxFunction() {
			var queryElement = document.getElementById("query");
			var batchSizeElement = document.getElementById("batchsize");
			var startIndexElement = document.getElementById("startindex");
			var tenantElement = document.getElementById("tenant");
			var exportIdElement = document.getElementById("exportid");
			var media_type_doc = document.getElementById("media_type");

			var query = queryElement.value;
			var batchsize = batchSizeElement.value;
			var startindex = startIndexElement.value;
			var tenant = tenantElement.value;
			var exportid = exportIdElement.value;
			var media_type = media_type_doc.options[media_type_doc.selectedIndex].value;
			
			if (query == '') {
				$('#querydiv').find('input')[0].className = "invalid";
			} else {
				$('#querydiv').find('input')[0].className = "validate";
			}
			if (batchsize == '') {
				$('#batchsizediv').find('input')[0].className = "invalid";
			} else {
				$('#batchsizediv').find('input')[0].className = "validate";
			} 
			if (startindex == '') {
				$('#startindexdiv').find('input')[0].className = "invalid";
			} else {
				$('#startindexdiv').find('input')[0].className = "validate";
			} 
			if (tenant == '') {
				$('#tenantdiv').find('input')[0].className = "invalid";
			} else {
				$('#tenantdiv').find('input')[0].className = "validate";
			} 
			if (exportid == '') {
				$('#exportiddiv').find('input')[0].className = "invalid";
			} else {
				$('#exportiddiv').find('input')[0].className = "validate";
			} 
			if (media_type == '') {
				$('#mediatypediv').find('input')[0].className = "invalid";
			} else {
				$('#mediatypediv').find('input')[0].className = "validate";
			}
			
			if (query != '' && batchsize != '' && startindex != '' && tenant != '' && exportid != '' && media_type != '') {	
				
				var requestbuttonText = document.getElementById("itag").previousSibling;
				requestbuttonText.nodeValue = "Working...";
				var requestbutton = document.getElementById("requestbutton");
				requestbutton.disabled = true;
				var ajaxRequest; // The variable that makes Ajax possible!
				var host = "http://"+window.location.hostname;
				var endpoint = host + ":8195/mediahavenexport/init";
				var params = {
				  q: ("%2B" + query), 
				  dbBatchSize: batchsize,
				  startIndex: startindex,
				  tenant: tenant,
				  exportid: exportid,
				  type: (media_type.toUpperCase())
				};
				
				runningExportId = exportid;

				var url = endpoint + formatParams(params);
				
				timerId = setInterval(function(){
					var statusendpoint = "/checkStatus";
					var statusparams = {
						exportid: runningExportId	
					};
					var statusurl = statusendpoint + formatParams(statusparams);
					ajax(statusurl).then(function(result) {
						var responsefield = document.getElementById("responsefield");
						responsefield.innerHTML = result + ' pids added';
					});
				}, 1000);
				
				ajax(url).then(function(result) {
					  // Code depending on result
					  clearInterval(timerId);
					  var responsefield = document.getElementById("responsefield");
					  responsefield.innerHTML = result;
					  /*
					  var requestbutton = document.getElementById("requestbutton");
					  var requestbuttonText = document.getElementById("itag").previousSibling;
					  requestbuttonText.nodeValue = "Requested";
					  requestbutton.disabled = true;
					  var responsefield = document.getElementById("responsefield");
					  var parsedResponse = JSON.parse(result);
					  responsefield.innerHTML = parsedResponse.response;
					  if (parsedResponse.status === "NOK") {
						  responsefield.style.color = "red";
					  }
					  setTimeout(
							    function() {
							    	requestbutton.disabled = false;
							    }, 3000);
					  */
					}).catch(function() {
					  // An error occurred
					  	var responsefield = document.getElementById("responsefield");
					  	responsefield.style.color = "red";
					  	responsefield.innerHTML = "An unknown error occurred.";							
					});			
				}

	}
		
	function findTenant() {
		query = document.getElementById("query").value;
		var regexp = /root>organisation>([A-Za-z ]*)/g;
		var match = regexp.exec(query);
		var tenantElement = document.getElementById("tenant");
		var currentTenant = tenantElement.value
		if (currentTenant == '') {
			if (match != null && match[1] != null && match[1] != '') {
				tenantElement.value = match[1];
			}
		}
	}
		
	function ajax(url) {
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
		    xhr.open('GET', url, true);
		    //xhr.setRequestHeader("Content-type", "application/json");
		    xhr.send();
		  });
	}
	
	function ajaxPost(url, formdata) {
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
		    //xhr.setRequestHeader("Content-type", "application/json");
		    xhr.send(formdata);
		  });
	}