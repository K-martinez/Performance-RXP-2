/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.946969696969697, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000002C/realtime-591"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/entities-21"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000F0/realtime-588"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000AGZF/realtime-607"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/search/securities-565"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/search/securities-564"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-576"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-575"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-17"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-32"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0001L1P7/realtime-609"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-34"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00009WEM/realtime-577"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-10"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000B7/realtime-587"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00011HZW/realtime-571"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00007NYP/realtime-589"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000BEYH/realtime-583"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-12"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/movers-595"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BPWO/realtime-572"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v2/search/securities-22"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322R/realtime-579"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-24"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00014L0S/realtime-608"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-597"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-596"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/movers-600"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-599"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-598"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0001P7KW/realtime-568"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-23"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000005M/realtime-605"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P000171MJ/realtime-606"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v2/search/securities-11"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-13"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B9VF/realtime-610"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BQNK/realtime-567"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/entities-31"], "isController": false}, {"data": [0.5, 500, 1500, "See Articles and Videos/api/v1/search/articles-1"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322T/realtime-580"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/by-id-602"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000151KD/realtime-582"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B12F/realtime-611"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/securities/movers-574"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000X7UP/realtime-569"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00007NXM/realtime-570"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00017M6Y/realtime-581"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00019QA2/realtime-593"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/securities/0P000000GY/realtime-566"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001ACT3/realtime-578"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00016YML/realtime-590"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-585"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-584"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-28"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-33"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 66, 0, 0.0, 267.5757575757575, 107, 1271, 201.0, 515.9000000000001, 618.3999999999999, 1271.0, 3.7294456687574167, 4.473745550093236, 4.353779065660847], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", 1, 0, 0.0, 107.0, 107, 107, 107.0, 107.0, 107.0, 107.0, 9.345794392523365, 12.229848130841122, 12.886974299065422], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000002C/realtime-591", 1, 0, 0.0, 192.0, 192, 192, 192.0, 192.0, 192.0, 192.0, 5.208333333333333, 3.4891764322916665, 5.884806315104167], "isController": false}, {"data": ["See All Results/api/v1/search/entities-21", 1, 0, 0.0, 497.0, 497, 497, 497.0, 497.0, 497.0, 497.0, 2.012072434607646, 1.2025276659959758, 2.367721956740443], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000F0/realtime-588", 1, 0, 0.0, 245.0, 245, 245, 245.0, 245.0, 245.0, 245.0, 4.081632653061225, 2.730389030612245, 4.611766581632653], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000AGZF/realtime-607", 1, 0, 0.0, 198.0, 198, 198, 198.0, 198.0, 198.0, 198.0, 5.050505050505051, 3.388375946969697, 5.7064788510101], "isController": false}, {"data": ["AAPL/api/v2/search/securities-565", 1, 0, 0.0, 440.0, 440, 440, 440.0, 440.0, 440.0, 440.0, 2.2727272727272725, 2.805397727272727, 2.5035511363636362], "isController": false}, {"data": ["AAPL/api/v2/search/securities-564", 1, 0, 0.0, 857.0, 857, 857, 857.0, 857.0, 857.0, 857.0, 1.1668611435239205, 1.5759462514585765, 1.2819519399066512], "isController": false}, {"data": ["AMZN/api/v2/search/securities-576", 1, 0, 0.0, 209.0, 209, 209, 209.0, 209.0, 209.0, 209.0, 4.784688995215311, 5.8406848086124405, 5.261288875598086], "isController": false}, {"data": ["AMZN/api/v2/search/securities-575", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 12.2290259009009, 9.897592905405405], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 199.0, 5.025125628140704, 11.17403423366834, 8.229624685929648], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-17", 1, 0, 0.0, 385.0, 385, 385, 385.0, 385.0, 385.0, 385.0, 2.5974025974025974, 6.414874188311688, 2.9068587662337664], "isController": false}, {"data": ["AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 206.0, 4.854368932038835, 6.338175060679612, 6.6937196601941755], "isController": false}, {"data": ["See All Results/api/v2/search/securities-32", 1, 0, 0.0, 240.0, 240, 240, 240.0, 240.0, 240.0, 240.0, 4.166666666666667, 7.259114583333334, 4.597981770833334], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0001L1P7/realtime-609", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 118.0, 8.474576271186441, 4.791777012711865, 9.5752780720339], "isController": false}, {"data": ["See All Results/api/v2/search/securities-34", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 6.44126457253886, 5.7176975388601035], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00009WEM/realtime-577", 1, 0, 0.0, 189.0, 189, 189, 189.0, 189.0, 189.0, 189.0, 5.291005291005291, 3.5497271825396823, 5.978215939153439], "isController": false}, {"data": ["See All Results/api/v1/search/entities-10", 1, 0, 0.0, 525.0, 525, 525, 525.0, 525.0, 525.0, 525.0, 1.9047619047619047, 1.138392857142857, 2.241443452380952], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000B7/realtime-587", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.3193503694581277, 5.565925184729064], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00011HZW/realtime-571", 1, 0, 0.0, 192.0, 192, 192, 192.0, 192.0, 192.0, 192.0, 5.208333333333333, 3.4993489583333335, 5.884806315104167], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00007NYP/realtime-589", 1, 0, 0.0, 202.0, 202, 202, 202.0, 202.0, 202.0, 202.0, 4.9504950495049505, 3.3261138613861383, 5.59347926980198], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000BEYH/realtime-583", 1, 0, 0.0, 200.0, 200, 200, 200.0, 200.0, 200.0, 200.0, 5.0, 3.3544921875, 5.6494140625], "isController": false}, {"data": ["See All Results/api/v1/search/articles-12", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 5.183293269230769, 4.975608031674208], "isController": false}, {"data": ["AMZN/api/v2/securities/movers-595", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 17.813546316964285, 10.349818638392858], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 115.0, 8.695652173913043, 11.379076086956522, 11.990489130434781], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BPWO/realtime-572", 1, 0, 0.0, 187.0, 187, 187, 187.0, 187.0, 187.0, 187.0, 5.347593582887701, 3.639914772727273, 6.042154077540107], "isController": false}, {"data": ["See All Results/api/v2/search/securities-22", 1, 0, 0.0, 512.0, 512, 512, 512.0, 512.0, 512.0, 512.0, 1.953125, 8.909225463867188, 2.1533966064453125], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322R/realtime-579", 1, 0, 0.0, 185.0, 185, 185, 185.0, 185.0, 185.0, 185.0, 5.405405405405405, 3.6211993243243246, 6.107474662162162], "isController": false}, {"data": ["See All Results/api/v2/search/securities-24", 1, 0, 0.0, 326.0, 326, 326, 326.0, 326.0, 326.0, 326.0, 3.067484662576687, 4.56527990797546, 3.3820216641104293], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00014L0S/realtime-608", 1, 0, 0.0, 198.0, 198, 198, 198.0, 198.0, 198.0, 198.0, 5.050505050505051, 3.3982402146464645, 5.7064788510101], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-597", 1, 0, 0.0, 296.0, 296, 296, 296.0, 296.0, 296.0, 296.0, 3.3783783783783785, 4.16358741554054, 3.7181957347972974], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-596", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 115.0, 8.695652173913043, 11.812160326086955, 9.553328804347826], "isController": false}, {"data": ["ADOBE/api/v2/securities/movers-600", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 110.0, 9.09090909090909, 18.137428977272727, 10.537997159090908], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", 1, 0, 0.0, 220.0, 220, 220, 220.0, 220.0, 220.0, 220.0, 4.545454545454545, 6.747159090909091, 6.1745383522727275], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-599", 1, 0, 0.0, 301.0, 301, 301, 301.0, 301.0, 301.0, 301.0, 3.3222591362126246, 3.753763496677741, 3.662920473421927], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-598", 1, 0, 0.0, 195.0, 195, 195, 195.0, 195.0, 195.0, 195.0, 5.128205128205129, 6.5655048076923075, 5.649038461538462], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0001P7KW/realtime-568", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 184.0, 5.434782608695652, 3.667416779891304, 6.140667459239131], "isController": false}, {"data": ["See All Results/api/v1/search/articles-23", 1, 0, 0.0, 257.0, 257, 257, 257.0, 257.0, 257.0, 257.0, 3.8910505836575875, 4.3356335116731515, 4.278635700389105], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 123.0, 8.130081300813009, 10.631034044715447, 11.210619918699187], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000005M/realtime-605", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 188.0, 5.319148936170213, 3.5582197473404253, 6.010014960106383], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P000171MJ/realtime-606", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.3145397167487682, 5.565925184729064], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 123.0, 8.130081300813009, 10.631034044715447, 11.258257113821138], "isController": false}, {"data": ["See All Results/api/v2/search/securities-11", 1, 0, 0.0, 638.0, 638, 638, 638.0, 638.0, 638.0, 638.0, 1.567398119122257, 7.942606289184953, 1.7281176528213167], "isController": false}, {"data": ["See All Results/api/v2/search/securities-13", 1, 0, 0.0, 242.0, 242, 242, 242.0, 242.0, 242.0, 242.0, 4.132231404958678, 5.8513042355371905, 4.555946539256198], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B9VF/realtime-610", 1, 0, 0.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 210.0, 4.761904761904763, 3.190104166666667, 5.380394345238096], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", 1, 0, 0.0, 110.0, 110, 110, 110.0, 110.0, 110.0, 110.0, 9.09090909090909, 11.887428977272727, 12.588778409090908], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BQNK/realtime-567", 1, 0, 0.0, 405.0, 405, 405, 405.0, 405.0, 405.0, 405.0, 2.4691358024691357, 1.6565393518518516, 2.7898341049382713], "isController": false}, {"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 10.80675361570248, 11.395919421487603], "isController": false}, {"data": ["See All Results/api/v1/search/entities-31", 1, 0, 0.0, 469.0, 469, 469, 469.0, 469.0, 469.0, 469.0, 2.1321961620469083, 1.263909248400853, 2.5111607142857144], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-1", 1, 0, 0.0, 1271.0, 1271, 1271, 1271.0, 1271.0, 1271.0, 1271.0, 0.7867820613690008, 1.9731018882769473, 0.880519767899292], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322T/realtime-580", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 3.4609779792746114, 5.854315090673575], "isController": false}, {"data": ["ADOBE/api/v2/securities/by-id-602", 1, 0, 0.0, 175.0, 175, 175, 175.0, 175.0, 175.0, 175.0, 5.714285714285714, 7.773437500000001, 6.908482142857143], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000151KD/realtime-582", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 184.0, 5.434782608695652, 3.672724184782609, 6.140667459239131], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B12F/realtime-611", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 3.476157707253886, 5.854315090673575], "isController": false}, {"data": ["AAPL/api/v2/securities/movers-574", 1, 0, 0.0, 582.0, 582, 582, 582.0, 582.0, 582.0, 582.0, 1.7182130584192439, 3.4162908075601375, 1.9917176761168387], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000X7UP/realtime-569", 1, 0, 0.0, 186.0, 186, 186, 186.0, 186.0, 186.0, 186.0, 5.376344086021506, 3.596480174731183, 6.07463877688172], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00007NXM/realtime-570", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.3145397167487682, 5.565925184729064], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00017M6Y/realtime-581", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 3.4660378886010363, 5.854315090673575], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", 1, 0, 0.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 143.0, 6.993006993006993, 9.096372377622378, 9.6836756993007], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00019QA2/realtime-593", 1, 0, 0.0, 189.0, 189, 189, 189.0, 189.0, 189.0, 189.0, 5.291005291005291, 3.523892195767196, 5.978215939153439], "isController": false}, {"data": ["AAPL/api/v2/securities/0P000000GY/realtime-566", 1, 0, 0.0, 567.0, 567, 567, 567.0, 567.0, 567.0, 567.0, 1.763668430335097, 1.179797729276896, 1.9927386463844798], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001ACT3/realtime-578", 1, 0, 0.0, 213.0, 213, 213, 213.0, 213.0, 213.0, 213.0, 4.694835680751174, 3.1360035211267605, 5.304614143192488], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00016YML/realtime-590", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 194.0, 5.154639175257732, 3.4632731958762886, 5.824138208762887], "isController": false}, {"data": ["AMZN/api/v2/search/securities-585", 1, 0, 0.0, 242.0, 242, 242, 242.0, 242.0, 242.0, 242.0, 4.132231404958678, 5.455836776859504, 4.551911157024794], "isController": false}, {"data": ["AMZN/api/v2/search/securities-584", 1, 0, 0.0, 278.0, 278, 278, 278.0, 278.0, 278.0, 278.0, 3.5971223021582737, 4.7598639838129495, 3.958942221223021], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-28", 1, 0, 0.0, 361.0, 361, 361, 361.0, 361.0, 361.0, 361.0, 2.770083102493075, 3.808864265927978, 3.102817693905817], "isController": false}, {"data": ["See All Results/api/v1/search/articles-33", 1, 0, 0.0, 219.0, 219, 219, 219.0, 219.0, 219.0, 219.0, 4.5662100456621, 4.240689212328767, 5.025506563926941], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 66, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
