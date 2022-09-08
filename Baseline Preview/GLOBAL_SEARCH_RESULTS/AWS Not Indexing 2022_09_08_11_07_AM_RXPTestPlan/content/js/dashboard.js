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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.946969696969697, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000002C/realtime-591"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-21"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000F0/realtime-588"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000AGZF/realtime-607"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/search/securities-565"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/search/securities-564"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-576"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-575"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603"], "isController": false}, {"data": [0.5, 500, 1500, "See Articles and Videos/api/v1/search/articles-17"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-32"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0001L1P7/realtime-609"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-34"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00009WEM/realtime-577"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-10"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000B7/realtime-587"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00011HZW/realtime-571"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00007NYP/realtime-589"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000BEYH/realtime-583"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-12"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/movers-595"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BPWO/realtime-572"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-22"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322R/realtime-579"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-24"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00014L0S/realtime-608"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-597"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-596"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/movers-600"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-599"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-598"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0001P7KW/realtime-568"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-23"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000005M/realtime-605"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P000171MJ/realtime-606"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v2/search/securities-11"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-13"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B9VF/realtime-610"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BQNK/realtime-567"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-31"], "isController": false}, {"data": [0.5, 500, 1500, "See Articles and Videos/api/v1/search/articles-1"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322T/realtime-580"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/by-id-602"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000151KD/realtime-582"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B12F/realtime-611"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/movers-574"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000X7UP/realtime-569"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00007NXM/realtime-570"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00017M6Y/realtime-581"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00019QA2/realtime-593"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P000000GY/realtime-566"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001ACT3/realtime-578"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00016YML/realtime-590"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-585"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-584"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-28"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-33"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 66, 0, 0.0, 287.42424242424244, 114, 1309, 207.5, 523.1000000000001, 755.6999999999998, 1309.0, 3.4713091042970596, 4.159160837321832, 4.052428765844422], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", 1, 0, 0.0, 126.0, 126, 126, 126.0, 126.0, 126.0, 126.0, 7.936507936507936, 10.277157738095237, 10.943700396825397], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000002C/realtime-591", 1, 0, 0.0, 207.0, 207, 207, 207.0, 207.0, 207.0, 207.0, 4.830917874396135, 3.2269021739130435, 5.458371074879227], "isController": false}, {"data": ["See All Results/api/v1/search/entities-21", 1, 0, 0.0, 542.0, 542, 542, 542.0, 542.0, 542.0, 542.0, 1.8450184501845017, 1.0936779289667895, 2.1711398754612543], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000F0/realtime-588", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 199.0, 5.025125628140704, 3.376256281407035, 5.677803077889447], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000AGZF/realtime-607", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 199.0, 5.025125628140704, 3.371348932160804, 5.677803077889447], "isController": false}, {"data": ["AAPL/api/v2/search/securities-565", 1, 0, 0.0, 413.0, 413, 413, 413.0, 413.0, 413.0, 413.0, 2.4213075060532687, 2.995895127118644, 2.667221549636804], "isController": false}, {"data": ["AAPL/api/v2/search/securities-564", 1, 0, 0.0, 1309.0, 1309, 1309, 1309.0, 1309.0, 1309.0, 1309.0, 0.7639419404125286, 1.0384835752482813, 0.8392916825821238], "isController": false}, {"data": ["AMZN/api/v2/search/securities-576", 1, 0, 0.0, 207.0, 207, 207, 207.0, 207.0, 207.0, 207.0, 4.830917874396135, 5.967881944444445, 5.312122584541063], "isController": false}, {"data": ["AMZN/api/v2/search/securities-575", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 122.0, 8.196721311475411, 11.19845030737705, 9.005186987704919], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", 1, 0, 0.0, 216.0, 216, 216, 216.0, 216.0, 216.0, 216.0, 4.62962962962963, 10.25390625, 7.581922743055555], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-17", 1, 0, 0.0, 790.0, 790, 790, 790.0, 790.0, 790.0, 790.0, 1.2658227848101267, 3.1620846518987342, 1.4166337025316456], "isController": false}, {"data": ["AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 123.0, 8.130081300813009, 10.527820121951219, 11.210619918699187], "isController": false}, {"data": ["See All Results/api/v2/search/securities-32", 1, 0, 0.0, 214.0, 214, 214, 214.0, 214.0, 214.0, 214.0, 4.672897196261682, 8.16387996495327, 5.156615070093458], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0001L1P7/realtime-609", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 4.672972623966943, 9.337874483471074], "isController": false}, {"data": ["See All Results/api/v2/search/securities-34", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 6.1083026960784315, 5.409390318627452], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00009WEM/realtime-577", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.328971674876847, 5.565925184729064], "isController": false}, {"data": ["See All Results/api/v1/search/entities-10", 1, 0, 0.0, 515.0, 515, 515, 515.0, 515.0, 515.0, 515.0, 1.941747572815534, 1.160497572815534, 2.2849666262135924], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000B7/realtime-587", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.304918411330049, 5.565925184729064], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00011HZW/realtime-571", 1, 0, 0.0, 200.0, 200, 200, 200.0, 200.0, 200.0, 200.0, 5.0, 3.369140625, 5.6494140625], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00007NYP/realtime-589", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 199.0, 5.025125628140704, 3.3615342336683414, 5.677803077889447], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000BEYH/realtime-583", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 206.0, 4.854368932038835, 3.280491504854369, 5.484868021844661], "isController": false}, {"data": ["See All Results/api/v1/search/articles-12", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 4.320549242424242, 4.165187026515151], "isController": false}, {"data": ["AMZN/api/v2/securities/movers-595", 1, 0, 0.0, 123.0, 123, 123, 123.0, 123.0, 123.0, 123.0, 8.130081300813009, 16.5698043699187, 9.424225101626016], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 124.0, 8.064516129032258, 10.442918346774194, 11.120211693548388], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BPWO/realtime-572", 1, 0, 0.0, 208.0, 208, 208, 208.0, 208.0, 208.0, 208.0, 4.807692307692308, 3.2489483173076925, 5.43212890625], "isController": false}, {"data": ["See All Results/api/v2/search/securities-22", 1, 0, 0.0, 400.0, 400, 400, 400.0, 400.0, 400.0, 400.0, 2.5, 11.2548828125, 2.75634765625], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322R/realtime-579", 1, 0, 0.0, 235.0, 235, 235, 235.0, 235.0, 235.0, 235.0, 4.25531914893617, 2.8507313829787235, 4.808011968085107], "isController": false}, {"data": ["See All Results/api/v2/search/securities-24", 1, 0, 0.0, 225.0, 225, 225, 225.0, 225.0, 225.0, 225.0, 4.444444444444445, 6.657986111111111, 4.900173611111111], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00014L0S/realtime-608", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 3.452845982142857, 5.764708227040816], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-597", 1, 0, 0.0, 219.0, 219, 219, 219.0, 219.0, 219.0, 219.0, 4.5662100456621, 5.770191210045662, 5.025506563926941], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-596", 1, 0, 0.0, 114.0, 114, 114, 114.0, 114.0, 114.0, 114.0, 8.771929824561402, 11.992872807017543, 9.637129934210526], "isController": false}, {"data": ["ADOBE/api/v2/securities/movers-600", 1, 0, 0.0, 137.0, 137, 137, 137.0, 137.0, 137.0, 137.0, 7.299270072992701, 14.876539689781021, 8.46116560218978], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", 1, 0, 0.0, 275.0, 275, 275, 275.0, 275.0, 275.0, 275.0, 3.6363636363636362, 5.4119318181818175, 4.939630681818182], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-599", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 188.0, 5.319148936170213, 5.926903257978723, 5.864569481382978], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-598", 1, 0, 0.0, 231.0, 231, 231, 231.0, 231.0, 231.0, 231.0, 4.329004329004329, 5.271746482683983, 4.768668831168831], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0001P7KW/realtime-568", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.3241610221674875, 5.565925184729064], "isController": false}, {"data": ["See All Results/api/v1/search/articles-23", 1, 0, 0.0, 266.0, 266, 266, 266.0, 266.0, 266.0, 266.0, 3.7593984962406015, 4.188939144736842, 4.133869830827067], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", 1, 0, 0.0, 151.0, 151, 151, 151.0, 151.0, 151.0, 151.0, 6.622516556291391, 8.57564155629139, 9.131829470198676], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000005M/realtime-605", 1, 0, 0.0, 198.0, 198, 198, 198.0, 198.0, 198.0, 198.0, 5.050505050505051, 3.378511679292929, 5.7064788510101], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P000171MJ/realtime-606", 1, 0, 0.0, 198.0, 198, 198, 198.0, 198.0, 198.0, 198.0, 5.050505050505051, 3.413036616161616, 5.7064788510101], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", 1, 0, 0.0, 130.0, 130, 130, 130.0, 130.0, 130.0, 130.0, 7.6923076923076925, 9.945913461538462, 10.652043269230768], "isController": false}, {"data": ["See All Results/api/v2/search/securities-11", 1, 0, 0.0, 692.0, 692, 692, 692.0, 692.0, 692.0, 692.0, 1.445086705202312, 7.353854317196532, 1.5932645411849713], "isController": false}, {"data": ["See All Results/api/v2/search/securities-13", 1, 0, 0.0, 384.0, 384, 384, 384.0, 384.0, 384.0, 384.0, 2.6041666666666665, 3.66973876953125, 2.8711954752604165], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B9VF/realtime-610", 1, 0, 0.0, 201.0, 201, 201, 201.0, 201.0, 201.0, 201.0, 4.975124378109452, 3.3329446517412933, 5.621307524875622], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", 1, 0, 0.0, 139.0, 139, 139, 139.0, 139.0, 139.0, 139.0, 7.194244604316547, 9.301933453237409, 9.96234262589928], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BQNK/realtime-567", 1, 0, 0.0, 479.0, 479, 479, 479.0, 479.0, 479.0, 479.0, 2.08768267223382, 1.4108168058455115, 2.358836769311065], "isController": false}, {"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 10.196235236220472, 10.857529527559056], "isController": false}, {"data": ["See All Results/api/v1/search/entities-31", 1, 0, 0.0, 598.0, 598, 598, 598.0, 598.0, 598.0, 598.0, 1.6722408026755853, 0.9912599289297659, 1.9694554765886287], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-1", 1, 0, 0.0, 1209.0, 1209, 1209, 1209.0, 1209.0, 1209.0, 1209.0, 0.8271298593879239, 1.961202440033085, 0.9256746277915632], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322T/realtime-580", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 3.274356617647059, 5.538641237745098], "isController": false}, {"data": ["ADOBE/api/v2/securities/by-id-602", 1, 0, 0.0, 360.0, 360, 360, 360.0, 360.0, 360.0, 360.0, 2.7777777777777777, 3.778754340277778, 3.358289930555556], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000151KD/realtime-582", 1, 0, 0.0, 208.0, 208, 208, 208.0, 208.0, 208.0, 208.0, 4.807692307692308, 3.2489483173076925, 5.43212890625], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B12F/realtime-611", 1, 0, 0.0, 213.0, 213, 213, 213.0, 213.0, 213.0, 213.0, 4.694835680751174, 3.1497579225352115, 5.304614143192488], "isController": false}, {"data": ["AAPL/api/v2/securities/movers-574", 1, 0, 0.0, 160.0, 160, 160, 160.0, 160.0, 160.0, 160.0, 6.25, 12.738037109375, 7.244873046875], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000X7UP/realtime-569", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 206.0, 4.854368932038835, 3.252047936893204, 5.484868021844661], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00007NXM/realtime-570", 1, 0, 0.0, 399.0, 399, 399, 399.0, 399.0, 399.0, 399.0, 2.506265664160401, 1.6790021929824561, 2.8317864974937343], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00017M6Y/realtime-581", 1, 0, 0.0, 221.0, 221, 221, 221.0, 221.0, 221.0, 221.0, 4.524886877828055, 3.026901866515837, 5.112591911764706], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", 1, 0, 0.0, 218.0, 218, 218, 218.0, 218.0, 218.0, 218.0, 4.587155963302752, 5.92209002293578, 6.3521358944954125], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00019QA2/realtime-593", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 3.2647824754901964, 5.538641237745098], "isController": false}, {"data": ["AAPL/api/v2/securities/0P000000GY/realtime-566", 1, 0, 0.0, 491.0, 491, 491, 491.0, 491.0, 491.0, 491.0, 2.0366598778004072, 1.3723587067209777, 2.3011869908350304], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001ACT3/realtime-578", 1, 0, 0.0, 222.0, 222, 222, 222.0, 222.0, 222.0, 222.0, 4.504504504504505, 3.0220650337837838, 5.089562218468468], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00016YML/realtime-590", 1, 0, 0.0, 205.0, 205, 205, 205.0, 205.0, 205.0, 205.0, 4.878048780487805, 3.2774390243902443, 5.511623475609756], "isController": false}, {"data": ["AMZN/api/v2/search/securities-585", 1, 0, 0.0, 298.0, 298, 298, 298.0, 298.0, 298.0, 298.0, 3.3557046979865772, 4.437132969798658, 3.696518456375839], "isController": false}, {"data": ["AMZN/api/v2/search/securities-584", 1, 0, 0.0, 318.0, 318, 318, 318.0, 318.0, 318.0, 318.0, 3.1446540880503147, 4.1611389544025155, 3.4609620676100628], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-28", 1, 0, 0.0, 359.0, 359, 359, 359.0, 359.0, 359.0, 359.0, 2.785515320334262, 3.84368471448468, 3.120103586350975], "isController": false}, {"data": ["See All Results/api/v1/search/articles-33", 1, 0, 0.0, 252.0, 252, 252, 252.0, 252.0, 252.0, 252.0, 3.968253968253968, 3.685360863095238, 4.367404513888889], "isController": false}]}, function(index, item){
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
