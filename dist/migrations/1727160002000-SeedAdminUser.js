"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedAdminUser1727160002000 = void 0;
const bcrypt = __importStar(require("bcrypt"));
class SeedAdminUser1727160002000 {
    constructor() {
        this.name = 'SeedAdminUser1727160002000';
    }
    async up(queryRunner) {
        const email = 'developeressaehaan@gmail.com';
        const name = 'Essa Ehaan';
        const rawPassword = 'essa@321@';
        const existing = await queryRunner.query(`SELECT id FROM "users" WHERE email = $1`, [email]);
        if (existing.length === 0) {
            const hash = await bcrypt.hash(rawPassword, 10);
            await queryRunner.query(`INSERT INTO "users" ("name", "email", "password", "role") VALUES ($1, $2, $3, $4)`, [name, email, hash, 'admin']);
        }
    }
    async down(queryRunner) {
        const email = 'developeressaehaan@gmail.com';
        await queryRunner.query(`DELETE FROM "users" WHERE email = $1`, [email]);
    }
}
exports.SeedAdminUser1727160002000 = SeedAdminUser1727160002000;
//# sourceMappingURL=1727160002000-SeedAdminUser.js.map