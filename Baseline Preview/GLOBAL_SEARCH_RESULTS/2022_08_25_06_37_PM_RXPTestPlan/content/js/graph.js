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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 1.0, "series": [{"data": [[100.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000002C/realtime-591", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-21", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000F0/realtime-588", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000AGZF/realtime-607", "isController": false}, {"data": [[5800.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-565", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-564", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-576", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-575", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=25&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=14429-30", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Daapl&ea=open&el=Search%20Results%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=893438446&gjid=116875075&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=810560450-14", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-17", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-32", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0001L1P7/realtime-609", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-34", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=17&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=10355-15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-37", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00009WEM/realtime-577", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-10", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000B7/realtime-587", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00011HZW/realtime-571", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00007NYP/realtime-589", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000BEYH/realtime-583", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Dadobe&ea=open&el=Search%20Results%20for%20adobe%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=1360986001&gjid=423766467&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2145668508-35", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Daapl&ea=open&el=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=446747056&gjid=1942753410&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2107331130-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-20", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-12", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/movers-595", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Damzn&ea=open&el=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=838644795&gjid=1955033213&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=979160708-18", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BPWO/realtime-572", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-22", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322R/realtime-579", "isController": false}, {"data": [[3400.0, 1.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-24", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00014L0S/realtime-608", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=15&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=47609-8", "isController": false}, {"data": [[900.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-597", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-596", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=23&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=12817-26", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/movers-600", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-599", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-598", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0001P7KW/realtime-568", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-23", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=27&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=12421-36", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000005M/realtime-605", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P000171MJ/realtime-606", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", "isController": false}, {"data": [[1200.0, 1.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-11", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-13", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B9VF/realtime-610", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-16", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BQNK/realtime-567", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-31", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322T/realtime-580", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/by-id-602", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000151KD/realtime-582", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/collect-29", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B12F/realtime-611", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/movers-574", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-9", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000X7UP/realtime-569", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See All Results/collect-25", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00007NXM/realtime-570", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00017M6Y/realtime-581", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=21&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=19329-19", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00019QA2/realtime-593", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P000000GY/realtime-566", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001ACT3/realtime-578", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00016YML/realtime-590", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-585", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-584", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-28", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-33", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 5800.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 3.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 73.0, "series": [{"data": [[0.0, 73.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 6.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 3.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.66147062E12, "maxY": 1.0, "series": [{"data": [[1.66147062E12, 1.0]], "isOverall": false, "label": "GLOBAL SEARCH", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66147062E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 34.0, "minX": 1.0, "maxY": 5827.0, "series": [{"data": [[1.0, 128.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27-Aggregated", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000002C/realtime-591", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000002C/realtime-591-Aggregated", "isController": false}, {"data": [[1.0, 198.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-21", "isController": false}, {"data": [[1.0, 198.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-21-Aggregated", "isController": false}, {"data": [[1.0, 186.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000F0/realtime-588", "isController": false}, {"data": [[1.0, 186.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000F0/realtime-588-Aggregated", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000AGZF/realtime-607", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000AGZF/realtime-607-Aggregated", "isController": false}, {"data": [[1.0, 5827.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-565", "isController": false}, {"data": [[1.0, 5827.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-565-Aggregated", "isController": false}, {"data": [[1.0, 946.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-564", "isController": false}, {"data": [[1.0, 946.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-564-Aggregated", "isController": false}, {"data": [[1.0, 2697.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-576", "isController": false}, {"data": [[1.0, 2697.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-576-Aggregated", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-575", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-575-Aggregated", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=25&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=14429-30", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=25&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=14429-30-Aggregated", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", "isController": false}, {"data": [[1.0, 138.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603-Aggregated", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Daapl&ea=open&el=Search%20Results%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=893438446&gjid=116875075&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=810560450-14", "isController": false}, {"data": [[1.0, 83.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Daapl&ea=open&el=Search%20Results%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=893438446&gjid=116875075&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=810560450-14-Aggregated", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-17", "isController": false}, {"data": [[1.0, 141.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-17-Aggregated", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573-Aggregated", "isController": false}, {"data": [[1.0, 200.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-32", "isController": false}, {"data": [[1.0, 200.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-32-Aggregated", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0001L1P7/realtime-609", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0001L1P7/realtime-609-Aggregated", "isController": false}, {"data": [[1.0, 384.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-34", "isController": false}, {"data": [[1.0, 384.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-34-Aggregated", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=17&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=10355-15", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=17&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=10355-15-Aggregated", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-37", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-37-Aggregated", "isController": false}, {"data": [[1.0, 201.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00009WEM/realtime-577", "isController": false}, {"data": [[1.0, 201.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00009WEM/realtime-577-Aggregated", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-10", "isController": false}, {"data": [[1.0, 280.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-10-Aggregated", "isController": false}, {"data": [[1.0, 224.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000B7/realtime-587", "isController": false}, {"data": [[1.0, 224.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000B7/realtime-587-Aggregated", "isController": false}, {"data": [[1.0, 526.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00011HZW/realtime-571", "isController": false}, {"data": [[1.0, 526.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00011HZW/realtime-571-Aggregated", "isController": false}, {"data": [[1.0, 193.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00007NYP/realtime-589", "isController": false}, {"data": [[1.0, 193.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00007NYP/realtime-589-Aggregated", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000BEYH/realtime-583", "isController": false}, {"data": [[1.0, 187.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000BEYH/realtime-583-Aggregated", "isController": false}, {"data": [[1.0, 197.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Dadobe&ea=open&el=Search%20Results%20for%20adobe%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=1360986001&gjid=423766467&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2145668508-35", "isController": false}, {"data": [[1.0, 197.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Dadobe&ea=open&el=Search%20Results%20for%20adobe%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=1360986001&gjid=423766467&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2145668508-35-Aggregated", "isController": false}, {"data": [[1.0, 202.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Daapl&ea=open&el=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=446747056&gjid=1942753410&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2107331130-7", "isController": false}, {"data": [[1.0, 202.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Daapl&ea=open&el=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=446747056&gjid=1942753410&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2107331130-7-Aggregated", "isController": false}, {"data": [[1.0, 112.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-20", "isController": false}, {"data": [[1.0, 112.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-20-Aggregated", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-12", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-12-Aggregated", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "AMZN/api/v2/securities/movers-595", "isController": false}, {"data": [[1.0, 105.0]], "isOverall": false, "label": "AMZN/api/v2/securities/movers-595-Aggregated", "isController": false}, {"data": [[1.0, 102.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Damzn&ea=open&el=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=838644795&gjid=1955033213&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=979160708-18", "isController": false}, {"data": [[1.0, 102.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Damzn&ea=open&el=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=838644795&gjid=1955033213&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=979160708-18-Aggregated", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BPWO/realtime-572", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BPWO/realtime-572-Aggregated", "isController": false}, {"data": [[1.0, 491.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-22", "isController": false}, {"data": [[1.0, 491.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-22-Aggregated", "isController": false}, {"data": [[1.0, 190.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322R/realtime-579", "isController": false}, {"data": [[1.0, 190.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322R/realtime-579-Aggregated", "isController": false}, {"data": [[1.0, 3412.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-24", "isController": false}, {"data": [[1.0, 3412.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-24-Aggregated", "isController": false}, {"data": [[1.0, 197.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00014L0S/realtime-608", "isController": false}, {"data": [[1.0, 197.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00014L0S/realtime-608-Aggregated", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=15&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=47609-8", "isController": false}, {"data": [[1.0, 206.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=15&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=47609-8-Aggregated", "isController": false}, {"data": [[1.0, 907.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-597", "isController": false}, {"data": [[1.0, 907.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-597-Aggregated", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-596", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-596-Aggregated", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=23&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=12817-26", "isController": false}, {"data": [[1.0, 90.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=23&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=12817-26-Aggregated", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/movers-600", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/movers-600-Aggregated", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", "isController": false}, {"data": [[1.0, 205.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604-Aggregated", "isController": false}, {"data": [[1.0, 326.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-599", "isController": false}, {"data": [[1.0, 326.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-599-Aggregated", "isController": false}, {"data": [[1.0, 596.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-598", "isController": false}, {"data": [[1.0, 596.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-598-Aggregated", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0001P7KW/realtime-568", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0001P7KW/realtime-568-Aggregated", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-23", "isController": false}, {"data": [[1.0, 120.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-23-Aggregated", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", "isController": false}, {"data": [[1.0, 114.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586-Aggregated", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=27&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=12421-36", "isController": false}, {"data": [[1.0, 88.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=27&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=12421-36-Aggregated", "isController": false}, {"data": [[1.0, 186.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000005M/realtime-605", "isController": false}, {"data": [[1.0, 186.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000005M/realtime-605-Aggregated", "isController": false}, {"data": [[1.0, 191.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P000171MJ/realtime-606", "isController": false}, {"data": [[1.0, 191.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P000171MJ/realtime-606-Aggregated", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", "isController": false}, {"data": [[1.0, 116.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612-Aggregated", "isController": false}, {"data": [[1.0, 1217.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-11", "isController": false}, {"data": [[1.0, 1217.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-11-Aggregated", "isController": false}, {"data": [[1.0, 232.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-13", "isController": false}, {"data": [[1.0, 232.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-13-Aggregated", "isController": false}, {"data": [[1.0, 195.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B9VF/realtime-610", "isController": false}, {"data": [[1.0, 195.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B9VF/realtime-610-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613-Aggregated", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-16", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-16-Aggregated", "isController": false}, {"data": [[1.0, 389.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BQNK/realtime-567", "isController": false}, {"data": [[1.0, 389.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BQNK/realtime-567-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2-Aggregated", "isController": false}, {"data": [[1.0, 193.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-31", "isController": false}, {"data": [[1.0, 193.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-31-Aggregated", "isController": false}, {"data": [[1.0, 353.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-1", "isController": false}, {"data": [[1.0, 353.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-1-Aggregated", "isController": false}, {"data": [[1.0, 195.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322T/realtime-580", "isController": false}, {"data": [[1.0, 195.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322T/realtime-580-Aggregated", "isController": false}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/by-id-602", "isController": false}, {"data": [[1.0, 404.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/by-id-602-Aggregated", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000151KD/realtime-582", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000151KD/realtime-582-Aggregated", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "See Articles and Videos/collect-29", "isController": false}, {"data": [[1.0, 34.0]], "isOverall": false, "label": "See Articles and Videos/collect-29-Aggregated", "isController": false}, {"data": [[1.0, 208.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B12F/realtime-611", "isController": false}, {"data": [[1.0, 208.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B12F/realtime-611-Aggregated", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "AAPL/api/v2/securities/movers-574", "isController": false}, {"data": [[1.0, 539.0]], "isOverall": false, "label": "AAPL/api/v2/securities/movers-574-Aggregated", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-9", "isController": false}, {"data": [[1.0, 214.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-9-Aggregated", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000X7UP/realtime-569", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000X7UP/realtime-569-Aggregated", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "See All Results/collect-25", "isController": false}, {"data": [[1.0, 36.0]], "isOverall": false, "label": "See All Results/collect-25-Aggregated", "isController": false}, {"data": [[1.0, 443.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00007NXM/realtime-570", "isController": false}, {"data": [[1.0, 443.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00007NXM/realtime-570-Aggregated", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00017M6Y/realtime-581", "isController": false}, {"data": [[1.0, 196.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00017M6Y/realtime-581-Aggregated", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", "isController": false}, {"data": [[1.0, 117.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594-Aggregated", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=21&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=19329-19", "isController": false}, {"data": [[1.0, 87.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=21&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=19329-19-Aggregated", "isController": false}, {"data": [[1.0, 183.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00019QA2/realtime-593", "isController": false}, {"data": [[1.0, 183.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00019QA2/realtime-593-Aggregated", "isController": false}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P000000GY/realtime-566", "isController": false}, {"data": [[1.0, 485.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P000000GY/realtime-566-Aggregated", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001ACT3/realtime-578", "isController": false}, {"data": [[1.0, 189.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001ACT3/realtime-578-Aggregated", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00016YML/realtime-590", "isController": false}, {"data": [[1.0, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00016YML/realtime-590-Aggregated", "isController": false}, {"data": [[1.0, 483.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-585", "isController": false}, {"data": [[1.0, 483.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-585-Aggregated", "isController": false}, {"data": [[1.0, 384.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-584", "isController": false}, {"data": [[1.0, 384.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-584-Aggregated", "isController": false}, {"data": [[1.0, 169.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-28", "isController": false}, {"data": [[1.0, 169.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-28-Aggregated", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-33", "isController": false}, {"data": [[1.0, 124.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-33-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1503.6, "minX": 1.66147062E12, "maxY": 1545.1333333333334, "series": [{"data": [[1.66147062E12, 1503.6]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66147062E12, 1545.1333333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66147062E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 34.0, "minX": 1.66147062E12, "maxY": 5827.0, "series": [{"data": [[1.66147062E12, 128.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", "isController": false}, {"data": [[1.66147062E12, 196.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000002C/realtime-591", "isController": false}, {"data": [[1.66147062E12, 198.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-21", "isController": false}, {"data": [[1.66147062E12, 186.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000F0/realtime-588", "isController": false}, {"data": [[1.66147062E12, 196.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000AGZF/realtime-607", "isController": false}, {"data": [[1.66147062E12, 5827.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-565", "isController": false}, {"data": [[1.66147062E12, 946.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-564", "isController": false}, {"data": [[1.66147062E12, 2697.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-576", "isController": false}, {"data": [[1.66147062E12, 119.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-575", "isController": false}, {"data": [[1.66147062E12, 87.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=25&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=14429-30", "isController": false}, {"data": [[1.66147062E12, 138.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", "isController": false}, {"data": [[1.66147062E12, 83.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Daapl&ea=open&el=Search%20Results%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=893438446&gjid=116875075&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=810560450-14", "isController": false}, {"data": [[1.66147062E12, 141.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-17", "isController": false}, {"data": [[1.66147062E12, 185.0]], "isOverall": false, "label": "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", "isController": false}, {"data": [[1.66147062E12, 200.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-32", "isController": false}, {"data": [[1.66147062E12, 119.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0001L1P7/realtime-609", "isController": false}, {"data": [[1.66147062E12, 384.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-34", "isController": false}, {"data": [[1.66147062E12, 96.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=17&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=10355-15", "isController": false}, {"data": [[1.66147062E12, 108.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-37", "isController": false}, {"data": [[1.66147062E12, 201.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00009WEM/realtime-577", "isController": false}, {"data": [[1.66147062E12, 280.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-10", "isController": false}, {"data": [[1.66147062E12, 224.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000B7/realtime-587", "isController": false}, {"data": [[1.66147062E12, 526.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00011HZW/realtime-571", "isController": false}, {"data": [[1.66147062E12, 193.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00007NYP/realtime-589", "isController": false}, {"data": [[1.66147062E12, 187.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000BEYH/realtime-583", "isController": false}, {"data": [[1.66147062E12, 197.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Dadobe&ea=open&el=Search%20Results%20for%20adobe%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=1360986001&gjid=423766467&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2145668508-35", "isController": false}, {"data": [[1.66147062E12, 202.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Daapl&ea=open&el=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=446747056&gjid=1942753410&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2107331130-7", "isController": false}, {"data": [[1.66147062E12, 112.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-20", "isController": false}, {"data": [[1.66147062E12, 124.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-12", "isController": false}, {"data": [[1.66147062E12, 105.0]], "isOverall": false, "label": "AMZN/api/v2/securities/movers-595", "isController": false}, {"data": [[1.66147062E12, 102.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Damzn&ea=open&el=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=838644795&gjid=1955033213&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=979160708-18", "isController": false}, {"data": [[1.66147062E12, 108.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", "isController": false}, {"data": [[1.66147062E12, 205.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BPWO/realtime-572", "isController": false}, {"data": [[1.66147062E12, 491.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-22", "isController": false}, {"data": [[1.66147062E12, 190.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322R/realtime-579", "isController": false}, {"data": [[1.66147062E12, 3412.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-24", "isController": false}, {"data": [[1.66147062E12, 197.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00014L0S/realtime-608", "isController": false}, {"data": [[1.66147062E12, 206.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=15&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=47609-8", "isController": false}, {"data": [[1.66147062E12, 907.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-597", "isController": false}, {"data": [[1.66147062E12, 114.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-596", "isController": false}, {"data": [[1.66147062E12, 90.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=23&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=12817-26", "isController": false}, {"data": [[1.66147062E12, 131.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/movers-600", "isController": false}, {"data": [[1.66147062E12, 205.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", "isController": false}, {"data": [[1.66147062E12, 326.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-599", "isController": false}, {"data": [[1.66147062E12, 596.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-598", "isController": false}, {"data": [[1.66147062E12, 189.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0001P7KW/realtime-568", "isController": false}, {"data": [[1.66147062E12, 120.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-23", "isController": false}, {"data": [[1.66147062E12, 114.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", "isController": false}, {"data": [[1.66147062E12, 88.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=27&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=12421-36", "isController": false}, {"data": [[1.66147062E12, 186.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000005M/realtime-605", "isController": false}, {"data": [[1.66147062E12, 191.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P000171MJ/realtime-606", "isController": false}, {"data": [[1.66147062E12, 116.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", "isController": false}, {"data": [[1.66147062E12, 1217.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-11", "isController": false}, {"data": [[1.66147062E12, 232.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-13", "isController": false}, {"data": [[1.66147062E12, 195.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B9VF/realtime-610", "isController": false}, {"data": [[1.66147062E12, 113.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", "isController": false}, {"data": [[1.66147062E12, 111.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-16", "isController": false}, {"data": [[1.66147062E12, 389.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BQNK/realtime-567", "isController": false}, {"data": [[1.66147062E12, 113.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", "isController": false}, {"data": [[1.66147062E12, 193.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-31", "isController": false}, {"data": [[1.66147062E12, 353.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-1", "isController": false}, {"data": [[1.66147062E12, 195.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322T/realtime-580", "isController": false}, {"data": [[1.66147062E12, 404.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/by-id-602", "isController": false}, {"data": [[1.66147062E12, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000151KD/realtime-582", "isController": false}, {"data": [[1.66147062E12, 34.0]], "isOverall": false, "label": "See Articles and Videos/collect-29", "isController": false}, {"data": [[1.66147062E12, 208.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B12F/realtime-611", "isController": false}, {"data": [[1.66147062E12, 539.0]], "isOverall": false, "label": "AAPL/api/v2/securities/movers-574", "isController": false}, {"data": [[1.66147062E12, 214.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-9", "isController": false}, {"data": [[1.66147062E12, 189.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000X7UP/realtime-569", "isController": false}, {"data": [[1.66147062E12, 36.0]], "isOverall": false, "label": "See All Results/collect-25", "isController": false}, {"data": [[1.66147062E12, 443.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00007NXM/realtime-570", "isController": false}, {"data": [[1.66147062E12, 196.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00017M6Y/realtime-581", "isController": false}, {"data": [[1.66147062E12, 117.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", "isController": false}, {"data": [[1.66147062E12, 87.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=21&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=19329-19", "isController": false}, {"data": [[1.66147062E12, 183.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00019QA2/realtime-593", "isController": false}, {"data": [[1.66147062E12, 485.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P000000GY/realtime-566", "isController": false}, {"data": [[1.66147062E12, 189.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001ACT3/realtime-578", "isController": false}, {"data": [[1.66147062E12, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00016YML/realtime-590", "isController": false}, {"data": [[1.66147062E12, 483.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-585", "isController": false}, {"data": [[1.66147062E12, 384.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-584", "isController": false}, {"data": [[1.66147062E12, 169.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-28", "isController": false}, {"data": [[1.66147062E12, 124.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-33", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66147062E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66147062E12, "maxY": 5826.0, "series": [{"data": [[1.66147062E12, 128.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", "isController": false}, {"data": [[1.66147062E12, 195.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000002C/realtime-591", "isController": false}, {"data": [[1.66147062E12, 198.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-21", "isController": false}, {"data": [[1.66147062E12, 186.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000F0/realtime-588", "isController": false}, {"data": [[1.66147062E12, 196.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000AGZF/realtime-607", "isController": false}, {"data": [[1.66147062E12, 5826.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-565", "isController": false}, {"data": [[1.66147062E12, 945.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-564", "isController": false}, {"data": [[1.66147062E12, 2696.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-576", "isController": false}, {"data": [[1.66147062E12, 119.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-575", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=25&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=14429-30", "isController": false}, {"data": [[1.66147062E12, 138.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", "isController": false}, {"data": [[1.66147062E12, 83.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Daapl&ea=open&el=Search%20Results%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=893438446&gjid=116875075&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=810560450-14", "isController": false}, {"data": [[1.66147062E12, 131.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-17", "isController": false}, {"data": [[1.66147062E12, 185.0]], "isOverall": false, "label": "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", "isController": false}, {"data": [[1.66147062E12, 200.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-32", "isController": false}, {"data": [[1.66147062E12, 119.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0001L1P7/realtime-609", "isController": false}, {"data": [[1.66147062E12, 384.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-34", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=17&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=10355-15", "isController": false}, {"data": [[1.66147062E12, 108.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-37", "isController": false}, {"data": [[1.66147062E12, 200.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00009WEM/realtime-577", "isController": false}, {"data": [[1.66147062E12, 280.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-10", "isController": false}, {"data": [[1.66147062E12, 223.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000B7/realtime-587", "isController": false}, {"data": [[1.66147062E12, 526.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00011HZW/realtime-571", "isController": false}, {"data": [[1.66147062E12, 193.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00007NYP/realtime-589", "isController": false}, {"data": [[1.66147062E12, 187.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000BEYH/realtime-583", "isController": false}, {"data": [[1.66147062E12, 197.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Dadobe&ea=open&el=Search%20Results%20for%20adobe%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=1360986001&gjid=423766467&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2145668508-35", "isController": false}, {"data": [[1.66147062E12, 202.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Daapl&ea=open&el=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=446747056&gjid=1942753410&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2107331130-7", "isController": false}, {"data": [[1.66147062E12, 112.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-20", "isController": false}, {"data": [[1.66147062E12, 123.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-12", "isController": false}, {"data": [[1.66147062E12, 105.0]], "isOverall": false, "label": "AMZN/api/v2/securities/movers-595", "isController": false}, {"data": [[1.66147062E12, 102.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Damzn&ea=open&el=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=838644795&gjid=1955033213&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=979160708-18", "isController": false}, {"data": [[1.66147062E12, 108.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", "isController": false}, {"data": [[1.66147062E12, 205.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BPWO/realtime-572", "isController": false}, {"data": [[1.66147062E12, 490.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-22", "isController": false}, {"data": [[1.66147062E12, 189.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322R/realtime-579", "isController": false}, {"data": [[1.66147062E12, 3411.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-24", "isController": false}, {"data": [[1.66147062E12, 197.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00014L0S/realtime-608", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=15&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=47609-8", "isController": false}, {"data": [[1.66147062E12, 907.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-597", "isController": false}, {"data": [[1.66147062E12, 113.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-596", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=23&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=12817-26", "isController": false}, {"data": [[1.66147062E12, 131.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/movers-600", "isController": false}, {"data": [[1.66147062E12, 205.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", "isController": false}, {"data": [[1.66147062E12, 325.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-599", "isController": false}, {"data": [[1.66147062E12, 596.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-598", "isController": false}, {"data": [[1.66147062E12, 188.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0001P7KW/realtime-568", "isController": false}, {"data": [[1.66147062E12, 119.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-23", "isController": false}, {"data": [[1.66147062E12, 114.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=27&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=12421-36", "isController": false}, {"data": [[1.66147062E12, 186.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000005M/realtime-605", "isController": false}, {"data": [[1.66147062E12, 191.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P000171MJ/realtime-606", "isController": false}, {"data": [[1.66147062E12, 116.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", "isController": false}, {"data": [[1.66147062E12, 1217.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-11", "isController": false}, {"data": [[1.66147062E12, 232.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-13", "isController": false}, {"data": [[1.66147062E12, 195.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B9VF/realtime-610", "isController": false}, {"data": [[1.66147062E12, 113.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", "isController": false}, {"data": [[1.66147062E12, 111.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-16", "isController": false}, {"data": [[1.66147062E12, 389.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BQNK/realtime-567", "isController": false}, {"data": [[1.66147062E12, 113.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", "isController": false}, {"data": [[1.66147062E12, 193.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-31", "isController": false}, {"data": [[1.66147062E12, 353.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-1", "isController": false}, {"data": [[1.66147062E12, 195.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322T/realtime-580", "isController": false}, {"data": [[1.66147062E12, 403.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/by-id-602", "isController": false}, {"data": [[1.66147062E12, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000151KD/realtime-582", "isController": false}, {"data": [[1.66147062E12, 34.0]], "isOverall": false, "label": "See Articles and Videos/collect-29", "isController": false}, {"data": [[1.66147062E12, 207.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B12F/realtime-611", "isController": false}, {"data": [[1.66147062E12, 539.0]], "isOverall": false, "label": "AAPL/api/v2/securities/movers-574", "isController": false}, {"data": [[1.66147062E12, 214.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-9", "isController": false}, {"data": [[1.66147062E12, 189.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000X7UP/realtime-569", "isController": false}, {"data": [[1.66147062E12, 36.0]], "isOverall": false, "label": "See All Results/collect-25", "isController": false}, {"data": [[1.66147062E12, 443.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00007NXM/realtime-570", "isController": false}, {"data": [[1.66147062E12, 196.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00017M6Y/realtime-581", "isController": false}, {"data": [[1.66147062E12, 117.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=21&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=19329-19", "isController": false}, {"data": [[1.66147062E12, 182.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00019QA2/realtime-593", "isController": false}, {"data": [[1.66147062E12, 485.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P000000GY/realtime-566", "isController": false}, {"data": [[1.66147062E12, 189.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001ACT3/realtime-578", "isController": false}, {"data": [[1.66147062E12, 185.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00016YML/realtime-590", "isController": false}, {"data": [[1.66147062E12, 483.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-585", "isController": false}, {"data": [[1.66147062E12, 383.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-584", "isController": false}, {"data": [[1.66147062E12, 169.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-28", "isController": false}, {"data": [[1.66147062E12, 124.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-33", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66147062E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66147062E12, "maxY": 307.0, "series": [{"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000002C/realtime-591", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-21", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000F0/realtime-588", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000AGZF/realtime-607", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-565", "isController": false}, {"data": [[1.66147062E12, 307.0]], "isOverall": false, "label": "AAPL/api/v2/search/securities-564", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-576", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-575", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=25&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=14429-30", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Daapl&ea=open&el=Search%20Results%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=893438446&gjid=116875075&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=810560450-14", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-17", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-32", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0001L1P7/realtime-609", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-34", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=17&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=10355-15", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-37", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00009WEM/realtime-577", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-10", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000B7/realtime-587", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00011HZW/realtime-571", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00007NYP/realtime-589", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000BEYH/realtime-583", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Dadobe&ea=open&el=Search%20Results%20for%20adobe%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=1360986001&gjid=423766467&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2145668508-35", "isController": false}, {"data": [[1.66147062E12, 125.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Daapl&ea=open&el=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=446747056&gjid=1942753410&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2107331130-7", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-20", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-12", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/movers-595", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Damzn&ea=open&el=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=838644795&gjid=1955033213&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=979160708-18", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BPWO/realtime-572", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-22", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322R/realtime-579", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-24", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00014L0S/realtime-608", "isController": false}, {"data": [[1.66147062E12, 127.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=15&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=47609-8", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-597", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-596", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=23&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=12817-26", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/movers-600", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-599", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-598", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0001P7KW/realtime-568", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-23", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=27&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=12421-36", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000005M/realtime-605", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P000171MJ/realtime-606", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-11", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v2/search/securities-13", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B9VF/realtime-610", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/ads/ga-audiences-16", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BQNK/realtime-567", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v1/search/entities-31", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-1", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322T/realtime-580", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/by-id-602", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000151KD/realtime-582", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/collect-29", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B12F/realtime-611", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/movers-574", "isController": false}, {"data": [[1.66147062E12, 134.0]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-9", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000X7UP/realtime-569", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/collect-25", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00007NXM/realtime-570", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00017M6Y/realtime-581", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=21&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=19329-19", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00019QA2/realtime-593", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AAPL/api/v2/securities/0P000000GY/realtime-566", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001ACT3/realtime-578", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00016YML/realtime-590", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-585", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "AMZN/api/v2/search/securities-584", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-28", "isController": false}, {"data": [[1.66147062E12, 0.0]], "isOverall": false, "label": "See All Results/api/v1/search/articles-33", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66147062E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 34.0, "minX": 1.66147062E12, "maxY": 5827.0, "series": [{"data": [[1.66147062E12, 5827.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66147062E12, 535.1]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66147062E12, 5827.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66147062E12, 1176.3499999999985]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66147062E12, 34.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66147062E12, 190.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66147062E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 116.0, "minX": 1.0, "maxY": 946.0, "series": [{"data": [[1.0, 946.0], [2.0, 464.0], [4.0, 210.0], [5.0, 188.0], [6.0, 118.0], [3.0, 355.0], [7.0, 116.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 7.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 116.0, "minX": 1.0, "maxY": 945.0, "series": [{"data": [[1.0, 945.0], [2.0, 464.0], [4.0, 208.0], [5.0, 187.5], [6.0, 118.0], [3.0, 354.0], [7.0, 116.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 7.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.3666666666666667, "minX": 1.66147062E12, "maxY": 1.3666666666666667, "series": [{"data": [[1.66147062E12, 1.3666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66147062E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.1, "minX": 1.66147062E12, "maxY": 1.2666666666666666, "series": [{"data": [[1.66147062E12, 1.2666666666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66147062E12, 0.1]], "isOverall": false, "label": "204", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66147062E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66147062E12, "maxY": 0.016666666666666666, "series": [{"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/movers-600-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-586-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v1/search/articles-33-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00019QA2/realtime-593-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00001GJH,0P00012P92,0P00012P99,0P00012P9F,0P00012P9L,0P00012P9R,0P00012P9X,0P00012PA3,0P00012PA9,0P00012PAF,0P00012PAL,0P00012PBT,0P00012PCU,0P00012PD0,0P00012PD5,0P00012PDC,0P00012PDI,0P00012PDN,0P00012PDT,0P00012PDZ,0P00012PE6,0P00012PEC,0P00012PEI,0P00012PEO,0P00012PEU,0P00012PF0,0P00012PF5,0P00012PFH,0P00012PFN,0P00012PFZ,0P00012PG5,0P00012PGB,0P00012PGH,0P00012PGN,0P00012PGT,0P00012PGZ,0P00012PH5,0P00012PHB,0P00012PHH,0P00012PHN/realtime-603-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-27-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v2/search/securities-22-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-613-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-2-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00007NYP/realtime-589-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-9-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v1/search/articles-12-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/search/securities-576-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P000171MJ/realtime-606-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=21&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=19329-19-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000AGZF/realtime-607-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/collect-25-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00009WEM/realtime-577-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Daapl&ea=open&el=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=446747056&gjid=1942753410&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2107331130-7-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=23&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Damzn&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20amzn%20%7C%20Morningstar&en=page_view&_et=12817-26-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/collect-29-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/search/securities-565-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00012PHT,0P00012PHZ,0P00012PI6,0P00012PIC,0P00015BGY,0P0000006A,0P0000029A,0P0000013F,0P000000GY,0P0001LI7Z,0P00011H0G,0P000000OZ,0P000000PA,0P000003RE/realtime-604-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-597-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v1/search/articles-23-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000X7UP/realtime-569-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P00014L0S/realtime-608-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=27&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=12421-36-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/ads/ga-audiences-20-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/0P000000GY/realtime-566-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-17-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/search/securities-584-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00016YML/realtime-590-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-599-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000F0/realtime-588-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000000B7/realtime-587-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BPWO/realtime-572-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=17&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=10355-15-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B9VF/realtime-610-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000BEYH/realtime-583-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/movers-574-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v2/search/securities-24-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0001P7KW/realtime-568-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/by-id-602-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00011HZW/realtime-571-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/ads/ga-audiences-37-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-612-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Dadobe&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20adobe%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Dadobe&ea=open&el=Search%20Results%20for%20adobe%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=1360986001&gjid=423766467&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=2145668508-35-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v2/search/securities-34-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&_gaz=1&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=15&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Daapl&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20aapl%20%7C%20Morningstar&en=page_view&_et=47609-8-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v1/search/entities-10-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%3Fquery%3Daapl&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Search%20Results%20for%20aapl%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%3Fquery%3Daapl&ea=open&el=Search%20Results%20for%20aapl%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=893438446&gjid=116875075&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=810560450-14-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0001L1P7/realtime-609-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000005M/realtime-605-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P00017M6Y/realtime-581-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/movers-595-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-601-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v1/search/entities-21-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-573-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-28-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322R/realtime-579-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v2/search/securities-32-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001322T/realtime-580-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v2/search/securities-13-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/securities/0P0000B12F/realtime-611-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v1/search/entities-31-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/ads/ga-audiences-16-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/api/v1/search/articles-1-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-596-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See All Results/api/v2/search/securities-11-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/68.3.CC0Y,68.3.KC0Y,80.3.CT0Y,64.3.@ZC0Y,64.3.@ZS0Y,64.3.@ZM0Y,64.3.@ZL0Y,64.3.@ZW0Y,68.3.SB0Y,67.3.@CL0Y,156.3.BRN0Y,67.3.@RB0Y,67.3.@NG0Y,67.3.@HO0Y,77.3.@LE0Y,77.3.@GF0Y,77.3.@HE0Y,66.3.@GC0Y,66.3.@SI0Y,66.3.@HG0Y,67.3.@PL0Y/realtime-594-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "ADOBE/api/v2/search/securities-598-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P000151KD/realtime-582-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/search/securities-564-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/search/securities-575-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0000002C/realtime-591-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/0P0000BQNK/realtime-567-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/securities/0P0001ACT3/realtime-578-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/g/collect?v=2&tid=G-LEPHTTYQEC&gtm=2oe8m0&_p=1386799089&cid=1018682416.1660840984&ul=en-us&sr=1920x1080&_z=ccd.v9B&_s=25&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Dadobe&dr=https%3A%2F%2Fresearch-preview.morningstar.com%2Fmarkets&sid=1661276073&sct=3&seg=1&dt=Articles%20and%20Videos%20Search%20for%20adobe%20%7C%20Morningstar&en=page_view&_et=14429-30-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AMZN/api/v2/search/securities-585-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "AAPL/api/v2/securities/0P00007NXM/realtime-570-success", "isController": false}, {"data": [[1.66147062E12, 0.016666666666666666]], "isOverall": false, "label": "See Articles and Videos/j/collect?v=1&_v=j96&a=1386799089&t=event&ni=0&_s=1&dl=https%3A%2F%2Fresearch-preview.morningstar.com%2Fsearch%2Farticles%3Fquery%3Damzn&dr=https%3A%2F%2Fmorningstar.okta.com%2F&ul=en-us&de=UTF-8&dt=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&sd=30-bit&sr=1920x1080&vp=1028x890&je=0&ec=%2Fsearch%2Farticles%3Fquery%3Damzn&ea=open&el=Articles%20and%20Videos%20Search%20for%20amzn%20%7C%20Morningstar&_u=SACAAEABAAAAAC~&jid=838644795&gjid=1955033213&cid=1018682416.1660840984&tid=UA-217690896-1&_gid=1825844950.1661272309&_r=1&gtm=2wg8m053GZMMT&cd3=EQ&cd4=0000-0000-0000-0000&cd5=00000000&cd6=Internal&cd7=morningstar&cd8=MOR&z=979160708-18-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66147062E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.3666666666666667, "minX": 1.66147062E12, "maxY": 1.3666666666666667, "series": [{"data": [[1.66147062E12, 1.3666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66147062E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -18000000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
