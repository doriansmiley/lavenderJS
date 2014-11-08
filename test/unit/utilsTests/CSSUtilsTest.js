'use strict';

/* jasmine specs for controllers go here */
describe('CSSUtilsTest', function () {

    it('check CSSUtils functions and values', function () {

        var fontGroupCollection = new Lavender.FontGroupCollection();
        fontGroupCollection.modelType = 'test';
        fontGroupCollection.version = '1';
        fontGroupCollection.displayGlobalFontList = true;
        fontGroupCollection.addFontsToMap = false;

        var fontGroup = new Lavender.FontGroup();
        fontGroup.fontFamily = 'Arial';

        var font1 = new Lavender.FontVariant();
        font1.fontId = 'font1';
        font1.fontFamily = 'Arial';
        font1.fullName = 'Arial'
        font1.fontWeight = 'normal';
        font1.fontStyle = 'normal';
        fontGroup.variants.addItem(font1);

        var font2 = new Lavender.FontVariant();
        font2.fontId = 'font2';
        font2.fontFamily = 'Arial Bold';
        font2.fullName = 'Arial Bold'
        font2.fontWeight = 'bold';
        font2.fontStyle = 'normal';
        fontGroup.variants.addItem(font2);

        var font3 = new Lavender.FontVariant();
        font3.fontId = 'font3';
        font3.fontFamily = 'Arial Italic';
        font3.fullName = 'Arial Italic'
        font3.fontWeight = 'normal';
        font3.fontStyle = 'italic';
        fontGroup.variants.addItem(font3);

        var font4 = new Lavender.FontVariant();
        font4.fontId = 'font4';
        font4.fullName = 'Arial Italic'
        font4.fontFamily = 'Arial Italic';
        font4.fontWeight = 'bold';
        font4.fontStyle = 'italic';
        fontGroup.variants.addItem(font4);

        fontGroupCollection.addItem( fontGroup );

        var paragraphStyleXml01 = '<ParagraphStyle groupName="testGroupNAme" name="Paragraph Style 1" fontId="font3" fontSize="32" typographicCase="default" ' +
            'color="#000000" lineHeight="38.4" baselineShift="0" textDecoration="none" ligatureLevel="minimum" digitWidth="default" ' +
            'digitCase="default" ruleAbove="false" ruleAboveLineWeight="5" ruleAboveOffset="10" ruleAboveType="type1" ruleAboveRightIndent="15" ruleAboveLeftIndent="20" ' +
            'ruleAboveColor="#fff000" ruleBelow="false" ruleBelowLineWeight="30" ruleBelowOffset="35" ruleBelowType="rule below type" ruleBelowRightIndent="40" ruleBelowLeftIndent="45" ' +
            'ruleBelowColor="#000000" listType="listType1" textIndent="50" paragraphStartIndent="55" paragraphEndIndent="60" textAlign="left" ' +
            'tabStops="S36 S72 S108 S144 S180 S216 S252 S288 S324 S360 S396 S432 S468 S504 S540 S576 S612 S648 S684 S720 S756 S792 S828 S864 S900 S936 S972 S1008 S1044 S1080" ' +
            'paragraphSpaceBefore="70" paragraphSpaceAfter="75"></ParagraphStyle>';
        var paragraphStyleXml02 = '<ParagraphStyle groupName="testGroupNAme" name="Paragraph Style 1" fontId="font3" fontSize="32" typographicCase="uppercase" ' +
            'color="#ff9933" lineHeight="120%" baselineShift="superscript" textDecoration="underline" ligatureLevel="minimum" digitWidth="default" ' +
            'digitCase="default" ruleAbove="false" ruleAboveLineWeight="5" ruleAboveOffset="10" ruleAboveType="type1" ruleAboveRightIndent="15" ruleAboveLeftIndent="20" ' +
            'ruleAboveColor="#fff000" ruleBelow="false" ruleBelowLineWeight="30" ruleBelowOffset="35" ruleBelowType="rule below type" ruleBelowRightIndent="40" ruleBelowLeftIndent="45" ' +
            'ruleBelowColor="#000000" listType="listType1" textIndent="50" paragraphStartIndent="55" paragraphEndIndent="60" textAlign="right" ' +
            'tabStops="S36 S72 S108 S144 S180 S216 S252 S288 S324 S360 S396 S432 S468 S504 S540 S576 S612 S648 S684 S720 S756 S792 S828 S864 S900 S936 S972 S1008 S1044 S1080" ' +
            'paragraphSpaceBefore="70" paragraphSpaceAfter="75"></ParagraphStyle>';
        var paragraphStyleXml03 = '<ParagraphStyle groupName="testGroupNAme" name="Paragraph Style 1" fontId="font3" fontSize="32" typographicCase="smallCaps" ' +
            'color="#000000" lineHeight="38.4" baselineShift="subscript" textDecoration="none" ligatureLevel="minimum" digitWidth="default" ' +
            'digitCase="default" ruleAbove="false" ruleAboveLineWeight="5" ruleAboveOffset="10" ruleAboveType="type1" ruleAboveRightIndent="15" ruleAboveLeftIndent="20" ' +
            'ruleAboveColor="#fff000" ruleBelow="false" ruleBelowLineWeight="30" ruleBelowOffset="35" ruleBelowType="rule below type" ruleBelowRightIndent="40" ruleBelowLeftIndent="45" ' +
            'ruleBelowColor="#000000" listType="listType1" textIndent="50" paragraphStartIndent="55" paragraphEndIndent="60" textAlign="center" ' +
            'tabStops="S36 S72 S108 S144 S180 S216 S252 S288 S324 S360 S396 S432 S468 S504 S540 S576 S612 S648 S684 S720 S756 S792 S828 S864 S900 S936 S972 S1008 S1044 S1080" ' +
            'paragraphSpaceBefore="70" paragraphSpaceAfter="75"></ParagraphStyle>';
        var paragraphStyleXml04 = '<ParagraphStyle groupName="testGroupNAme" name="Paragraph Style 1" fontId="font3" fontSize="32" typographicCase="lowercaseToSmallCaps" ' +
            'color="#000000" lineHeight="38.4" baselineShift="90%" textDecoration="none" ligatureLevel="minimum" digitWidth="default" ' +
            'digitCase="default" ruleAbove="false" ruleAboveLineWeight="5" ruleAboveOffset="10" ruleAboveType="type1" ruleAboveRightIndent="15" ruleAboveLeftIndent="20" ' +
            'ruleAboveColor="#fff000" ruleBelow="false" ruleBelowLineWeight="30" ruleBelowOffset="35" ruleBelowType="rule below type" ruleBelowRightIndent="40" ruleBelowLeftIndent="45" ' +
            'ruleBelowColor="#000000" listType="listType1" textIndent="50" paragraphStartIndent="55" paragraphEndIndent="60" textAlign="justify" ' +
            'tabStops="S36 S72 S108 S144 S180 S216 S252 S288 S324 S360 S396 S432 S468 S504 S540 S576 S612 S648 S684 S720 S756 S792 S828 S864 S900 S936 S972 S1008 S1044 S1080" ' +
            'paragraphSpaceBefore="70" paragraphSpaceAfter="75"></ParagraphStyle>';
        var paragraphStyleXml05 = '<ParagraphStyle groupName="testGroupNAme" name="Paragraph Style 1" fontId="font3" fontSize="32" typographicCase="lowercaseToSmallCaps" ' +
            'color="#000000" lineHeight="38.4" baselineShift="-90%" textDecoration="none" ligatureLevel="minimum" digitWidth="default" ' +
            'digitCase="default" ruleAbove="false" ruleAboveLineWeight="5" ruleAboveOffset="10" ruleAboveType="type1" ruleAboveRightIndent="15" ruleAboveLeftIndent="20" ' +
            'ruleAboveColor="#fff000" ruleBelow="false" ruleBelowLineWeight="30" ruleBelowOffset="35" ruleBelowType="rule below type" ruleBelowRightIndent="40" ruleBelowLeftIndent="45" ' +
            'ruleBelowColor="#000000" listType="listType1" textIndent="50" paragraphStartIndent="55" paragraphEndIndent="60" textAlign="center" ' +
            'tabStops="S36 S72 S108 S144 S180 S216 S252 S288 S324 S360 S396 S432 S468 S504 S540 S576 S612 S648 S684 S720 S756 S792 S828 S864 S900 S936 S972 S1008 S1044 S1080" ' +
            'paragraphSpaceBefore="70" paragraphSpaceAfter="75"></ParagraphStyle>';

        var frameXML = '<FrameXML strokeCornerAdjustment="dashesAndGaps" borderOverprint="true" ' +
            'fillOverprint="true" strokeDashAndGap="1,2,3,4" xOffset="351.0000" ' +
            'yOffset="-9.0000" width="729.0000" height="378.0000" rotation="30" rotationLimit="10" ' +
            'verticalScale="100" overflow="false" borderStroke="2" borderColor="#ffffff" strokeOpacity="30" ' +
            'strokeType="solid" fillColor="#b0b6bb" fillOpacity="90" opacity="50" strokeBlendMode="normal" ' +
            'fillBlendMode="colorDodge" blendMode="normal" contentBlendMode="normal" selectable="true" ' +
            'movable="false" copyable="false" positionLimits="none" positionLimitsOffset="0" rotatable="false" ' +
            'scalable="false" scaleProportionally="true" scaleType="fitContentProportionally" flippable="true" ' +
            'fillColorChangeable="true" strokeColorChangeable="true" opacityChangeable="true" ' +
            'blendModeChangeable="true"></FrameXML>';
        var pageItemBlock = new Lavender.PageItemBlock();
        pageItemBlock.type = 'vector';
        pageItemBlock.sequence = 5
        pageItemBlock.publish = 'always';//always | never | onlyIfUserInteracted | onlyIfCompleted
        pageItemBlock.preview = 'never';//always | never
        pageItemBlock.floating = true;
        pageItemBlock.contentType = 'test content type';
        pageItemBlock.spi_var = 'test var';
        pageItemBlock.spi_var_label = 'test var label';
        pageItemBlock.spi_var_format = 'test var format';
        pageItemBlock.href = 'http://www.href.com';
        pageItemBlock.spi_href_var = 'test href var';
        pageItemBlock.spi_href_var_label = 'test href label';
        pageItemBlock.spi_href_var_format = 'test href format';
        pageItemBlock.htmlId = '1234';
        pageItemBlock.scriptLabel = 'test script label';
        pageItemBlock.placeholderContent = true;
        pageItemBlock.previousPageItem = '1';//deprecated
        pageItemBlock.nextPageItem = '2';//deprecated
        var frameParser = new Lavender.FrameParserDtd250Parser();
        var frame = (frameParser.canParse($(frameXML))) ? frameParser.parse($(frameXML), pageItemBlock) : undefined;
        var paragraphStyleParser = new Lavender.ParagraphStyleDtd250Parser();
        var paragraphStyle01 = (paragraphStyleParser.canParse($(paragraphStyleXml01))) ? paragraphStyleParser.parse($(paragraphStyleXml01),fontGroupCollection) : undefined;
        var paragraphStyle02 = (paragraphStyleParser.canParse($(paragraphStyleXml02))) ? paragraphStyleParser.parse($(paragraphStyleXml02),fontGroupCollection) : undefined;
        var paragraphStyle03 = (paragraphStyleParser.canParse($(paragraphStyleXml03))) ? paragraphStyleParser.parse($(paragraphStyleXml03),fontGroupCollection) : undefined;
        var paragraphStyle04 = (paragraphStyleParser.canParse($(paragraphStyleXml04))) ? paragraphStyleParser.parse($(paragraphStyleXml04),fontGroupCollection) : undefined;
        var paragraphStyle05 = (paragraphStyleParser.canParse($(paragraphStyleXml05))) ? paragraphStyleParser.parse($(paragraphStyleXml05),fontGroupCollection) : undefined;

        var paragraphCss01 = paragraphStyle01.getCss( true, true );
        var paragraphCss02 = paragraphStyle02.getCss( true, true );
        var paragraphCss03 = paragraphStyle03.getCss( true, true );
        var paragraphCss04 = paragraphStyle04.getCss( true, true );
        var paragraphCss05 = paragraphStyle05.getCss( true, true );
        var frameCss = frame.getCss(false, true);

        var testElement = $('<p/>');
        testElement.css(frameCss);
        var dataProperties = Lavender.CSSUtils.getData(testElement[0].style);

        /*
        Testing attributes for pass through, this will be critical for TLF. If a matching css attribute
        is not found it's added ass a CSS var to the return CSS. This can then be passed along with the
        text control's element in the CSS for export
        * */
        expect(dataProperties.strokeBlendMode).toBe('normal')
        expect(dataProperties.fillBlendMode).toBe('colorDodge');
        expect(dataProperties.blendMode).toBe('normal');
        expect(dataProperties.contentBlendMode).toBe('normal');
        expect(dataProperties.selectable).toBe(true);
        expect(dataProperties.movable).toBe(false);
        expect(dataProperties.copyable).toBe(false);
        expect(dataProperties.positionLimits).toBe('none');
        expect(dataProperties.positionLimitsOffset).toBe('0px');
        expect(dataProperties.rotatable).toBe(false);
        expect(dataProperties.scalable).toBe(false);
        expect(dataProperties.scaleProportionally).toBe(true);
        expect(dataProperties.scaleType).toBe('fitContentProportionally');
        expect(dataProperties.flippable).toBe(true);
        expect(dataProperties.fillColorChangeable).toBe(true);
        expect(dataProperties.strokeColorChangeable).toBe(true);
        expect(dataProperties.opacityChangeable).toBe(true);
        expect(dataProperties.blendModeChangeable).toBe(true);
        expect(testElement.css('opacity')).toBe('0.5');
        expect(testElement.css('background-color')).toBe('rgba(176, 182, 187, 0.901961)');
        expect(testElement.css('border-style')).toBe('solid');
        expect(testElement.css('border-width')).toBe('2px');
        expect(dataProperties.strokeCornerAdjustment).toBe('dashesAndGaps');
        expect(dataProperties.borderOverprint).toBe(true);
        expect(dataProperties.fillOverprint).toBe(true);
        expect(dataProperties.strokeDashAndGap).toBe('1,2,3,4');
        expect(dataProperties.top).toBe(undefined);
        expect(testElement.css('top')).toBe('-9px');
        expect(dataProperties.left).toBe(undefined);
        expect(testElement.css('left')).toBe('351px');
        expect(dataProperties.width).toBe(undefined);
        expect(testElement.css('width')).toBe('729px');
        expect(dataProperties.height).toBe(undefined);
        expect(testElement.css('height')).toBe('378px');
        expect(dataProperties.rotation).toBe(undefined);
        var rotation = Lavender.MatrixUtils.getRotationAngleForElement(testElement);
        expect(Lavender.MathUtils.toFixed(rotation, 1)).toBe(30);
        expect(dataProperties.rotationLimit).toBe('10px');
        expect(dataProperties.verticalScale).toBe('100px');
        expect(dataProperties.overflow).toBe(false);
        expect(dataProperties.borderStroke).toBe(undefined);
        expect(testElement.css('border-width')).toBe('2px');
        expect(dataProperties.borderColor).toBe(undefined);
        //for some reason chrome is converting .3 to 0.298039.
        //Stepping through the code the correct value of 0.3 is being set,
        //but it's converted to 0.298039 when assigned to the elements CSS
        expect(testElement.css('border-color')).toBe('rgba(255, 255, 255, 0.298039)');

        //fontId
        expect(paragraphCss01['font-family']).toBe('font3');
        // fontSize:
        expect(paragraphCss01['font-size']).toBe('32px');
        // typographicCase:
        // default:
        expect(paragraphCss01['font-variant']).toBe('normal');
        // uppercase:
        expect(paragraphCss02['text-transform']).toBe('uppercase');
        // smallCaps:
        expect(paragraphCss03['font-variant']).toBe('small-caps');
        // lowercaseToSmallCaps:
        expect(paragraphCss04['font-variant']).toBe('small-caps');

        // color
        expect(paragraphCss02['color']).toBe('#ff9933');

        // baselineShift
        // 0:
        var p1DataProperties = Lavender.CSSUtils.getData(paragraphCss01);
        expect(p1DataProperties['baselineShift']).toBe('0');
        // superscript:
        expect(paragraphCss02['position']).toBe('relative');
        expect(paragraphCss02['font-size']).toBe('19.2px');
        expect(paragraphCss02['bottom']).toBe('0.66em');
        // subscript:
        expect(paragraphCss03['position']).toBe('relative');
        expect(paragraphCss03['font-size']).toBe('19.2px');
        expect(paragraphCss03['bottom']).toBe('-0.33em');
        // positive percentage:
        expect(paragraphCss04['position']).toBe('relative');
        expect(paragraphCss04['bottom']).toBe('0.9em');
        // negative percentage:
        expect(paragraphCss05['position']).toBe('relative');
        expect(paragraphCss05['bottom']).toBe('-0.9em');

        // textDecoration
        // none:
        expect(paragraphCss01['text-decoration']).toBe('none');
        // underline:
        expect(paragraphCss02['text-decoration']).toBe('underline');

        // ligatureLevel:
        expect(paragraphCss01['text-rendering']).toBe('optimizeLegibility');

        // lineHeight
        // 38.4:
        expect(paragraphCss01['line-height']).toBe('38.4px');
        // 120%:
        expect(paragraphCss02['line-height']).toBe('120%');

        // textIndent
        // 50:
        expect(paragraphCss01['text-indent']).toBe('50px');

        // paragraphStartIndent
        // 55:
        expect(paragraphCss01['margin-left']).toBe('55px');

        // paragraphEndIndent
        // 60:
        expect(paragraphCss01['margin-right']).toBe('60px');

        // paragraphSpaceBefore
        // 70:
        expect(paragraphCss01['margin-top']).toBe('70px');

        // paragraphSpaceAfter
        // 75:
        expect(paragraphCss01['margin-bottom']).toBe('75px');
        /*
        The result after automatic margin collapsing should be the
        larger of two specified margins (between two paragraphs), not
        the sum of the two margins. This works in the iPad sim and in
        Chrome.
        */

        // textAlign
        // left, right, center, justify:
        expect(paragraphCss01['text-align']).toBe('left');
        expect(paragraphCss02['text-align']).toBe('right');
        expect(paragraphCss03['text-align']).toBe('center');
        expect(paragraphCss04['text-align']).toBe('justify');

        ////////////////////////////////////////////////////////////////////////
        /* Test Character Styles */

        var characterStyle00 = new Lavender.CharacterStyle();

        characterStyle00.groupName = 'Test Group Name';
        characterStyle00.name = 'Test Name';
        characterStyle00.fontFamily = 'Arial';
        characterStyle00.fontStyle = 'bold';
        characterStyle00.fontId = '1234';//this will be overriden by the font object set below
        characterStyle00.fontSize = 12;
        characterStyle00.typographicCase = 'uppercase';
        characterStyle00.color = '#ffffff';
        characterStyle00.lineHeight = '5';
        characterStyle00.baselineShift = '10';
        characterStyle00.textDecoration = 'underline';
        characterStyle00.ligatureLevel = 'common';
        characterStyle00.digitCase = 'lining';
        characterStyle00.digitWidth = 'proportional';
        characterStyle00.swatchName = 'red';
        characterStyle00.font = new Lavender.FontVariant();
        characterStyle00.font.fontId = 'ArialItalic';
        characterStyle00.font.fullName = 'Arial Italic';
        characterStyle00.font.fontFamily = 'Arial';
        characterStyle00.font.fontStyle = 'italic';
        characterStyle00.font.fontWeight = 'bold';
        characterStyle00.trackingRight = '25%';

        var characterCss00 = characterStyle00.getCss();

        expect( characterCss00['-moz-font-feature-settings'] ).toBe('"lnum" 1"lnum=1""kern" 1"kern=1", "pnum" 1, "pnum=1"');
        expect( characterCss00['-ms-font-feature-settings'] ).toBe('"lnum" 1"kern" 1, "pnum" 1');
        expect( characterCss00['-o-font-feature-settings'] ).toBe('"lnum" 1"kern" 1, "pnum" 1');
        expect( characterCss00['-webkit-font-feature-settings'] ).toBe('"lnum" 1"kern" 1, "pnum" 1');
        expect( characterCss00['font-feature-settings'] ).toBe('"lnum" 1"kern" 1, "pnum" 1');
        var c1DataProperties = Lavender.CSSUtils.getData(characterCss00);
        expect(c1DataProperties['baselineShift']).toBe('10');
        expect( characterCss00['color'] ).toBe('#ffffff');
        expect( characterCss00['font-family'] ).toBe('1234');//the font instance should take priority over the inline font
        expect( characterCss00['font-size'] ).toBe('12px');
        expect( characterCss00['font-style'] ).toBe('italic');
        expect( characterCss00['font-weight'] ).toBe('bold');
        expect( characterCss00['line-height'] ).toBe('5px');
        expect( characterCss00['text-decoration'] ).toBe('underline');

        /* TODO:
        (Is to do? Would be redundant I guess.)
        Also test all the CSS properties returned by getCss() with
          char style input (the same way as done above for para
          styles, using XML string input).
          [ also: view ./CharacterStyleParserDtd250Test.js ]
          [
          var characterCss01 = characterStyle01.getCss();
          expect(characterCss01['foo']).toBe('bar');
          ]
        */

        // ligatureLevel:
        // TODO:
        // expect(characterCss01['text-rendering']).toBe('optimizeLegibility');
        // TODO: also ensure for spans

        ////////////////////////////////////////////////////////////////////////
        /* Test List Style */

        /* TODO: Test list styles.
          (Is to do? Here? Or in one of the above sections?)
        */

    });
});

