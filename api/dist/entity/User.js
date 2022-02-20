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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Constitution_1 = require("./Constitution");
const Government_1 = require("./Government");
const Civil_1 = require("./Civil");
const Company_1 = require("./Company");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, unique: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 8, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastSubject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 2, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "lastUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', width: 3, nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "lastNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "constitutionId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Constitution_1.Constitution, {
        cascade: ["remove"]
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Constitution_1.Constitution)
], User.prototype, "constitution", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "governmentId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Government_1.Government, {
        cascade: ["remove"]
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Government_1.Government)
], User.prototype, "government", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "civilId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Civil_1.Civil, {
        cascade: ["remove"]
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Civil_1.Civil)
], User.prototype, "civil", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Company_1.Company, {
        cascade: ["remove"]
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Company_1.Company)
], User.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp', precision: 0, default: () => 'NOW()' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map