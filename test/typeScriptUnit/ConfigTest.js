'use strict';

/* jasmine specs for controllers go here */
describe('SPISDK Lists', function() {

  describe('Lavender.Config', function(){

    it('should test default confid values', function() {
        var config = new Lavender.Config();
        config.baseUrl = 'http://devsql1.silpub.com/';//String
        config.webRoot = '/main/';
        config.parserCode = 'test parser code';
        config.exporterCode = 'test exporter code';

        expect(config.baseUrl).toBe('http://devsql1.silpub.com/');
        expect(config.webRoot).toBe('/main/');
        expect(config.parserCode).toBe('test parser code');
        expect(config.exporterCode).toBe('test exporter code');

    });

  });
});
