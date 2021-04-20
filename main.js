(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ivanstanevich/Documents/dev/d3-stacked-status-timeline/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "KYvB":
/*!******************************************************!*\
  !*** ./src/app/d3-status-timeline/timeline-chart.ts ***!
  \******************************************************/
/*! exports provided: TimelineChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineChart", function() { return TimelineChart; });
/* harmony import */ var _history_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./history-item */ "RTl/");
/* harmony import */ var d3_axis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-axis */ "RhHs");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-scale */ "ziQ1");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-selection */ "/TIM");
/* harmony import */ var d3_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-time */ "tgfz");
/* harmony import */ var _item_status__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./item-status */ "Ycjv");






class TimelineChart {
    constructor(config) {
        this.config = config;
    }
    draw(chartContainerCSS, data, startDate, endDate) {
        const groups = this.groupHistoryBySource(data);
        const systemNames = Array.from(groups.keys());
        const numberOfSystem = systemNames.length;
        // drawing root svg
        const chartHeight = (numberOfSystem + 1) * this.config.rowHeight + // we are adding 1 to numberOfSystems just to make height a little bit more
            (numberOfSystem + 2) * this.config.rowPadding;
        //TODO: might be calculated dynamically based on input data
        const svg = d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"](chartContainerCSS)
            .append('svg')
            .attr('width', this.config.width)
            .attr('height', chartHeight);
        //TODO: approach to calculate text width should be improved to work with long texts
        const maxSystemNameLength = systemNames
            .map((value) => value.length)
            .reduce((previous, current) => (current > previous ? current : previous));
        // drawing scales
        const xScale = d3_scale__WEBPACK_IMPORTED_MODULE_2__["scaleTime"]()
            .domain([startDate, endDate])
            .range([0, this.config.width]);
        const yScale = d3_scale__WEBPACK_IMPORTED_MODULE_2__["scaleBand"]()
            .domain(systemNames)
            .range([
            0,
            numberOfSystem * this.config.rowHeight +
                (numberOfSystem + 2) * this.config.rowPadding,
        ]);
        const root = svg.append('g');
        const chartArea = root
            .append('g')
            .attr('transform', `translate(${maxSystemNameLength * this.config.fontSize}, 0)`);
        // X axis building
        const numberOfTimeTicks = this.getNumberOfTimeTicks(startDate, endDate, this.config.tickIntervalMins);
        const topAxis = d3_axis__WEBPACK_IMPORTED_MODULE_1__["axisBottom"](xScale)
            .ticks(numberOfTimeTicks)
            .tickSize(this.config.tickSize)
            .tickPadding(this.config.tickPadding);
        //TODO: need to find way to move these into css
        chartArea
            .append('g')
            .attr('class', 'top-axis')
            .style('font', `${this.config.fontSize}px ${this.config.font}`)
            .style('color', `${this.config.tickColor}`)
            .call(topAxis);
        // Y axis building
        const topAxisHeight = d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"]('.top-axis')
            .node().getBoundingClientRect().height;
        const leftAxis = d3_axis__WEBPACK_IMPORTED_MODULE_1__["axisRight"](yScale)
            .tickSize(this.config.tickSize)
            .tickPadding(this.config.tickPadding);
        root
            .append('g')
            .attr('transform', `translate(0, ${topAxisHeight})`)
            .style('font', `${this.config.fontSize}px ${this.config.font}`)
            .style('color', `${this.config.tickColor}`)
            .attr('class', 'left-axis')
            .call(leftAxis);
        // building chart
        let systemIndex = 0;
        groups.forEach((history, source) => {
            const row = chartArea
                .append('g')
                .attr('transform', `translate(0,${topAxisHeight + this.config.rowPadding})`);
            const points = this.getTransitionPoints(source, history, startDate, endDate);
            this.addRow(this.config, row, points, systemIndex, xScale, endDate);
            systemIndex++;
        });
    }
    addRow(config, row, points, systemIndex, xScale, endDate) {
        row
            .selectAll('rect')
            .data(points)
            .enter()
            .append('rect')
            .attr('id', 'rect')
            .attr('x', (d, i) => {
            return xScale(d.dateTime);
        })
            .attr('y', (d, i) => {
            return (config.rowPadding +
                (config.rowHeight + config.rowPadding) * systemIndex);
        })
            .attr('width', (d, i) => {
            if (points.length - 1 === i) {
                return xScale(endDate) - xScale(d.dateTime);
            }
            else {
                return xScale(points[i + 1].dateTime);
            }
        })
            .attr('height', config.rowHeight)
            .attr('title', (d, i) => {
            return d.dateTime.toString();
        })
            .attr('fill', (d) => {
            return d.status.color;
        })
            .attr('opacity', '1')
            .on('click', (d, i) => {
            this.config.onClickRect(d);
        });
    }
    getNumberOfTimeTicks(startDate, endDate, intervalMins) {
        return d3_time__WEBPACK_IMPORTED_MODULE_4__["timeMinutes"](startDate, endDate, intervalMins).length;
    }
    groupHistoryBySource(history) {
        const groups = new Map();
        history.forEach((item) => {
            if (groups.has(item.source)) {
                groups.get(item.source).push(item);
            }
            else {
                groups.set(item.source, [item]);
            }
        });
        return groups;
    }
    getTransitionPoints(source, sourceHistory, startDate, endDate) {
        const points = [];
        let currentStatus = _item_status__WEBPACK_IMPORTED_MODULE_5__["statuses"].UNDEFINED;
        for (const point of sourceHistory) {
            if (point.dateTime >= endDate) {
                break;
            }
            if (point.dateTime >= startDate && point.status !== currentStatus) {
                points.push(point);
                currentStatus = point.status;
            }
        }
        if (points[0].dateTime !== startDate) {
            const item = new _history_item__WEBPACK_IMPORTED_MODULE_0__["HistoryItem"]();
            item.source = source;
            item.dateTime = startDate;
            item.status = _item_status__WEBPACK_IMPORTED_MODULE_5__["statuses"].UNDEFINED;
            points.unshift(item);
        }
        return points;
    }
}


