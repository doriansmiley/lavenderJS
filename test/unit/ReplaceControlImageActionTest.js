/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ReplaceControlImageActionTest ', function () {

    it('check ReplaceControlImageAction function and values', function () {
        var createImagePageItem = function(){
            var imageAsset = new Lavender.ImageAsset();
            var asset = new Lavender.Asset();
            asset.uid = '3c3fe473-142c-4ac8-ab9a-2e889cd23563';
            asset.type = Lavender.Asset.IMAGE_ASSET;
            asset.url = "http://domain.com/abc123";
            imageAsset.asset = asset;

            // Image
            var imagePageItemBlock = new Lavender.PageItemBlock();
            var imageFrame = new Lavender.Frame();
            imageFrame.left = 100;
            imageFrame.top = 50;
            imageFrame.width = 200;
            imageFrame.height = 150;
            imageFrame.rotation = 30;

            var image = new Lavender.ImagePageItem();
            image.type = "Rectangle";
            image.id = "image";
            image.zIndex = 1;
            image.frame = imageFrame;
            image.imageId = imageAsset.asset.uid;
            image.left = 70;
            image.top = 30;
            image.width = 300;
            image.height = 300;
            image.rotation = 30;
            image.asset = imageAsset;
            image.pageItemBlock = imagePageItemBlock;
            var mask = new Lavender.Path();
            mask.data = "M 110 60 L 280 60 L 280 180 L 110 180 L 110 60 Z ";
            image.mask = mask;

            return image;
        };

        var pageItem = createImagePageItem();

        Lavender.init( Lavender.ModelLocator.getInstance().config );

        var imageControl = new Lavender.ImageControl();
        imageControl.operationModel = Lavender.Model.asyncOperationModel;
        imageControl.config = Lavender.Model.config;
        imageControl.pageItem = pageItem;

        //simulate replacement
        var imageAsset = new Lavender.ImageAsset();
        var asset = new Lavender.Asset();
        asset.uid = '4444444-142c-4ac8-ab9a-2e889cd1234';
        asset.type = Lavender.Asset.IMAGE_ASSET;
        asset.url = "http://domain.com/abc123";
        imageAsset.asset = asset;

        var instance = new Lavender.TemplateInstance('1234');
        var abstractAction = new Lavender.ReplaceControlImageAction( imageControl, imageAsset, instance  );

        expect(abstractAction.control).toBeDefined();
        expect(abstractAction.asset).toBeDefined();

        abstractAction.execute();

        expect(imageControl.pageItem.asset.asset.uid ).toBe('4444444-142c-4ac8-ab9a-2e889cd1234');
    });
});
