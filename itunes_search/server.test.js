const Util = require('./util/utilities');

const chai = require('chai');
const expect = chai.expect;

describe('#encode URI for fetch', function() {
    it('should correctly encode the URI query parameters', function() {
        const query = {
            q: 'look',
            type: "",
            key: "API",
            part: "snippet",
            maxResults: "10"
        }
        let expected = 'q=look&type=&key=API&part=snippet&maxResults=10';
        let actual = Util.encodeQueryData(query);
        expect(actual).to.equal(expected);
    });
});
