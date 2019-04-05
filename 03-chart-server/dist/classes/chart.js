"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChartData {
    constructor() {
        this.months = ['January', 'February', 'March', 'April'];
        this.values = [1, 2, 3, 4];
    }
    getChartData() {
        return [
            { data: this.values, label: 'Viewings' }
        ];
    }
    incrementValue(month, value) {
        month = month.toLowerCase().trim();
        for (let i in this.months) {
            if (this.months[i] === month) {
                this.values[i] += value;
            }
        }
        return this.getChartData();
    }
}
exports.ChartData = ChartData;