/***/ }),

/***/ "RTl/":
/*!****************************************************!*\
  !*** ./src/app/d3-status-timeline/history-item.ts ***!
  \****************************************************/
/*! exports provided: HistoryItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryItem", function() { return HistoryItem; });
class HistoryItem {
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./d3-status-timeline/item-status */ "Ycjv");
/* harmony import */ var _d3_status_timeline_timeline_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./d3-status-timeline/timeline-chart */ "KYvB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class AppComponent {
    constructor() { }
    ngOnInit() {
        const configuration = {
            width: 1000,
            fontSize: 12,
            font: 'calibri',
            rowHeight: 40,
            rowPadding: 2,
            tickSize: 10,
            tickPadding: 2.5,
            tickColor: '#808181',
            tickIntervalMins: 60,
            onClickRect: (item) => this.clickOnRect(item),
        };
        const timelineChart = new _d3_status_timeline_timeline_chart__WEBPACK_IMPORTED_MODULE_1__["TimelineChart"](configuration);
        timelineChart.draw('#chart-timeline', history, new Date(2021, 4, 9, 0, 0), new Date(2021, 4, 10, 3, 0));
    }
    clickOnRect(item) {
        console.log('Click by: ' + `${item.source}::${item.status.name}::${item.dateTime}`);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, consts: [["id", "chart-timeline"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Status timeline");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "div", 0);
    } }, styles: ["h2[_ngcontent-%COMP%]{\n    color: slategrey;\n    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLDZFQUE2RTtBQUNqRiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImgye1xuICAgIGNvbG9yOiBzbGF0ZWdyZXk7XG4gICAgZm9udC1mYW1pbHk6ICdHaWxsIFNhbnMnLCAnR2lsbCBTYW5zIE1UJywgQ2FsaWJyaSwgJ1RyZWJ1Y2hldCBNUycsIHNhbnMtc2VyaWY7XG59XG4iXX0= */"] });
const history = [
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 10, 0),
    },
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 0),
    },
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 30),
    },
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 12, 0),
    },
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 13, 0),
    },
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 14, 0),
    },
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 15, 0),
    },
    {
        source: 'System 1',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 10, 15, 0),
    },
    // system 2
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 2, 0),
    },
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 7, 0),
    },
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 30),
    },
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 14, 0),
    },
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 18, 0),
    },
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 22, 0),
    },
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 23, 0),
    },
    {
        source: 'System 2',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 10, 15, 0),
    },
    // system 3
    {
        source: 'System 3',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 2, 0),
    },
    {
        source: 'System 3',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 7, 0),
    },
    {
        source: 'System 3',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 14, 0),
    },
    {
        source: 'System 3',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 22, 0),
    },
    {
        source: 'System 3',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 23, 0),
    },
    // System 4
    {
        source: 'System 4',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 2, 0),
    },
    {
        source: 'System 4',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 7, 0),
    },
    {
        source: 'System 4',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 14, 0),
    },
    {
        source: 'System 4',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 22, 0),
    },
    {
        source: 'System 4',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 23, 0),
    },
    // System 5
    {
        source: 'System 5',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 2, 0),
    },
    {
        source: 'System 5',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 7, 0),
    },
    {
        source: 'System 5',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 14, 0),
    },
    {
        source: 'System 5',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 22, 0),
    },
    {
        source: 'System 5',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 23, 0),
    },
    // System 6
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 2, 30),
    },
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 7, 0),
    },
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 30),
    },
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 14, 30),
    },
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 18, 0),
    },
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 22, 0),
    },
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 23, 0),
    },
    {
        source: 'System 6',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 10, 15, 0),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 10, 30),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 30),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 30),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 12, 0),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 13, 0),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 14, 0),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 15, 30),
    },
    {
        source: 'System 7',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 10, 15, 30),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 8, 15),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 30),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].BLUE,
        dateTime: new Date(2021, 4, 9, 11, 30),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 10, 0),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 9, 13, 0),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 11, 0),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].RED,
        dateTime: new Date(2021, 4, 9, 15, 30),
    },
    {
        source: 'System 8',
        status: _d3_status_timeline_item_status__WEBPACK_IMPORTED_MODULE_0__["statuses"].GREEN,
        dateTime: new Date(2021, 4, 10, 12, 30),
    },
];


/***/ }),

/***/ "Ycjv":
/*!***************************************************!*\
  !*** ./src/app/d3-status-timeline/item-status.ts ***!
  \***************************************************/
/*! exports provided: ItemStatus, statuses */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemStatus", function() { return ItemStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statuses", function() { return statuses; });
class ItemStatus {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}
const statuses = {
    BLUE: new ItemStatus('BLUE', '#AED6F1'),
    GREEN: new ItemStatus('GREEN', '#A3E4D7'),
    RED: new ItemStatus('RED', '#F1948A'),
    UNDEFINED: new ItemStatus('UNDEFINED', '#D5DBDB'),
};


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map