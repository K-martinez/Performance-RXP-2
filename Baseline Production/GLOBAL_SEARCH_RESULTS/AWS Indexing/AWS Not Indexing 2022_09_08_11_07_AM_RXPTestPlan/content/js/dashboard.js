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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9393939393939394, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000002C/realtime-591"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/entities-21"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000F0/realtime-588"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000AGZF/realtime-607"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/search/securities-565"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/search/securities-564"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-576"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-575"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603"], "isController": false}, {"data": [0.5, 500, 1500, "See Articles and Videos/api/v1/search/articles-17"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-32"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0001L1P7/realtime-609"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-34"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00009WEM/realtime-577"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-10"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000B7/realtime-587"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00011HZW/realtime-571"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00007NYP/realtime-589"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000BEYH/realtime-583"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-12"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/movers-595"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BPWO/realtime-572"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-22"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322R/realtime-579"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-24"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00014L0S/realtime-608"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-597"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-596"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/movers-600"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-599"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-598"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0001P7KW/realtime-568"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-23"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000005M/realtime-605"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P000171MJ/realtime-606"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-11"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-13"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B9VF/realtime-610"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BQNK/realtime-567"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-31"], "isController": false}, {"data": [0.5, 500, 1500, "See Articles and Videos/api/v1/search/articles-1"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322T/realtime-580"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/by-id-602"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000151KD/realtime-582"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B12F/realtime-611"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/securities/movers-574"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/securities/0P0000X7UP/realtime-569"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00007NXM/realtime-570"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00017M6Y/realtime-581"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00019QA2/realtime-593"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/securities/0P000000GY/realtime-566"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001ACT3/realtime-578"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00016YML/realtime-590"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-585"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-584"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-28"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-33"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 66, 0, 0.0, 292.2727272727273, 116, 1221, 209.5, 528.1000000000001, 671.8499999999999, 1221.0, 3.4152652005174646, 4.097469275549806, 3.896951811125485], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", 1, 0, 0.0, 121.0, 121, 121, 121.0, 121.0, 121.0, 121.0, 8.264462809917356, 10.717975206611571, 11.178008780991735], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000002C/realtime-591", 1, 0, 0.0, 190.0, 190, 190, 190.0, 190.0, 190.0, 190.0, 5.263157894736842, 3.515625, 5.807976973684211], "isController": false}, {"data": ["See All Results/api/v1/search/entities-21", 1, 0, 0.0, 487.0, 487, 487, 487.0, 487.0, 487.0, 487.0, 2.053388090349076, 1.2272202258726899, 2.3621984086242303], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000F0/realtime-588", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 3.2935049019607847, 5.409390318627452], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000AGZF/realtime-607", 1, 0, 0.0, 242.0, 242, 242, 242.0, 242.0, 242.0, 242.0, 4.132231404958678, 2.7924845041322315, 4.559981921487603], "isController": false}, {"data": ["AAPL/api/v2/search/securities-565", 1, 0, 0.0, 487.0, 487, 487, 487.0, 487.0, 487.0, 487.0, 2.053388090349076, 2.5306404004106775, 2.2077932494866532], "isController": false}, {"data": ["AAPL/api/v2/search/securities-564", 1, 0, 0.0, 1035.0, 1035, 1035, 1035.0, 1035.0, 1035.0, 1035.0, 0.966183574879227, 1.3096316425120773, 1.0360054347826089], "isController": false}, {"data": ["AMZN/api/v2/search/securities-576", 1, 0, 0.0, 172.0, 172, 172, 172.0, 172.0, 172.0, 172.0, 5.813953488372093, 7.148210392441861, 6.239780159883721], "isController": false}, {"data": ["AMZN/api/v2/search/securities-575", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 116.0, 8.620689655172413, 11.744005926724137, 9.243669181034482], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", 1, 0, 0.0, 208.0, 208, 208, 208.0, 208.0, 208.0, 208.0, 4.807692307692308, 10.732797475961538, 7.746769831730769], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-17", 1, 0, 0.0, 710.0, 710, 710, 710.0, 710.0, 710.0, 710.0, 1.4084507042253522, 3.514249559859155, 1.539117517605634], "isController": false}, {"data": ["AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", 1, 0, 0.0, 129.0, 129, 129, 129.0, 129.0, 129.0, 129.0, 7.751937984496124, 10.030583817829458, 10.484798934108527], "isController": false}, {"data": ["See All Results/api/v2/search/securities-32", 1, 0, 0.0, 209.0, 209, 209, 209.0, 209.0, 209.0, 209.0, 4.784688995215311, 8.373205741626794, 5.153820275119617], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0001L1P7/realtime-609", 1, 0, 0.0, 167.0, 167, 167, 167.0, 167.0, 167.0, 167.0, 5.9880239520958085, 3.4150449101796405, 6.607877994011976], "isController": false}, {"data": ["See All Results/api/v2/search/securities-34", 1, 0, 0.0, 195.0, 195, 195, 195.0, 195.0, 195.0, 195.0, 5.128205128205129, 6.114783653846153, 5.5238381410256405], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00009WEM/realtime-577", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.304918411330049, 5.436037561576354], "isController": false}, {"data": ["See All Results/api/v1/search/entities-10", 1, 0, 0.0, 577.0, 577, 577, 577.0, 577.0, 577.0, 577.0, 1.7331022530329288, 1.0357993934142116, 1.9937445840554595], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000B7/realtime-587", 1, 0, 0.0, 215.0, 215, 215, 215.0, 215.0, 215.0, 215.0, 4.651162790697675, 3.1204578488372094, 5.132630813953488], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00011HZW/realtime-571", 1, 0, 0.0, 206.0, 206, 206, 206.0, 206.0, 206.0, 206.0, 4.854368932038835, 3.2615291262135924, 5.356871966019418], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00007NYP/realtime-589", 1, 0, 0.0, 201.0, 201, 201, 201.0, 201.0, 201.0, 201.0, 4.975124378109452, 3.328086131840796, 5.490127487562189], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000BEYH/realtime-583", 1, 0, 0.0, 345.0, 345, 345, 345.0, 345.0, 345.0, 345.0, 2.898550724637681, 1.9446331521739133, 3.198596014492754], "isController": false}, {"data": ["See All Results/api/v1/search/articles-12", 1, 0, 0.0, 377.0, 377, 377, 377.0, 377.0, 377.0, 377.0, 2.6525198938992043, 3.017759449602122, 2.8467962533156497], "isController": false}, {"data": ["AMZN/api/v2/securities/movers-595", 1, 0, 0.0, 125.0, 125, 125, 125.0, 125.0, 125.0, 125.0, 8.0, 16.3125, 9.0625], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", 1, 0, 0.0, 130.0, 130, 130, 130.0, 130.0, 130.0, 130.0, 7.6923076923076925, 9.975961538461538, 10.404146634615385], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BPWO/realtime-572", 1, 0, 0.0, 409.0, 409, 409, 409.0, 409.0, 409.0, 409.0, 2.444987775061125, 1.6642153117359415, 2.6980822127139366], "isController": false}, {"data": ["See All Results/api/v2/search/securities-22", 1, 0, 0.0, 272.0, 272, 272, 272.0, 272.0, 272.0, 272.0, 3.676470588235294, 16.659007352941174, 3.956514246323529], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322R/realtime-579", 1, 0, 0.0, 240.0, 240, 240, 240.0, 240.0, 240.0, 240.0, 4.166666666666667, 2.811686197916667, 4.597981770833334], "isController": false}, {"data": ["See All Results/api/v2/search/securities-24", 1, 0, 0.0, 181.0, 181, 181, 181.0, 181.0, 181.0, 181.0, 5.524861878453039, 8.330455801104973, 5.945700966850829], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00014L0S/realtime-608", 1, 0, 0.0, 307.0, 307, 307, 307.0, 307.0, 307.0, 307.0, 3.257328990228013, 2.1885179153094465, 3.5945134364820848], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-597", 1, 0, 0.0, 210.0, 210, 210, 210.0, 210.0, 210.0, 210.0, 4.761904761904763, 5.938430059523809, 5.115327380952381], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-596", 1, 0, 0.0, 149.0, 149, 149, 149.0, 149.0, 149.0, 149.0, 6.7114093959731544, 9.149538590604028, 7.196413590604027], "isController": false}, {"data": ["ADOBE/api/v2/securities/movers-600", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 124.0, 8.064516129032258, 16.44405241935484, 9.135584677419354], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", 1, 0, 0.0, 194.0, 194, 194, 194.0, 194.0, 194.0, 194.0, 5.154639175257732, 7.661485180412371, 6.866140463917525], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-599", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 6.403780531609196, 6.184895833333334], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-598", 1, 0, 0.0, 184.0, 184, 184, 184.0, 184.0, 184.0, 184.0, 5.434782608695652, 6.549337635869565, 5.843452785326087], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0001P7KW/realtime-568", 1, 0, 0.0, 238.0, 238, 238, 238.0, 238.0, 238.0, 238.0, 4.201680672268908, 2.83531381302521, 4.636620273109244], "isController": false}, {"data": ["See All Results/api/v1/search/articles-23", 1, 0, 0.0, 244.0, 244, 244, 244.0, 244.0, 244.0, 244.0, 4.0983606557377055, 4.546618852459017, 4.398533555327869], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 128.0, 7.8125, 10.12420654296875, 10.56671142578125], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000005M/realtime-605", 1, 0, 0.0, 229.0, 229, 229, 229.0, 229.0, 229.0, 229.0, 4.366812227074235, 2.9510098253275108, 4.818845524017467], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P000171MJ/realtime-606", 1, 0, 0.0, 202.0, 202, 202, 202.0, 202.0, 202.0, 202.0, 4.9504950495049505, 3.369624071782178, 5.462948638613861], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", 1, 0, 0.0, 125.0, 125, 125, 125.0, 125.0, 125.0, 125.0, 8.0, 10.3984375, 10.8671875], "isController": false}, {"data": ["See All Results/api/v2/search/securities-11", 1, 0, 0.0, 374.0, 374, 374, 374.0, 374.0, 374.0, 374.0, 2.6737967914438503, 13.6483748328877, 2.8774649064171123], "isController": false}, {"data": ["See All Results/api/v2/search/securities-13", 1, 0, 0.0, 208.0, 208, 208, 208.0, 208.0, 208.0, 208.0, 4.807692307692308, 6.784292367788462, 5.1739032451923075], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B9VF/realtime-610", 1, 0, 0.0, 281.0, 281, 281, 281.0, 281.0, 281.0, 281.0, 3.558718861209964, 2.3840636120996437, 3.927101868327402], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", 1, 0, 0.0, 142.0, 142, 142, 142.0, 142.0, 142.0, 142.0, 7.042253521126761, 9.153554137323944, 9.566186179577466], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BQNK/realtime-567", 1, 0, 0.0, 201.0, 201, 201, 201.0, 201.0, 201.0, 201.0, 4.975124378109452, 3.3378031716417906, 5.490127487562189], "isController": false}, {"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", 1, 0, 0.0, 134.0, 134, 134, 134.0, 134.0, 134.0, 134.0, 7.462686567164179, 9.670883861940299, 10.093575093283581], "isController": false}, {"data": ["See All Results/api/v1/search/entities-31", 1, 0, 0.0, 601.0, 601, 601, 601.0, 601.0, 601.0, 601.0, 1.663893510815308, 0.9863118760399335, 1.915752391846922], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-1", 1, 0, 0.0, 520.0, 520, 520, 520.0, 520.0, 520.0, 520.0, 1.9230769230769231, 4.813326322115384, 2.101487379807692], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322T/realtime-580", 1, 0, 0.0, 199.0, 199, 199, 199.0, 199.0, 199.0, 199.0, 5.025125628140704, 3.381163630653266, 5.545304648241205], "isController": false}, {"data": ["ADOBE/api/v2/securities/by-id-602", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 6.70604987684729, 5.825700431034482], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000151KD/realtime-582", 1, 0, 0.0, 245.0, 245, 245, 245.0, 245.0, 245.0, 245.0, 4.081632653061225, 2.7582908163265305, 4.504145408163265], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B12F/realtime-611", 1, 0, 0.0, 308.0, 308, 308, 308.0, 308.0, 308.0, 308.0, 3.246753246753247, 2.1782416801948052, 3.582842938311688], "isController": false}, {"data": ["AAPL/api/v2/securities/movers-574", 1, 0, 0.0, 547.0, 547, 547, 547.0, 547.0, 547.0, 547.0, 1.8281535648994516, 3.7152222349177326, 2.07095521023766], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000X7UP/realtime-569", 1, 0, 0.0, 502.0, 502, 502, 502.0, 502.0, 502.0, 502.0, 1.9920318725099602, 1.3345057270916334, 2.198238296812749], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00007NXM/realtime-570", 1, 0, 0.0, 203.0, 203, 203, 203.0, 203.0, 203.0, 203.0, 4.926108374384237, 3.3001077586206895, 5.436037561576354], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00017M6Y/realtime-581", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 2.045704319571865, 3.374665519877676], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", 1, 0, 0.0, 202.0, 202, 202, 202.0, 202.0, 202.0, 202.0, 4.9504950495049505, 6.400835396039604, 6.72474474009901], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00019QA2/realtime-593", 1, 0, 0.0, 245.0, 245, 245, 245.0, 245.0, 245.0, 245.0, 4.081632653061225, 2.7184311224489797, 4.504145408163265], "isController": false}, {"data": ["AAPL/api/v2/securities/0P000000GY/realtime-566", 1, 0, 0.0, 1221.0, 1221, 1221, 1221.0, 1221.0, 1221.0, 1221.0, 0.819000819000819, 0.5478667588042587, 0.9037802006552006], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001ACT3/realtime-578", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 3.4080038265306123, 5.630181760204081], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00016YML/realtime-590", 1, 0, 0.0, 254.0, 254, 254, 254.0, 254.0, 254.0, 254.0, 3.937007874015748, 2.6451771653543306, 4.344549704724409], "isController": false}, {"data": ["AMZN/api/v2/search/securities-585", 1, 0, 0.0, 380.0, 380, 380, 380.0, 380.0, 380.0, 380.0, 2.631578947368421, 3.4719366776315788, 2.8294613486842106], "isController": false}, {"data": ["AMZN/api/v2/search/securities-584", 1, 0, 0.0, 414.0, 414, 414, 414.0, 414.0, 414.0, 414.0, 2.4154589371980677, 3.179725241545894, 2.594731280193237], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-28", 1, 0, 0.0, 391.0, 391, 391, 391.0, 391.0, 391.0, 391.0, 2.557544757033248, 3.516624040920716, 2.797314578005115], "isController": false}, {"data": ["See All Results/api/v1/search/articles-33", 1, 0, 0.0, 331.0, 331, 331, 331.0, 331.0, 331.0, 331.0, 3.0211480362537766, 2.8057732250755287, 3.2453738670694863], "isController": false}]}, function(index, item){
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
