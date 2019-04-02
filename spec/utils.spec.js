const {
  timestampToDate,
  commentsData,
  createArticleIdRef
} = require("../utils/utils.js");
const { expect } = require("chai");

describe("timestampToDate()", () => {
  it("returns a new array of date objects, when passed an array of 1 object", () => {
    expect(timestampToDate([{ a: 1 }])).to.eql([{ a: 1 }]);
  });
  it("returns a new array of date objects, when passed an array of objects", () => {
    expect(timestampToDate([{ a: 1 }, { b: 2 }, { c: 3 }])).to.eql([
      { a: 1 },
      { b: 2 },
      { c: 3 }
    ]);
  });
  it("iterates over an array of objects and returns a new array of objects", () => {
    expect(timestampToDate([{ a: 1 }, { b: 2 }, { c: 3 }])).to.eql([
      { a: 1 },
      { b: 2 },
      { c: 3 }
    ]);
  });
  it("iterates over an array of timestamp objects and returns a new array of date objects", () => {
    const input = [{ id: 1, timestamp: 1542284514171 }];
    let newDate = new Date(input[0].timestamp);
    const output = [{ id: 1, date: newDate }];
    expect(timestampToDate(input)).to.eql(output);
  });
});

describe("commentsArticleId()", () => {
  it("iterates over an array of objects and returns a new array mapping the belongs_to property to title", () => {
    const input = [
      {
        id: 1,
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge"
      }
    ];
    const output = [
      {
        id: 1,
        title: "They're not exactly dogs, are they?",
        author: "butter_bridge"
      }
    ];
    expect(commentsData(input)).to.eql(output);
  });
});

describe("createArticleIdRef()", () => {
  it("returns an reference object of articles, containing the article title and article_id, when passed an array of objects", () => {
    const input = [
      { article_id: 1, author: "tom", title: "Living in the shadow of a great man" },
      { article_id: 2, author: "dave", title: "They're not exactly dogs, are they?" },
      { article_id: 3, author: "james", title: "Sony Vaio; or, The Laptop" }
    ];
    const output = {
      "Living in the shadow of a great man": 1,
      "They're not exactly dogs, are they?": 2,
      "Sony Vaio; or, The Laptop": 3
    };
    expect(createArticleIdRef(input)).to.eql(output);
  });
});
