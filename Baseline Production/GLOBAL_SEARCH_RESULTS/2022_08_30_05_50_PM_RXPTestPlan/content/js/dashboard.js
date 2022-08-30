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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9696969696969697, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000002C/realtime-591"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-21"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000F0/realtime-588"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000AGZF/realtime-607"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/search/securities-565"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/search/securities-564"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-576"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-575"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-17"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-32"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0001L1P7/realtime-609"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-34"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00009WEM/realtime-577"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-10"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000B7/realtime-587"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00011HZW/realtime-571"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00007NYP/realtime-589"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000BEYH/realtime-583"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-12"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/movers-595"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BPWO/realtime-572"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-22"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322R/realtime-579"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-24"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00014L0S/realtime-608"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-597"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-596"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/movers-600"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-599"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-598"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0001P7KW/realtime-568"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-23"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000005M/realtime-605"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P000171MJ/realtime-606"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-11"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-13"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B9VF/realtime-610"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BQNK/realtime-567"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/entities-31"], "isController": false}, {"data": [0.5, 500, 1500, "See Articles and Videos/api/v1/search/articles-1"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322T/realtime-580"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/by-id-602"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000151KD/realtime-582"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B12F/realtime-611"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/movers-574"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000X7UP/realtime-569"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00007NXM/realtime-570"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00017M6Y/realtime-581"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00019QA2/realtime-593"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P000000GY/realtime-566"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001ACT3/realtime-578"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00016YML/realtime-590"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-585"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-584"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-28"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-33"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 66, 0, 0.0, 274.63636363636346, 109, 1370, 231.5, 444.7000000000001, 616.6499999999999, 1370.0, 3.632560955473609, 4.338498094281468, 4.183916457977874], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", 1, 0, 0.0, 115.0, 115, 115, 115.0, 115.0, 115.0, 115.0, 8.695652173913043, 11.24320652173913, 11.85461956521739], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000002C/realtime-591", 1, 0, 0.0, 241.0, 241, 241, 241.0, 241.0, 241.0, 241.0, 4.149377593360996, 2.767602437759336, 4.623476400414938], "isController": false}, {"data": ["See All Results/api/v1/search/entities-21", 1, 0, 0.0, 1370.0, 1370, 1370, 1370.0, 1370.0, 1370.0, 1370.0, 0.7299270072992701, 0.43268134124087587, 0.8475421989051094], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000F0/realtime-588", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 3.048996040723982, 5.041890554298642], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000AGZF/realtime-607", 1, 0, 0.0, 281.0, 281, 281, 281.0, 281.0, 281.0, 281.0, 3.558718861209964, 2.4083907918149463, 3.9653302935943056], "isController": false}, {"data": ["AAPL/api/v2/search/securities-565", 1, 0, 0.0, 379.0, 379, 379, 379.0, 379.0, 379.0, 379.0, 2.638522427440633, 3.2569261213720315, 2.8652704485488125], "isController": false}, {"data": ["AAPL/api/v2/search/securities-564", 1, 0, 0.0, 833.0, 833, 833, 833.0, 833.0, 833.0, 833.0, 1.2004801920768307, 1.6295580732292918, 1.3001294267707084], "isController": false}, {"data": ["AMZN/api/v2/search/securities-576", 1, 0, 0.0, 171.0, 171, 171, 171.0, 171.0, 171.0, 171.0, 5.847953216374268, 7.212856359649122, 6.339089912280701], "isController": false}, {"data": ["AMZN/api/v2/search/securities-575", 1, 0, 0.0, 109.0, 109, 109, 109.0, 109.0, 109.0, 109.0, 9.174311926605505, 12.516126720183486, 9.935851490825689], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", 1, 0, 0.0, 224.0, 224, 224, 224.0, 224.0, 224.0, 224.0, 4.464285714285714, 8.296421595982142, 7.241385323660714], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-17", 1, 0, 0.0, 490.0, 490, 490, 490.0, 490.0, 490.0, 490.0, 2.0408163265306123, 4.974489795918368, 2.2520727040816326], "isController": false}, {"data": ["AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 10.726045971074381, 11.266787190082646], "isController": false}, {"data": ["See All Results/api/v2/search/securities-32", 1, 0, 0.0, 385.0, 385, 385, 385.0, 385.0, 385.0, 385.0, 2.5974025974025974, 4.535308441558441, 2.825689935064935], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0001L1P7/realtime-609", 1, 0, 0.0, 166.0, 166, 166, 166.0, 166.0, 166.0, 166.0, 6.024096385542169, 3.435617469879518, 6.712396460843373], "isController": false}, {"data": ["See All Results/api/v2/search/securities-34", 1, 0, 0.0, 165.0, 165, 165, 165.0, 165.0, 165.0, 165.0, 6.0606060606060606, 7.451467803030303, 6.593276515151515], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00009WEM/realtime-577", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 236.0, 4.237288135593221, 2.84278998940678, 4.721431408898305], "isController": false}, {"data": ["See All Results/api/v1/search/entities-10", 1, 0, 0.0, 525.0, 525, 525, 525.0, 525.0, 525.0, 525.0, 1.9047619047619047, 1.138392857142857, 2.2116815476190474], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000B7/realtime-587", 1, 0, 0.0, 192.0, 192, 192, 192.0, 192.0, 192.0, 192.0, 5.208333333333333, 3.4840901692708335, 5.803426106770833], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00011HZW/realtime-571", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 188.0, 5.319148936170213, 3.5945811170212765, 5.926903257978723], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00007NYP/realtime-589", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 236.0, 4.237288135593221, 2.867617849576271, 4.721431408898305], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000BEYH/realtime-583", 1, 0, 0.0, 361.0, 361, 361, 361.0, 361.0, 361.0, 361.0, 2.770083102493075, 1.8665599030470914, 3.086586738227147], "isController": false}, {"data": ["See All Results/api/v1/search/articles-12", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 4.034090909090909, 3.9417613636363633], "isController": false}, {"data": ["AMZN/api/v2/securities/movers-595", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 113.0, 8.849557522123893, 17.578125, 10.119952986725663], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 11.69235641891892, 12.281813063063064], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BPWO/realtime-572", 1, 0, 0.0, 395.0, 395, 395, 395.0, 395.0, 395.0, 395.0, 2.5316455696202533, 1.723200158227848, 2.8209058544303796], "isController": false}, {"data": ["See All Results/api/v2/search/securities-22", 1, 0, 0.0, 295.0, 295, 295, 295.0, 295.0, 295.0, 295.0, 3.389830508474576, 15.721001059322035, 3.6844544491525424], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322R/realtime-579", 1, 0, 0.0, 320.0, 320, 320, 320.0, 320.0, 320.0, 320.0, 3.125, 2.1087646484375, 3.4820556640625], "isController": false}, {"data": ["See All Results/api/v2/search/securities-24", 1, 0, 0.0, 306.0, 306, 306, 306.0, 306.0, 306.0, 306.0, 3.2679738562091503, 4.876429738562091, 3.5520067401960786], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00014L0S/realtime-608", 1, 0, 0.0, 243.0, 243, 243, 243.0, 243.0, 243.0, 243.0, 4.11522633744856, 2.768936471193416, 4.585423096707819], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-597", 1, 0, 0.0, 187.0, 187, 187, 187.0, 187.0, 187.0, 187.0, 5.347593582887701, 6.627047125668449, 5.801930147058823], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-596", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 118.0, 8.474576271186441, 11.569782838983052, 9.178032309322035], "isController": false}, {"data": ["ADOBE/api/v2/securities/movers-600", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 17.735072544642858, 10.210309709821429], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", 1, 0, 0.0, 290.0, 290, 290, 290.0, 290.0, 290.0, 290.0, 3.4482758620689653, 5.084859913793104, 4.630253232758621], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-599", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 182.0, 5.4945054945054945, 6.122295673076923, 5.972055288461538], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-598", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 184.0, 5.434782608695652, 6.952700407608695, 5.901834239130435], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0001P7KW/realtime-568", 1, 0, 0.0, 425.0, 425, 425, 425.0, 425.0, 425.0, 425.0, 2.352941176470588, 1.5946691176470589, 2.6217830882352944], "isController": false}, {"data": ["See All Results/api/v1/search/articles-23", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 4.222869873046875, 4.23431396484375], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", 1, 0, 0.0, 129.0, 129, 129, 129.0, 129.0, 129.0, 129.0, 7.751937984496124, 10.060864825581396, 10.568071705426357], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000005M/realtime-605", 1, 0, 0.0, 224.0, 224, 224, 224.0, 224.0, 224.0, 224.0, 4.464285714285714, 3.0125209263392856, 4.974365234375], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P000171MJ/realtime-606", 1, 0, 0.0, 233.0, 233, 233, 233.0, 233.0, 233.0, 233.0, 4.291845493562231, 2.917113733905579, 4.782222371244635], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 167.0, 5.9880239520958085, 7.742327844311377, 8.198446856287426], "isController": false}, {"data": ["See All Results/api/v2/search/securities-11", 1, 0, 0.0, 344.0, 344, 344, 344.0, 344.0, 344.0, 344.0, 2.9069767441860463, 14.852834302325583, 3.1596339026162794], "isController": false}, {"data": ["See All Results/api/v2/search/securities-13", 1, 0, 0.0, 309.0, 309, 309, 309.0, 309.0, 309.0, 309.0, 3.236245954692557, 4.65210355987055, 3.5175212378640777], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B9VF/realtime-610", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 2.6041666666666665, 4.3188287306201545], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", 1, 0, 0.0, 159.0, 159, 159, 159.0, 159.0, 159.0, 159.0, 6.289308176100629, 8.13187893081761, 8.610947327044025], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BQNK/realtime-567", 1, 0, 0.0, 191.0, 191, 191, 191.0, 191.0, 191.0, 191.0, 5.235602094240838, 3.548347513089005, 5.833810536649215], "isController": false}, {"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 128.0, 7.8125, 10.13946533203125, 10.650634765625], "isController": false}, {"data": ["See All Results/api/v1/search/entities-31", 1, 0, 0.0, 465.0, 465, 465, 465.0, 465.0, 465.0, 465.0, 2.150537634408602, 1.2747815860215053, 2.499159946236559], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-1", 1, 0, 0.0, 666.0, 666, 666, 666.0, 666.0, 666.0, 666.0, 1.5015015015015014, 3.734691722972973, 1.6569303678678677], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322T/realtime-580", 1, 0, 0.0, 229.0, 229, 229, 229.0, 229.0, 229.0, 229.0, 4.366812227074235, 2.9211585698689957, 4.865754639737991], "isController": false}, {"data": ["ADOBE/api/v2/securities/by-id-602", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 188.0, 5.319148936170213, 7.24110704787234, 6.34765625], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000151KD/realtime-582", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 2.8513976793248945, 4.701509757383967], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B12F/realtime-611", 1, 0, 0.0, 323.0, 323, 323, 323.0, 323.0, 323.0, 323.0, 3.0959752321981426, 2.080108359133127, 3.4497145897832815], "isController": false}, {"data": ["AAPL/api/v2/securities/movers-574", 1, 0, 0.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 17.894847972972972, 10.302294481981981], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000X7UP/realtime-569", 1, 0, 0.0, 436.0, 436, 436, 436.0, 436.0, 436.0, 436.0, 2.293577981651376, 1.5477171731651376, 2.5556371846330275], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00007NXM/realtime-570", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 206.0, 4.854368932038835, 3.2899726941747574, 5.409018507281553], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00017M6Y/realtime-581", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 2.826674578059072, 4.701509757383967], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", 1, 0, 0.0, 131.0, 131, 131, 131.0, 131.0, 131.0, 131.0, 7.633587786259541, 9.855081106870228, 10.451455152671755], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00019QA2/realtime-593", 1, 0, 0.0, 230.0, 230, 230, 230.0, 230.0, 230.0, 230.0, 4.3478260869565215, 2.9169497282608696, 4.844599184782608], "isController": false}, {"data": ["AAPL/api/v2/securities/0P000000GY/realtime-566", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 3.41796875, 5.684988839285714], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001ACT3/realtime-578", 1, 0, 0.0, 236.0, 236, 236, 236.0, 236.0, 236.0, 236.0, 4.237288135593221, 2.8593418961864407, 4.721431408898305], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00016YML/realtime-590", 1, 0, 0.0, 240.0, 240, 240, 240.0, 240.0, 240.0, 240.0, 4.166666666666667, 2.81982421875, 4.642740885416667], "isController": false}, {"data": ["AMZN/api/v2/search/securities-585", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 182.0, 5.4945054945054945, 7.259830013736264, 5.96668956043956], "isController": false}, {"data": ["AMZN/api/v2/search/securities-584", 1, 0, 0.0, 220.0, 220, 220, 220.0, 220.0, 220.0, 220.0, 4.545454545454545, 6.1257102272727275, 4.931640625], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-28", 1, 0, 0.0, 408.0, 408, 408, 408.0, 408.0, 408.0, 408.0, 2.450980392156863, 3.382065716911765, 2.7070886948529416], "isController": false}, {"data": ["See All Results/api/v1/search/articles-33", 1, 0, 0.0, 222.0, 222, 222, 222.0, 222.0, 222.0, 222.0, 4.504504504504505, 4.183382601351351, 4.88721143018018], "isController": false}]}, function(index, item){
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
