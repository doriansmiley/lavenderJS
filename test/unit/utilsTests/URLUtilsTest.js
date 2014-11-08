/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('URLUtilsTest ', function () {

    it('check Lavender.URLUtils function and values', function () {
        var config = new Lavender.Config();
        config.baseUrl = 'http://devsql1.silpub.com/';//String
        config.sessionId = '12345678';//String
        Lavender.init( config );

        var asset = new Lavender.Asset();
        asset.type = 'image';//String
        asset.uid = '1234';//String
        asset.fileName = 'test file name';//String
        asset.name = 'test name';//String
        asset.categories = new Lavender.ArrayList ();
        asset.printFileName = 'test print file name';//String
        asset.printFileType = 'test print file type';//String
        asset.printFilePart = 'test print file part';//String
        asset.printFileCrop = 'test print file crop';//String
        asset.printFileVisibleLayerList = 'test layers';//String
        asset.uriPath = 'http://test.com';//String//this is used by Silicon Connector for remote asset reso
        asset.thumbnailFilename = 'test thumb file name';//String
        asset.source = 'test source';//String

        var testAssetURL = Lavender.URLUtils.getImageAssetURL(asset, 'filter1');
        expect( testAssetURL ).toBe('http://devsql1.silpub.com/sdsession/12345678/ImageAsset/1234/output/weblink/filter/filter1');
        testAssetURL = Lavender.URLUtils.getImageAssetURL(asset);
        expect( testAssetURL ).toBe('http://devsql1.silpub.com/sdsession/12345678/ImageAsset/1234/output/weblink');

        testAssetURL = Lavender.URLUtils.getImageThumbAssetURL(asset, 'filter1');
        expect( testAssetURL ).toBe('http://devsql1.silpub.com/sdsession/12345678/ImageAsset/1234/output/thumbnail/filter/filter1');
        testAssetURL = Lavender.URLUtils.getImageThumbAssetURL(asset);
        expect( testAssetURL ).toBe('http://devsql1.silpub.com/sdsession/12345678/ImageAsset/1234/output/thumbnail');

        var fontGroup = new Lavender.FontGroup();
        var font1 = new Lavender.FontVariant();
        font1.id = 'font1';
        font1.fontFamily = 'Arial';
        font1.fontWeight = 'normal';
        font1.fontStyle = 'normal';
        fontGroup.variants.addItem(font1);
        testAssetURL = Lavender.URLUtils.getFontImageURL(fontGroup);
        expect( testAssetURL ).toBe('http://devsql1.silpub.com/sdsession/12345678/fontImages/font1.png');

        testAssetURL = Lavender.URLUtils.getTemplateThumbnailURL('small', '12345678910');
        expect( testAssetURL ).toBe('http://devsql1.silpub.com/sdsession/12345678/template/12345678910/output/small');

        var testLocation = 'http://somedomain.com?templateId=1234-34546-456777&sessionId=988734-59783-93453478993&instanceId=23458745-45873-3459374587';
        //location, key, defaultValue
        var templateId = Lavender.URLUtils.getQuerystring(testLocation, 'templateId');
        expect( templateId ).toBe('1234-34546-456777');
        var sessionId = Lavender.URLUtils.getQuerystring(testLocation, 'sessionId');
        expect( sessionId ).toBe('988734-59783-93453478993');
        var instanceId = Lavender.URLUtils.getQuerystring(testLocation, 'instanceId');
        expect( instanceId ).toBe('23458745-45873-3459374587');
    });
});
