"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DiferencialCardComponent = void 0;
var core_1 = require("@angular/core");
var DiferencialCardComponent = /** @class */ (function () {
    function DiferencialCardComponent() {
        this.classes = 'br5 borda-cinza ma8 pa16';
        this.diferenciaisProduto = [];
        this.selecionado = false;
    }
    DiferencialCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selecionado = this.diferenciaisProduto.some(function (x) { var _a; return x.diferencialId == ((_a = _this.diferencial) === null || _a === void 0 ? void 0 : _a.id); });
    };
    __decorate([
        core_1.HostBinding('class')
    ], DiferencialCardComponent.prototype, "classes");
    __decorate([
        core_1.Input()
    ], DiferencialCardComponent.prototype, "diferencial");
    __decorate([
        core_1.Input()
    ], DiferencialCardComponent.prototype, "diferenciaisProduto");
    DiferencialCardComponent = __decorate([
        core_1.Component({
            selector: 'app-diferencial-card',
            templateUrl: './diferencial-card.component.html',
            styleUrls: ['./diferencial-card.component.css']
        })
    ], DiferencialCardComponent);
    return DiferencialCardComponent;
}());
exports.DiferencialCardComponent = DiferencialCardComponent;
