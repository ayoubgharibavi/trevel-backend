"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Charter118Module = void 0;
const common_1 = require("@nestjs/common");
const charter118_controller_1 = require("./charter118.controller");
const charter118_service_1 = require("./charter118.service");
let Charter118Module = class Charter118Module {
};
exports.Charter118Module = Charter118Module;
exports.Charter118Module = Charter118Module = __decorate([
    (0, common_1.Module)({
        controllers: [charter118_controller_1.Charter118Controller],
        providers: [charter118_service_1.Charter118Service],
        exports: [charter118_service_1.Charter118Service],
    })
], Charter118Module);
//# sourceMappingURL=charter118.module.js.map