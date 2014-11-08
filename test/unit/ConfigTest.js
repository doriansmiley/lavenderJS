'use strict';

/* jasmine specs for controllers go here */
describe('SPISDK Lists', function() {

  describe('Lavender.Config', function(){

    it('should test default confid values', function() {
        var config = new Lavender.Config();
        config.username = 'test user name';
        config.pwd = 'test pwd';
        config.context = 'test context';
        config.ruleCode = 'test rule code';
        config.daoCode = 'test dao code';
        config.parserCode = 'test parser code';
        config.eventDispatcherCode = 'jquery';
        config.baseUrl = 'http://devsql1.silpub.com/';//String
        config.sessionId = '12345678';//String
        config.instanceId = 'test instance id';//String
        config.templateId = 'test template id';//String
        config.owner = 'test owner';//String
        config.variableData = 'test varaible data';//String
        config.fontImagesBaseUrl = 'http://fontImageURL.com';//String
        config.globalFontMapPath = '/fonts/';//String
        config.maxNumOfUploads = 5;//Number
        config.showGalleryForNewImage = false;//Boolean
        config.galleryItemsPerPage = 10;//Number
        config.zoomMin = 15;//Number
        config.zoomMax = 20;//Number
        config.zoomIncrement = 25;//Number
        config.fontSizeOptions = new Lavender.ArrayList();//ArrayList
        config.lazyLoadLayouts = false;//Boolean
        config.loadLayoutSnapshots = false;//Boolean
        config.placeholderImageScaleType = 'proportional';//String
        config.placeholderImageAssetID = '12345';//String
        config.placeholderImageAsset = new Lavender.ImageAsset();//LibraryAsset
        config.canContainPanels = true;//Boolean
        config.realtimePreviewUpdate = false;//Boolean
        config.showPagePreview = false;//Boolean
        config.show3D = false;//Boolean
        config.httpServiceCode = 'angular';
        config.useLocalHostProxy = true;
        config.cacheServiceResults = true;
        config.snapshotOutputFormat = 'sml';
        config.customColorPaletteSize = 5;
        config.recentColorPaletteSize = 10;
        config.selectionManager = 'multiSelect';
        config.fontBaseUrl = 'fonts/pdc/';
        config.webRoot = '/main/';
        var resetLayoutNumber = config.getURL('resetLayoutNumber');
        var uploadAssetURL = config.getURL('uploadAssetURL');
        var absoluteURLTest = config.getAbsoluteURL('resetLayoutNumber');
        var urlWithParams = config.getURLWithParams('resetLayoutNumber', ['123456789',1]);
        var absoluteUrlWithParams = config.getAbsoluteURLWithParams('resetLayoutNumber', ['123456789',1]);
        var thirdPartyProxyURL = config.getExternalApiProxyUrl('http://pdc:design@dev.flyerlink.com/silicon_api.php/SDSession/'+ config.sessionId +'/font/action/info');
        expect(config.webRoot).toBe('/main/');
        expect(config.fontBaseUrl).toBe('fonts/pdc/');
        expect(config.selectionManager).toBe('multiSelect');
        expect(config.customColorPaletteSize).toBe(5);
        expect(config.recentColorPaletteSize).toBe(10);
        expect(resetLayoutNumber).toBe('/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/sdsession/12345678/instance/{0}/layoutNumber/{1}/action/reset');
        expect(uploadAssetURL).toBe('/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/sdsession/12345678/imageasset/action/upload');
        expect(urlWithParams).toBe('/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/sdsession/12345678/instance/123456789/layoutNumber/1/action/reset');
        expect(absoluteUrlWithParams).toBe('http://devsql1.silpub.com/sdsession/12345678/instance/123456789/layoutNumber/1/action/reset');
        expect(thirdPartyProxyURL).toBe('/local/demo/refapp/php/Proxy.php?url=http://pdc:design@dev.flyerlink.com/silicon_api.php/SDSession/12345678/font/action/info');
        expect(config.username).toBe('test user name');
        expect(config.pwd).toBe('test pwd');
        expect(config.context).toBe('test context');
        expect(config.ruleCode).toBe('test rule code');
        expect(config.daoCode).toBe('test dao code');
        expect(config.parserCode).toBe('test parser code');
        expect(config.eventDispatcherCode).toBe('jquery');
        expect(config.baseUrl).toBe('http://devsql1.silpub.com/');
        expect(config.sessionId).toBe('12345678');
        expect(config.instanceId).toBe('test instance id');
        expect(config.templateId).toBe('test template id');
        expect(config.owner).toBe('test owner');
        expect(config.variableData).toBe('test varaible data');
        expect(config.fontImagesBaseUrl).toBe('http://fontImageURL.com');
        expect(config.globalFontMapPath).toBe('/fonts/');
        expect(config.maxNumOfUploads).toBe(5);
        expect(config.showGalleryForNewImage).toBe(false);
        expect(config.galleryItemsPerPage).toBe(10);
        expect(config.zoomMin).toBe(15);
        expect(config.zoomMax).toBe(20);
        expect(config.zoomIncrement).toBe(25);
        expect(config.fontSizeOptions).toBeDefined();
        expect(config.canContainPanels).toBe(true);
        expect(config.realtimePreviewUpdate).toBe(false);
        expect(config.showPagePreview).toBe(false);
        expect(config.show3D).toBe(false);
        expect(config.httpServiceCode).toBe('angular');
        expect(config.useLocalHostProxy).toBe(true);
        expect(config.cacheServiceResults).toBe(true);
        expect(config.snapshotOutputFormat).toBe('sml');
    });

  });
});
