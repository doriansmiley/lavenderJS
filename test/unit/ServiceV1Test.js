/**
 * Created by dsmiley on 1/13/14.
 */
'use strict';

/* jasmine specs for controllers go here */
describe('ServiceV1Test ', function () {

    it('check ServiceV1 function and values', function () {
        var config = new Lavender.Config();
        config.context = 'hjyearbook';
        config.user = 'hjyearbook';
        config.password = 'hjyearbook!';
        config.baseUrl = 'http://devsql1.silpub.com/';
        //config.globalFontMapPath = '/local/demo/refapp/php/Proxy.php?url=http://devsql1.silpub.com/designers/hjyearbook/assets/fonts/GlobalFontMap_hjy.xml';
        config.globalFontMapPath = '/local/demo/refapp/php/GlobalFontMap_hjy.xml';
        var request = new Lavender.ServiceV1(config);
        var success = false;
        var successObject;
        var responder1 = {
            success:function(sucessObj){
                console.log('ServiceV1Test responder1 sucess called');
                success = true;
                successObject = sucessObj;
                },
            fault:function(faultObj){
                console.log('ServiceV1Test responder1 fault called');
            }
        };
        //isPostRequest, responder, urlKey, paramObj, urlParams, format, contentType, token, localRequest
        var params =
        {
            'context'	: config.context,
            'user'		: config.user,
            'password'	: config.password
        };
        //createSDSession = function(context, userID, password, responder, format, contentType
        var requestId = request.createSDSession(config.context, config.user, config.password, responder1, null, null, true, true);
        //var requestId = request.sendXMLRequest(true, responder1, 'createSDSession', params, null, null, null, true, true );
        //expect( story.id ).toBe('1234');
        expect( requestId ).toBeDefined();

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('sDSession').attr('sDSessionID') ).toBeDefined();
            config.sessionId = $(successObject.resultObj).find('sDSession').attr('sDSessionID');
            success = false;
            requestId = request.createInstance('38cf74da-f003-4071-a105-311d1af99f00', null, responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            config.instanceId = $(successObject.resultObj).find('LayoutBookMap').attr('instanceID');
            expect( config.instanceId ).toBeDefined();
            success = false;
            requestId = request.getTemplates(responder1, null, null, true, true);//responder, format, contentType, localRequest, cache
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('templates') ).toBeDefined();
            success = false;
            requestId = request.loadGlobalFontMap(responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('Font') ).toBeDefined();
            success = false;
            requestId = request.getSDSession(config.sessionId, responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('sDSession').attr('sDSessionID') ).toBeDefined();
            success = false;
            requestId = request.getInstance(config.instanceId, responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs getInstance
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('LayoutBookMap').attr('instanceID') ).toBeDefined();
            success = false;
            requestId = request.getImageAsset('3a1a5d4d-dce6-4b05-a263-3af9ef80f9f3', responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('imageAsset').attr('imageAssetID') ).toBe('3a1a5d4d-dce6-4b05-a263-3af9ef80f9f3');
            success = false;
            requestId = request.readImageAssets('hjyearbook', null, responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('imageassets') ).toBeDefined();
            success = false;
            requestId = request.hideShowImageAsset('b1590923-518c-4a1b-8c95-dec4f6624dde', false, responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('imageAsset').attr('visible') ).toBe('false');
            success = false;
            requestId = request.hideShowImageAsset('b1590923-518c-4a1b-8c95-dec4f6624dde', true, responder1, null, null, true, true);
        });

        /*
        This test has passed but you have to update the asset ID each time you test, so comment in only if you need to test the operations
        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('imageAsset').attr('visible') ).toBe('true');
            success = false;
            requestId = request.deleteImageAsset('2e4fad6d-ef5a-40c2-a3f5-c325c0b91e0a', responder1, null, null, true, true);
        });
        */
        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('imageAsset').attr('visible') ).toBe('true');
            success = false;
            requestId = request.getLayoutNumber(1, config.instanceId, responder1, null, null, true, true);
        });

        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            expect( $(successObject.resultObj).find('Template').attr('layoutID') ).toBe('c5aa15f7-b65b-4854-b0b5-29c0ecdcb7cc');
            success = false;
            requestId = request.updateLayoutNumber(1, $(successObject.resultObj).find('content').html(), config.instanceId, responder1, null, null, true, true);
        });

        //IMPOTANT: This test MUST OCCUR LAST!!!!!
        //Tell jasmine to hold execution until the condition success == true is met or the timeout of 5000 milliseconds occurs
        waitsFor(function(){
            return success == true;
        }, 'ServiceV1Test service request failed', 5000);
        //runs will execute after success == true
        runs(function(){
            expect( requestId ).toBe(successObject.requestId);
            //expect( $(successObject.resultObj).find('Template').attr('layoutID') ).toBe('c5aa15f7-b65b-4854-b0b5-29c0ecdcb7cc');
            success = false;
            request.generatePDF(config.instanceId, config.sessionId, responder1, null, null, false, true);
        });

    });
});
