"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Please add a title field"],
    },
    description: {
        type: String,
        required: [true, "Please add a description field"],
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Blog", blogSchema);
//# sourceMappingURL=blogModel.js.map