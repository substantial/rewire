var expect = require("expect.js"),
    __set__ = require("../lib/__set__.js"),
    vm = require("vm");

describe("__reset__", function() {
    var moduleFake;

    beforeEach(function () {
        moduleFake = {
            module: {
                exports: {}
            },
            myValue: 0,    // copy by value
            myReference: {}       // copy by reference
        };

        vm.runInNewContext(
            //__set__ requires __set__ to be present on module.exports
            "__set__ = module.exports.__set__ = " + __set__.toString() + "; " +
            "getValue = function () { return myValue; }; " +
            "getReference = function () { return myReference; }; ",
            moduleFake
        );
    });

    it("should call all stored reset functions", function() {
        moduleFake.__set__("myValue", 2);
        moduleFake.__set__("myReference", { things: "stuff" } );

        expect(moduleFake.getValue()).to.be(2);
        expect(moduleFake.getReference()).to.be({ things: "stuff" });

        moduleFake.__reset__();

        expect(moduleFake.getValue()).to.be(0);
        expect(moduleFake.getReference()).to.be({});
    });
});
