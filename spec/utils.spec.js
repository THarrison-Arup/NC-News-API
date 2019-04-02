const { timestampToDate } = require("../utils/utils.js");
const { expect } = require("chai");

describe.only("timestampToDate", () => {
  it("returns a new array of date objects, when passed an array of 1 object", () => {
    expect(timestampToDate([{ a: 1 }])).to.eql([{ a: 1 }]);
  });
  it("returns a new array of date objects, when passed an array of objects", () => {
    expect(timestampToDate([{ a: 1 }, {b: 2}, {c: 3}])).to.eql([{ a: 1 }, {b: 2}, {c: 3}]);
  });
  it("iterates over an array of objects and returns a new array of objects", () => {
    expect(timestampToDate([{ a: 1 }, {b: 2}, {c: 3}])).to.eql([{ a: 1 }, {b: 2}, {c: 3}]);
  });
  it.only("iterates over an array of timestamp objects and returns a new array of date objects", () => {
    const input = [{id: 1, timestamp: 1542284514171}];
    let newDate = new Date(input[0].timestamp);
    const output = [{id: 1, date: newDate}];
    expect(timestampToDate(input)).to.eql(output);
  });
});
