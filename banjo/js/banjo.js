var myLayout; // a var is required because this page utilizes: myLayout.allowOverflow() method
var rule;

function getCSSSelector(obj){ 
    var id = "";
    var selector = "";
    while (!id && obj.parents) {
        id = obj.attr('id');
        if (id) {
            selector = obj.attr('tagName').toLowerCase() + "#" + id + " " + selector;
        }
        else {
            tag = obj.attr('tagName').toLowerCase();
            if (obj.attr('class'))
            tag = tag + "." + obj.attr('class').replace(' ', '.');
            selector = tag + " " + selector;
        }

        obj = obj.parent();
    }    
    return selector;
}


//function for building a nav tree for the DOM
function getTreeLinks(obj){
    message ='';
    tmp ='';
    $('#inspectSourceElementDialog #DOMtree');
    obj.parents().each(function(n){ 
        //Should add a div to the tree display
        //then create those items that will populate it, but you need a node first
       
        message = '<span>' + $(this).attr('tagName') + '</span> ' +  message;
         
        
    });
      
      $('#inspectSourceElementDialog #DOMtree').html(message);  
      
      $('#inspectSourceElementDialog #DOMtree span').each(function(){
          
          
          $(this).bind('click' ,function(event){
              
              selector = getCSSSelector($(this));
              parent = getCSSSelector($(this).parent());
              // selector = selector + ":nth-child(2)"
              // selector += "#" + id;
              console.log("Got source selector " + selector);
              $('#delivsource').contents()
              .find('.highlighted')
              .css('border', '')
              .removeClass('highlighted')
              .end()
              .find(selector)
              .addClass('highlighted')
              .css('border', '2px solid red');

              // alert("Got source selector " + selector);

              $('#inspectSourceElementDialog #currentElement').html(selector);
              $('#inspectSourceElementDialog #parentElement').html(parent);
              //getTreeLinks($(this));
              
          });         
      });     
    return message;
}

$(document).ready(function() {

	myLayout = $('body').layout({
	    center__paneSelector:   "#delivtarget",
	    west__paneSelector:     "#delivsource",
        west__size:             Math.floor(window.innerWidth / 2),
        south__paneSelector:    "#banjocontrolpanel",
        south__size:            "300", 
	});





    $('#inspectSourceElementDialog').dialog({ bgiframe: true,
                            			autoOpen: false,
                            			height: 350,
                            			width: 500,
                            			modal: true,
                            			buttons: {
                            				'Confirm': function() {
                        						$(this).dialog('close');                        						
                            					}
                            				},
                            				'Cancel': function() {
                            					$(this).dialog('close');
                            				}
                            			});

    $('#inspectTargetElementDialog').dialog({ bgiframe: true,
                            			autoOpen: false,
                            			height: 350,
                            			width: 500,
                            			modal: true,
                            			buttons: {
                            				'Confirm': function() {

                        						// Generate a Deliverance selector string.
                        						var sourceRule = "";
                                            	if ($("#inspectSourceElementDialog #sourcechildren").is(':checked')){
                                            	    sourceRule = "children: ";
                                            	}
                                            	sourceSelector = $('#inspectSourceElementDialog #currentElement').html();
                                            	sourceRule += sourceSelector;
                                            	console.log(sourceRule);
                                            	
                        						var targetRule = "";
                                            	if ($("#inspectTargetElementDialog #targetchildren").is(':checked')){
                                            	    targetRule = "children: ";
                                            	}
                                            	targetSelector = $('#inspectTargetElementDialog #currentElement').html();
                                            	targetRule += targetSelector;

                                                row = "<tr>" + 
                                                      "<td>" + $('#inspectSourceElementDialog input[name=action]:checked').val() + "</td>" + 
                                                      "<td>" + sourceRule + "</td>" + 
                                                      "<td>" + targetRule + "</td>" + 
                                                      "<td class='actions'><a href='#' class='deleteRule'>Delete</a></td></tr>";
                        						$('#banjocontrolpanel').contents().find('table#rules tbody').append(row);

                        						$(this).dialog('close');                        						
                            					}
                            				},
                            				'Cancel': function() {
                            					$(this).dialog('close');
                            				}
                            			});


    $('#delivsource').load(function() {
        $(this).contents().find("*").click(function() {
            // get some sort of css selector based around the html id.
            selector = getCSSSelector($(this));
            parent = getCSSSelector($(this).parent());
            // selector = selector + ":nth-child(2)"
            // selector += "#" + id;
            console.log("Got source selector " + selector);
            $('#delivsource').contents()
            .find('.highlighted')
            .css('border', '')
            .removeClass('highlighted')
            .end()
            .find(selector)
            .addClass('highlighted')
            .css('border', '2px solid red');

            // alert("Got source selector " + selector);
            
            $('#inspectSourceElementDialog #currentElement').html(selector);
            $('#inspectSourceElementDialog #parentElement').html(parent);
            //getTreeLinks($(this));
            $('#inspectSourceElementDialog').dialog('open');
            return false;
        });
    });

    $('#delivtarget').load(function() {
        $(this).contents().find("*").click(function() {
            // get some sort of css selector based around the html id.
            selector = getCSSSelector($(this));
            parent = getCSSSelector($(this).parent());
            console.log("Got target selector " + selector);

            $('#delivtarget').contents()
            .find('.highlighted')
            .css('border', '')
            .removeClass('highlighted')
            .end()
            .find(selector)
            .addClass('highlighted')
            .css('border', '2px solid red');

            // alert("Got source selector " + selector);
            $('#inspectTargetElementDialog #currentElement').html(selector);
            $('#inspectTargetElementDialog #parentElement').html(parent);
            $('#inspectTargetElementDialog').dialog('open');

            return false;
        });
    });
    
});

