const TabRouter = require("../src/server/index");
describe("req测试", () => {
    const app = new TabRouter({
        callback: function() {},
        event: { userInfo: "xxxx", data: { test: 123, url: "/xx" } }
    });
    test("req", () => {
        expect(app._req).toHaveProperty("event", {
            userInfo: "xxxx",
            data: { test: 123, url: "/xx" }
        });
        expect(app._req).toHaveProperty("data", { test: 123, url: "/xx" });
        expect(app._req).toHaveProperty("url", "/xx");
    });
});

describe("use方法测试", () => {
    const app = new TabRouter({
        callback: function() {},
        event: { userInfo: "xxxx", data: { test: 123, url: "/xx" } }
    });
    test("use传入函数只有一个参数的情况", () => {
        app.use((req, res) => {});
        expect(app._middlewares[0]).toHaveProperty("handle");
        expect(app._middlewares[0]).toHaveProperty("path", "*");
        expect(app._middlewares[0]).toHaveProperty("method", "middleware");
    });
    test("use传入函数有两个参数的情况", () => {
        app.use("test", (req, res) => {});
        expect(app._middlewares[1]).toHaveProperty("handle");
        expect(app._middlewares[1]).toHaveProperty("path", "test");
        expect(app._middlewares[1]).toHaveProperty("method", "middleware");
    });
});
describe("receive方法测试", () => {
    const app = new TabRouter({
        callback: function() {},
        event: { userInfo: "xxxx", data: { test: 123, url: "/xx" } }
    });
    test("receive测试传入函数只有一个参数的情况", () => {
        app.receive((req, res) => {});
        expect(app._middlewares[0]).toHaveProperty("handle");
        expect(app._middlewares[0]).toHaveProperty("path", "*");
        expect(app._middlewares[0]).toHaveProperty("method", "receive");
    });
    test("receive传入函数有两个参数的情况", () => {
        app.receive("test", (req, res) => {});
        expect(app._middlewares[1]).toHaveProperty("handle");
        expect(app._middlewares[1]).toHaveProperty("path", "test");
        expect(app._middlewares[1]).toHaveProperty("method", "receive");
    });
});
describe("apply方法测试", () => {
    const customCallback = (err, data) => {
        return data;
    };
    const app = new TabRouter({
        callback: customCallback,
        event: { userInfo: "xxxx", data: { test: 123, url: "/xx" } }
    });
});
