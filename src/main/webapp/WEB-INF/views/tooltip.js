  //tooltip
        var highlighted = null;
        var highlightObject = function (obj) {
            if (obj) {
                if (obj !== highlighted) {
                    var objIndex = obj.index;
                    var depends = [objIndex];
                    graph.links.forEach(function (lkItem) {
                        if (objIndex == lkItem['source']['index']) {
                            depends = depends.concat([lkItem.target.index])
                        } else if (objIndex == lkItem['target']['index']) {
                            depends = depends.concat([lkItem.source.index])
                        }
                    });
                    node.classed('inactive', function (d) {
                        return (depends.indexOf(d.index) == -1)
                    });
                    link.classed('inactive', function (d) {
                        return (obj !== d.source && obj !== d.target);
                    });
                }

                tooltip.html("<div class='title'>" + obj.serverName + "调用信息</div><table class='detail-info'><tr><td class='td-label'>connections:</td><td>" + obj.connections + "</td></tr></table>")
                    .style("left", (d3.event.pageX + 20) + "px")
                    .style("top", (d3.event.pageY - 20) + "px")
                    .style("opacity", 1.0);
                highlighted = obj;
            } else {
                if (highlighted) {
                    node.classed('inactive', false);
                    link.classed('inactive', false);
                }
                tooltip.style("opacity", 0.0);
                highlighted = null;
            }
        };

        var tooltip = d3.select("#graph").append("div")
            .attr("class", "tooltip")
            .attr("opacity", 0.0)
            .on('mouseover', function () {
                if (node.mouseoutTimeout) {
                    clearTimeout(node.mouseoutTimeout);
                    node.mouseoutTimeout = null;
                }
            })
            .on('mouseout', function () {
                if (node.mouseoutTimeout) {
                    clearTimeout(node.mouseoutTimeout);
                    node.mouseoutTimeout = null;
                }
                node.mouseoutTimeout = setTimeout(function () {
                    highlightObject(null);
                }, 300);
            });