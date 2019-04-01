const {timestampToDate} = require('../utils/utils.js');
const {expect} = require('chai');

describe.only('timestampToDate', () => {
  it('takes an object with a date format property when given an object with a timestamp format property', () => {
    const input = {id: 1, timestamp: 1542284514171};
    const output = {id: 1 date: 2018-11-15T12:21:54.171Z};
    expect(timestampToDate(input)).to.eql(output);
  });
});