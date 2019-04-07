funtion eam2bi()
{
                    var d = window.document.getElementById(divId + '_details');
                    var i = window.document.getElementById(divId + '_button');
              
                    if( expand == null || typeof(expand) == 'undefined' )
                        expand = (d.style.display == 'block'?false:true);
              
                    if ( expand )
                    {
                        d.style.display = 'block';
                        i.innerHTML = "-";
                    }
                    else
                    {
                        d.style.display = 'none';
                        i.innerHTML = "+";
                    }
                }
            
                function toggleAll(expandAllText, collapseAllText, sectionId)
                {
                    var currentState = null;
                    var expand = true;

  
                    // Determine the current state.
                    eval("currentState = window." + sectionId + "_expand;");
                    if ( currentState == null )
                        expand = false; // default state is now expand
                    else if ( currentState == false )
                        expand = true;
                    else
                        expand = false;
    
                    expandAll(expandAllText, collapseAllText, sectionId, expand);
                    
                    eval("window." + sectionId + "_expand = " + expand + ";");
                }
            
                function expandAll(expandAllText, collapseAllText, sectionId, expand)
                {

                    var expandButton = window.document.getElementById(sectionId + "_button");
                    var indexElements = null;
                    
                    if ( sectionId == "section_detail" )
                        indexElements = window.document.getElementsByTagName("fieldset");
                    else
                        indexElements = window.document.getElementsByTagName("tr");

                    
                    for ( var i = 0; i < indexElements.length; i++)
                    {
                        if ( indexElements[i].id && indexElements[i].id.indexOf(sectionId) >= 0 )
                            toggleDiv(indexElements[i].id, expand);
                    }
                    
                    if ( expandButton && expandButton.innerHTML)
                        if ( expand == true )
                            expandButton.innerHTML = "<span class='expand-collapse'>-</span>" + collapseAllText;
                        else
                            expandButton.innerHTML = "<span class='expand-collapse'>+</span>" + expandAllText;
                }
            
                function findInDetail(indexNumber)
                {
                    // Change the report to "All Events"
                    setView('section_detail', 'viewDetails');
                    
                    // Navigate to the indexNumber anchor.
                    
                    window.location.replace("#detail_" + indexNumber);
                    
                    //Fat.fade_element(id, fps, duration, from, to)                                                         
                    Fat.fade_element('section_detail_' + indexNumber, null, null, '#ffff66', '#ffffff' );
                }

                var currentView = null;
                var currentTabId = null;
                function setView(divId, tabId)
                {
                    
                    lastSectionName = currentSectionName;
                    lastTabName = currentTabName;
                    currentSectionName = divId;
                    currentTabName = tabId;
                    // Get the value of the radioReportOptions radio.
                    //var rg = window.document.getElementsByName("radioView");
                    var currentViewElement = null;
                    var currentTabElement = null;
                    var selectedViewElement = null;
                    var selectedTabElement = null;
                    var requestDetailsElement = window.document.getElementById('sub_menu_container');
                    var requestDetailsTab = window.document.getElementById('requestDetails');
                    var requestSummary = window.document.getElementById('section_generalinformation');
                    
                    switch( divId )
                    {
                    case "section_errors":
                    case "section_compact":
                        if ( requestDetailsElement )
                            requestDetailsElement.style.display = 'none';
                        if ( requestDetailsTab )
                            requestDetailsTab.className = "";
                        break;
                    case "section_detail":
                        if ( requestDetailsElement )
                            requestDetailsElement.style.display = 'block';
                        if ( requestDetailsTab )
                            requestDetailsTab.className = "active";
                        break;
                    }
              
                    // Hide the current view.
                    if ( currentView != null && currentTabId != null )
                    {
                        currentViewElement = window.document.getElementById(currentView);
                        currentTabElement = window.document.getElementById(currentTabId);
                        if ( currentViewElement )
                            currentViewElement.style.display = 'none';
                        if ( currentTabElement )
                            currentTabElement.className = "";
                    }
                    
                    // Show the selected view.
                    selectedViewElement = window.document.getElementById(divId);
                    selectedTabElement = window.document.getElementById(tabId);
                    
                    if ( selectedViewElement )
                        selectedViewElement.style.display = 'block';
              
                    selectedTabElement.className = "active";
              
                    switch( divId )
                    {
                    case "section_errors":
                        if ( requestSummary )
                            requestSummary.style.display = 'block';
                        //toggleDiv("section_generalinformation", true);
                        break;
                    case "section_compact":
                    case "section_detail":
                        if ( requestSummary )
                            requestSummary.style.display = 'none';
                        //toggleDiv("section_generalinformation", false);
                        break;
                    }
              
                    currentView = divId;
                    currentTabId = tabId;
                }
            
                function load()
                {   
                    // If there is a section that needs to be viewed, show it.
                    /*alert("search: " + window.location.search);
                    if ( window.location.search.indexOf("sectionName", 0) >= 0 )
                    {
                        var nv = window.location.search.split('&');
                        var sn = nv[0].split('=')[1];
                        var tn = nv[1].split('=')[1];
                        alert("sn: " + sn + ", tn: " + tn);
                        setView(sn, tn);
                        return;
                    }
                    alert("test2");*/
                    setView('section_errors','viewErrors');
                }
            
                // Sort Table
                addEvent(window, "load", sortables_init);

                var SORT_COLUMN_INDEX;

                function sortables_init() {
                        // Find all tables with class sortable and make them sortable
                        if (!document.getElementsByTagName) return;
                        tbls = document.getElementsByTagName("table");
                        for (ti=0;ti<tbls.length;ti++) {
                                thisTbl = tbls[ti];
                                if (((' '+thisTbl.className+' ').indexOf("sortable") != -1) && (thisTbl.id)) {
                                        //initTable(thisTbl.id);
                                        ts_makeSortable(thisTbl);
                                }
                        }
                
                        //alert("boo: " + window.document.getElementById('defaultsortme'));
                        //ts_resortTable(window.document.getElementById('defaultsortme'), '0'), 
                }

                function ts_makeSortable(table) {
                        var defaultCell = null
                        var defaultIndex = null;
                        
                        if (table.rows && table.rows.length > 0) {
                                var firstRow = table.rows[0];
                        }
                        if (!firstRow) return;
                
                        // We have a first row: assume it's the header, and make its contents clickable links
                        for (var i=0;i<firstRow.cells.length;i++) {
                                var cell = firstRow.cells[i];
                                var txt = ts_getInnerText(cell);
                                /*cell.innerHTML = '<a href="#" class="sortheader" '+ 
                                'onclick="ts_resortTable(this, '+i+');return false;" alt="Sort By This Column">' + 
                                txt+'<span class="sortarrow">&nbsp;</span></a>';*/
                                
                                // BDG: Added default sort direction: desc class for descending.
                                if ( (' '+cell.className+' ').indexOf("desc") != -1 )
                                {
                                    cell.innerHTML = '<a href="#" class="sortheader" '+ 
                                    'onclick="ts_resortTable(this, '+i+');return false;" alt="Sort By This Column">' + 
                                    txt+'<span class="sortarrow" sortdir="down">&nbsp;</span></a>';
                                }
                                else
                                {
                                    cell.innerHTML = '<a href="#" class="sortheader" '+ 
                                    'onclick="ts_resortTable(this, '+i+');return false;" alt="Sort By This Column">' + 
                                    txt+'<span class="sortarrow">&nbsp;</span></a>';
                                }
                                
                                if ( (' '+cell.className+' ').indexOf("defaultsort") != -1 )
                                {
                                    defaultCell = cell;
                                    defaultIndex = i;
                                    var span;
                                    // Mark default sorted column in table with down arrow symbol
                                    for (var ci=0;ci<defaultCell.firstChild.childNodes.length;ci++) 
                                    {
                                        if (defaultCell.firstChild.childNodes[ci].tagName && defaultCell.firstChild.childNodes[ci].tagName.toLowerCase() == 'span') 
                                        {
                                            span = defaultCell.firstChild.childNodes[ci];
                                            span.setAttribute('sortdir','down');
                                            span.innerHTML = '&darr;';
                                        }
                                    }

                                }
                        }
                
                        // ts_makeSortable gets called on page load, so don't sort tables here.
                        // If sorting happens here, page load time goes up.
                        //if ( defaultCell)
                        //    ts_resortTable(defaultCell.firstChild, defaultIndex);
                }

                function ts_getInnerText(el) {
                    if (typeof el == "string") return el;
                    if (typeof el == "undefined") { return el };
                    if (el.innerText) return el.innerText;    //Not needed but it is faster
                    var str = "";
                
                    var cs = el.childNodes;
                    var l = cs.length;
                    for (var i = 0; i < l; i++) {
                        switch (cs[i].nodeType) {
                            case 1: //ELEMENT_NODE
                                str += ts_getInnerText(cs[i]);
                                break;
                            case 3:    //TEXT_NODE
                                str += cs[i].nodeValue;
                                break;
                        }
                    }
                    return str;
                }

                function ts_resortTable(lnk,clid) {
                        // get the span
                        var span;
                        for (var ci=0;ci<lnk.childNodes.length;ci++) {
                                if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
                        }
                        var spantext = ts_getInnerText(span);
                        var td = lnk.parentNode;
                        var column = clid || td.cellIndex;
                        var table = getParent(td,'TABLE');
                
                        // Work out a type for the column
                        if (table.rows.length <= 1) return;
                        var itm = ts_getInnerText(table.rows[1].cells[column]);
                        sortfn = ts_sort_caseinsensitive;
                        if (table.className.indexOf("col-number") != -1) {
                        	sortfn =ts_sort_numeric;
                      	}
                        else if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)) {
                            sortfn = ts_sort_date;
                        }
                        else if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)) {
                            sortfn = ts_sort_date;
                        }
                        else if  (itm.match(/^[\d\.]+$/) || itm == "<!--EmptyNumber-->" ) {
                            sortfn = ts_sort_numeric;
                        }
                        
                        SORT_COLUMN_INDEX = column;
                        var firstRow = new Array();
                        var newRows = new Array();
                        for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
                        for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }

                        newRows.sort(sortfn);

                        if (span.getAttribute("sortdir") == 'down') {
                                ARROW = '&uarr;';
                                newRows.reverse();
                                span.setAttribute('sortdir','up');
                        } else {
                                ARROW = '&darr;';
                                span.setAttribute('sortdir','down');
                        }
                        
                        // BDG: Set the 'alt' class.
                        for ( i = 0; i < newRows.length; i++ )
                        {
                            if ( i % 2 == 0 )
                                newRows[i].className = "alt";
                            else
                                newRows[i].className = ""
                        }
                
                        // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
                        // don't do sortbottom rows
                        for (i=0;i<newRows.length;i++) { if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) table.tBodies[0].appendChild(newRows[i]);}
                        // do sortbottom rows only
                        for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) table.tBodies[0].appendChild(newRows[i]);}
                
                        // Delete any other arrows there may be showing
                        var allspans = document.getElementsByTagName("span");
                        for (var ci=0;ci<allspans.length;ci++) {
                                if (allspans[ci].className == 'sortarrow') {
                                        if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
                                                allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
                                        }
                                }
                        }
                    
                        span.innerHTML = ARROW;
                }

                function getParent(el, pTagName) {
                    if (el == null) return null;
                    else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())    // Gecko bug, supposed to be uppercase
                        return el;
                    else
                        return getParent(el.parentNode, pTagName);
                }
                function ts_sort_date(a,b) {
                        // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
                        aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
                        bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
                        if (aa.length == 10) {
                                dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
                        } else {
                                yr = aa.substr(6,2);
                                if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
                                dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
                        }
                        if (bb.length == 10) {
                                dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
                        } else {
                                yr = bb.substr(6,2);
                                if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
                                dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
                        }
                        if (dt1==dt2) return 0;
                        if (dt1<dt2) return -1;
                        return 1;
                }

                function ts_sort_numeric(a,b) { 
                        aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
                        //if (isNaN(aa)) aa = 0;
                        if (isNaN(aa))
                            return 1;
                        bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX])); 
                        //if (isNaN(bb)) bb = -1;
                        if (isNaN(bb))
                            return -1;
                        return aa-bb;
                }

                function ts_sort_caseinsensitive(a,b) {
                        aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
                        bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
                        if (aa==bb) return 0;
                        if (aa<bb) return -1;
                        return 1;
                }

                function ts_sort_default(a,b) {
                        aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
                        bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
                        if (aa==bb) return 0;
                        if (aa<bb) return -1;
                        return 1;
                }


                function addEvent(elm, evType, fn, useCapture)
                // addEvent and removeEvent
                // cross-browser event handling for IE5+,  NS6 and Mozilla
                // By Scott Andrew
                {
                    if (elm.addEventListener){
                        elm.addEventListener(evType, fn, useCapture);
                        return true;
                    } else if (elm.attachEvent){
                        var r = elm.attachEvent("on"+evType, fn);
                        return r;
                    } else {
                        alert("Handler could not be removed");
                    }
                } 
                
                /*  FADE METHODS */
                var Fat = {
                    make_hex : function (r,g,b) 
                    {
                        r = r.toString(16); if (r.length == 1) r = '0' + r;
                        g = g.toString(16); if (g.length == 1) g = '0' + g;
                        b = b.toString(16); if (b.length == 1) b = '0' + b;
                        return "#" + r + g + b;
                    },
                    fade_all : function ()
                    {
                        var a = document.getElementsByTagName("*");
                        for (var i = 0; i < a.length; i++) 
                        {
                            var o = a[i];
                            var r = /fade-?(\w{3,6})?/.exec(o.className);
                            if (r)
                            {
                                if (!r[1]) r[1] = "";
                                if (o.id) Fat.fade_element(o.id,null,null,"#"+r[1]);
                            }
                        }
                    },
                    fade_element : function (id, fps, duration, from, to) 
                    {
                        if (!fps) fps = 30;
                        if (!duration) duration = 3000;
                        if (!from || from=="#") from = "#FFFF33";
                        if (!to) to = this.get_bgcolor(id);
                        
                        var frames = Math.round(fps * (duration / 1000));
                        var interval = duration / frames;
                        var delay = interval;
                        var frame = 0;
                        
                        if (from.length < 7) from += from.substr(1,3);
                        if (to.length < 7) to += to.substr(1,3);
                        
                        var rf = parseInt(from.substr(1,2),16);
                        var gf = parseInt(from.substr(3,2),16);
                        var bf = parseInt(from.substr(5,2),16);
                        var rt = parseInt(to.substr(1,2),16);
                        var gt = parseInt(to.substr(3,2),16);
                        var bt = parseInt(to.substr(5,2),16);
                        
                        var r,g,b,h;
                        while (frame < frames)
                        {
                            r = Math.floor(rf * ((frames-frame)/frames) + rt * (frame/frames));
                            g = Math.floor(gf * ((frames-frame)/frames) + gt * (frame/frames));
                            b = Math.floor(bf * ((frames-frame)/frames) + bt * (frame/frames));
                            h = this.make_hex(r,g,b);
                        
                            setTimeout("Fat.set_bgcolor('"+id+"','"+h+"')", delay);

                            frame++;
                            delay = interval * frame; 
                        }
                        setTimeout("Fat.set_bgcolor('"+id+"','"+to+"')", delay);
                    },
                    set_bgcolor : function (id, c)
                    {
                        var o = document.getElementById(id);
                        o.style.backgroundColor = c;
                    },
                    get_bgcolor : function (id)
                    {
                        var o = document.getElementById(id);
                        while(o)
                        {
                            var c;
                            if (window.getComputedStyle) c = window.getComputedStyle(o,null).getPropertyValue("background-color");
                            if (o.currentStyle) c = o.currentStyle.backgroundColor;
                            if ((c != "" && c != "transparent") || o.tagName == "BODY") { break; }
                            o = o.parentNode;
                        }
                        if (c == undefined || c == "" || c == "transparent") c = "#FFFFFF";
                        var rgb = c.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
                        if (rgb) c = this.make_hex(parseInt(rgb[1]),parseInt(rgb[2]),parseInt(rgb[3]));
                        return c;
                    }
                }