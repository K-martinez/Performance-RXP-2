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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9621212121212122, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000002C/realtime-591"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/entities-21"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000F0/realtime-588"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000AGZF/realtime-607"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/search/securities-565"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/search/securities-564"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-576"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-575"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-17"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-32"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0001L1P7/realtime-609"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-34"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00009WEM/realtime-577"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-10"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000000B7/realtime-587"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P00011HZW/realtime-571"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00007NYP/realtime-589"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0000BEYH/realtime-583"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-12"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/movers-595"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BPWO/realtime-572"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-22"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322R/realtime-579"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-24"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00014L0S/realtime-608"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-597"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-596"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/movers-600"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-599"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/search/securities-598"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0001P7KW/realtime-568"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-23"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000005M/realtime-605"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P000171MJ/realtime-606"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-11"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v2/search/securities-13"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B9VF/realtime-610"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000BQNK/realtime-567"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2"], "isController": false}, {"data": [0.5, 500, 1500, "See All Results/api/v1/search/entities-31"], "isController": false}, {"data": [0.5, 500, 1500, "See Articles and Videos/api/v1/search/articles-1"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001322T/realtime-580"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/by-id-602"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P000151KD/realtime-582"], "isController": false}, {"data": [1.0, 500, 1500, "ADOBE/api/v2/securities/0P0000B12F/realtime-611"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/movers-574"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P0000X7UP/realtime-569"], "isController": false}, {"data": [0.5, 500, 1500, "AAPL/api/v2/securities/0P00007NXM/realtime-570"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00017M6Y/realtime-581"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00019QA2/realtime-593"], "isController": false}, {"data": [1.0, 500, 1500, "AAPL/api/v2/securities/0P000000GY/realtime-566"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P0001ACT3/realtime-578"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/securities/0P00016YML/realtime-590"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-585"], "isController": false}, {"data": [1.0, 500, 1500, "AMZN/api/v2/search/securities-584"], "isController": false}, {"data": [1.0, 500, 1500, "See Articles and Videos/api/v1/search/articles-28"], "isController": false}, {"data": [1.0, 500, 1500, "See All Results/api/v1/search/articles-33"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 66, 0, 0.0, 275.1515151515152, 108, 903, 241.0, 454.9000000000001, 675.7999999999997, 903.0, 3.6267721727662376, 4.357879299923068, 4.233917360424222], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", 1, 0, 0.0, 124.0, 124, 124, 124.0, 124.0, 124.0, 124.0, 8.064516129032258, 10.616179435483872, 11.120211693548388], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000002C/realtime-591", 1, 0, 0.0, 223.0, 223, 223, 223.0, 223.0, 223.0, 223.0, 4.484304932735426, 3.0085131726457397, 5.066739069506727], "isController": false}, {"data": ["See All Results/api/v1/search/entities-21", 1, 0, 0.0, 471.0, 471, 471, 471.0, 471.0, 471.0, 471.0, 2.1231422505307855, 1.2689092356687899, 2.4984242303609343], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000F0/realtime-588", 1, 0, 0.0, 255.0, 255, 255, 255.0, 255.0, 255.0, 255.0, 3.9215686274509802, 2.6424632352941178, 4.430912990196078], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000AGZF/realtime-607", 1, 0, 0.0, 335.0, 335, 335, 335.0, 335.0, 335.0, 335.0, 2.985074626865672, 2.0201725746268657, 3.372784514925373], "isController": false}, {"data": ["AAPL/api/v2/search/securities-565", 1, 0, 0.0, 183.0, 183, 183, 183.0, 183.0, 183.0, 183.0, 5.46448087431694, 6.713200136612022, 6.019467213114754], "isController": false}, {"data": ["AAPL/api/v2/search/securities-564", 1, 0, 0.0, 736.0, 736, 736, 736.0, 736.0, 736.0, 736.0, 1.358695652173913, 1.845650050951087, 1.492707625679348], "isController": false}, {"data": ["AMZN/api/v2/search/securities-576", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 6.395725388601036, 5.697457901554404], "isController": false}, {"data": ["AMZN/api/v2/search/securities-575", 1, 0, 0.0, 116.0, 116, 116, 116.0, 116.0, 116.0, 116.0, 8.620689655172413, 11.769261853448276, 9.470972521551724], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", 1, 0, 0.0, 263.0, 263, 263, 263.0, 263.0, 263.0, 263.0, 3.802281368821293, 8.53285408745247, 6.226978374524714], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-17", 1, 0, 0.0, 419.0, 419, 419, 419.0, 419.0, 419.0, 419.0, 2.3866348448687353, 5.810430340095466, 2.670980011933174], "isController": false}, {"data": ["AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", 1, 0, 0.0, 122.0, 122, 122, 122.0, 122.0, 122.0, 122.0, 8.196721311475411, 10.726178278688526, 11.30251024590164], "isController": false}, {"data": ["See All Results/api/v2/search/securities-32", 1, 0, 0.0, 193.0, 193, 193, 193.0, 193.0, 193.0, 193.0, 5.181347150259067, 9.057237694300518, 5.7176975388601035], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0001L1P7/realtime-609", 1, 0, 0.0, 182.0, 182, 182, 182.0, 182.0, 182.0, 182.0, 5.4945054945054945, 3.133585164835165, 6.208147321428571], "isController": false}, {"data": ["See All Results/api/v2/search/securities-34", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 5.830652573529412, 5.409390318627452], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00009WEM/realtime-577", 1, 0, 0.0, 242.0, 242, 242, 242.0, 242.0, 242.0, 242.0, 4.132231404958678, 2.772307592975207, 4.668937241735537], "isController": false}, {"data": ["See All Results/api/v1/search/entities-10", 1, 0, 0.0, 903.0, 903, 903, 903.0, 903.0, 903.0, 903.0, 1.1074197120708749, 0.6618563122923588, 1.3031647978959024], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000000B7/realtime-587", 1, 0, 0.0, 201.0, 201, 201, 201.0, 201.0, 201.0, 201.0, 4.975124378109452, 3.328086131840796, 5.621307524875622], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00011HZW/realtime-571", 1, 0, 0.0, 435.0, 435, 435, 435.0, 435.0, 435.0, 435.0, 2.2988505747126435, 1.5422952586206897, 2.5974317528735633], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00007NYP/realtime-589", 1, 0, 0.0, 246.0, 246, 246, 246.0, 246.0, 246.0, 246.0, 4.065040650406504, 2.73119918699187, 4.59301956300813], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0000BEYH/realtime-583", 1, 0, 0.0, 252.0, 252, 252, 252.0, 252.0, 252.0, 252.0, 3.968253968253968, 2.654544890873016, 4.483661954365079], "isController": false}, {"data": ["See All Results/api/v1/search/articles-12", 1, 0, 0.0, 207.0, 207, 207, 207.0, 207.0, 207.0, 207.0, 4.830917874396135, 5.335711050724638, 5.312122584541063], "isController": false}, {"data": ["AMZN/api/v2/securities/movers-595", 1, 0, 0.0, 258.0, 258, 258, 258.0, 258.0, 258.0, 258.0, 3.875968992248062, 7.6838057170542635, 4.492944525193798], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", 1, 0, 0.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 118.0, 8.474576271186441, 11.155985169491526, 11.685646186440678], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BPWO/realtime-572", 1, 0, 0.0, 430.0, 430, 430, 430.0, 430.0, 430.0, 430.0, 2.3255813953488373, 1.5829396802325582, 2.6276344476744184], "isController": false}, {"data": ["See All Results/api/v2/search/securities-22", 1, 0, 0.0, 362.0, 362, 362, 362.0, 362.0, 362.0, 362.0, 2.7624309392265194, 12.773545407458563, 3.045688017955801], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322R/realtime-579", 1, 0, 0.0, 366.0, 366, 366, 366.0, 366.0, 366.0, 366.0, 2.73224043715847, 1.8437286543715847, 3.0871115095628414], "isController": false}, {"data": ["See All Results/api/v2/search/securities-24", 1, 0, 0.0, 191.0, 191, 191, 191.0, 191.0, 191.0, 191.0, 5.235602094240838, 7.8125, 5.77245582460733], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00014L0S/realtime-608", 1, 0, 0.0, 292.0, 292, 292, 292.0, 292.0, 292.0, 292.0, 3.4246575342465753, 2.321008133561644, 3.869461686643836], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-597", 1, 0, 0.0, 195.0, 195, 195, 195.0, 195.0, 195.0, 195.0, 5.128205128205129, 6.4453125, 5.644030448717949], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-596", 1, 0, 0.0, 161.0, 161, 161, 161.0, 161.0, 161.0, 161.0, 6.211180124223602, 8.485782220496894, 6.823806288819876], "isController": false}, {"data": ["ADOBE/api/v2/securities/movers-600", 1, 0, 0.0, 204.0, 204, 204, 204.0, 204.0, 204.0, 204.0, 4.901960784313726, 9.722541360294118, 5.6822533700980395], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", 1, 0, 0.0, 282.0, 282, 282, 282.0, 282.0, 282.0, 282.0, 3.5460992907801416, 5.308759973404256, 4.817015735815604], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-599", 1, 0, 0.0, 156.0, 156, 156, 156.0, 156.0, 156.0, 156.0, 6.41025641025641, 7.161458333333333, 7.067558092948718], "isController": false}, {"data": ["ADOBE/api/v2/search/securities-598", 1, 0, 0.0, 177.0, 177, 177, 177.0, 177.0, 177.0, 177.0, 5.649717514124294, 6.89111052259887, 6.223516949152542], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0001P7KW/realtime-568", 1, 0, 0.0, 223.0, 223, 223, 223.0, 223.0, 223.0, 223.0, 4.484304932735426, 3.039167600896861, 5.066739069506727], "isController": false}, {"data": ["See All Results/api/v1/search/articles-23", 1, 0, 0.0, 233.0, 233, 233, 233.0, 233.0, 233.0, 233.0, 4.291845493562231, 4.660675965665236, 4.7193535407725316], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", 1, 0, 0.0, 108.0, 108, 108, 108.0, 108.0, 108.0, 108.0, 9.25925925925926, 12.17990451388889, 12.767650462962964], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000005M/realtime-605", 1, 0, 0.0, 179.0, 179, 179, 179.0, 179.0, 179.0, 179.0, 5.58659217877095, 3.769858589385475, 6.312194483240224], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P000171MJ/realtime-606", 1, 0, 0.0, 260.0, 260, 260, 260.0, 260.0, 260.0, 260.0, 3.8461538461538463, 2.614182692307692, 4.345703125], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", 1, 0, 0.0, 150.0, 150, 150, 150.0, 150.0, 150.0, 150.0, 6.666666666666667, 8.76953125, 9.231770833333334], "isController": false}, {"data": ["See All Results/api/v2/search/securities-11", 1, 0, 0.0, 354.0, 354, 354, 354.0, 354.0, 354.0, 354.0, 2.824858757062147, 14.554643361581922, 3.114517125706215], "isController": false}, {"data": ["See All Results/api/v2/search/securities-13", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 5.359996448863636, 4.176284327651515], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B9VF/realtime-610", 1, 0, 0.0, 252.0, 252, 252, 252.0, 252.0, 252.0, 252.0, 3.968253968253968, 2.685546875, 4.483661954365079], "isController": false}, {"data": ["ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", 1, 0, 0.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 113.0, 8.849557522123893, 11.640970685840708, 12.254563053097344], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000BQNK/realtime-567", 1, 0, 0.0, 428.0, 428, 428, 428.0, 428.0, 428.0, 428.0, 2.336448598130841, 1.5834915303738317, 2.639913113317757], "isController": false}, {"data": ["See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", 1, 0, 0.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 119.0, 8.403361344537815, 10.988379726890757, 11.587447478991598], "isController": false}, {"data": ["See All Results/api/v1/search/entities-31", 1, 0, 0.0, 564.0, 564, 564, 564.0, 564.0, 564.0, 564.0, 1.7730496453900708, 1.0596742021276597, 2.088181515957447], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-1", 1, 0, 0.0, 875.0, 875, 875, 875.0, 875.0, 875.0, 875.0, 1.142857142857143, 2.8482142857142856, 1.2790178571428572], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001322T/realtime-580", 1, 0, 0.0, 248.0, 248, 248, 248.0, 248.0, 248.0, 248.0, 4.032258064516129, 2.697360131048387, 4.55597908266129], "isController": false}, {"data": ["ADOBE/api/v2/securities/by-id-602", 1, 0, 0.0, 163.0, 163, 163, 163.0, 163.0, 163.0, 163.0, 6.134969325153374, 8.357697469325153, 7.417082055214724], "isController": false}, {"data": ["AMZN/api/v2/securities/0P000151KD/realtime-582", 1, 0, 0.0, 243.0, 243, 243, 243.0, 243.0, 243.0, 243.0, 4.11522633744856, 2.7608989197530867, 4.649723508230453], "isController": false}, {"data": ["ADOBE/api/v2/securities/0P0000B12F/realtime-611", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 2.5634765625, 4.279859138257575], "isController": false}, {"data": ["AAPL/api/v2/securities/movers-574", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 15.555794783464567, 9.127399114173228], "isController": false}, {"data": ["AAPL/api/v2/securities/0P0000X7UP/realtime-569", 1, 0, 0.0, 228.0, 228, 228, 228.0, 228.0, 228.0, 228.0, 4.385964912280701, 2.963952850877193, 4.955626370614035], "isController": false}, {"data": ["AAPL/api/v2/securities/0P00007NXM/realtime-570", 1, 0, 0.0, 542.0, 542, 542, 542.0, 542.0, 542.0, 542.0, 1.8450184501845017, 1.2414235470479704, 2.0846546356088558], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00017M6Y/realtime-581", 1, 0, 0.0, 255.0, 255, 255, 255.0, 255.0, 255.0, 255.0, 3.9215686274509802, 2.646292892156863, 4.430912990196078], "isController": false}, {"data": ["AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", 1, 0, 0.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 143.0, 6.993006993006993, 9.151005244755245, 9.6836756993007], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00019QA2/realtime-593", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 2.6397705078125, 4.413604736328125], "isController": false}, {"data": ["AAPL/api/v2/securities/0P000000GY/realtime-566", 1, 0, 0.0, 448.0, 448, 448, 448.0, 448.0, 448.0, 448.0, 2.232142857142857, 1.5062604631696428, 2.522059849330357], "isController": false}, {"data": ["AMZN/api/v2/securities/0P0001ACT3/realtime-578", 1, 0, 0.0, 256.0, 256, 256, 256.0, 256.0, 256.0, 256.0, 3.90625, 2.61688232421875, 4.413604736328125], "isController": false}, {"data": ["AMZN/api/v2/securities/0P00016YML/realtime-590", 1, 0, 0.0, 240.0, 240, 240, 240.0, 240.0, 240.0, 240.0, 4.166666666666667, 2.799479166666667, 4.707845052083334], "isController": false}, {"data": ["AMZN/api/v2/search/securities-585", 1, 0, 0.0, 188.0, 188, 188, 188.0, 188.0, 188.0, 188.0, 5.319148936170213, 7.0696891622340425, 5.859375], "isController": false}, {"data": ["AMZN/api/v2/search/securities-584", 1, 0, 0.0, 196.0, 196, 196, 196.0, 196.0, 196.0, 196.0, 5.1020408163265305, 6.885762117346938, 5.615234375], "isController": false}, {"data": ["See Articles and Videos/api/v1/search/articles-28", 1, 0, 0.0, 312.0, 312, 312, 312.0, 312.0, 312.0, 312.0, 3.205128205128205, 4.407051282051282, 3.590119190705128], "isController": false}, {"data": ["See All Results/api/v1/search/articles-33", 1, 0, 0.0, 232.0, 232, 232, 232.0, 232.0, 232.0, 232.0, 4.310344827586206, 4.003064385775862, 4.743904903017241], "isController": false}]}, function(index, item){
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
