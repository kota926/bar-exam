"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Choice = void 0;
const typeorm_1 = require("typeorm");
const Question_1 = require("./Question");
let Choice = class Choice {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar", { length: 10 }),
    __metadata("design:type", String)
], Choice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 8 }),
    __metadata("design:type", String)
], Choice.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Choice.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Choice.prototype, "c_num", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 2 }),
    __metadata("design:type", String)
], Choice.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 1 }),
    __metadata("design:type", String)
], Choice.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Choice.prototype, "c1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "text" }),
    __metadata("design:type", String)
], Choice.prototype, "c2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Question_1.Question, question => question.choices),
    __metadata("design:type", Question_1.Question)
], Choice.prototype, "question", void 0);
Choice = __decorate([
    (0, typeorm_1.Entity)()
], Choice);
exports.Choice = Choice;
//# sourceMappingURL=Choice.js.map