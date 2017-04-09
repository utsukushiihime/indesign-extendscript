//
// insert inline image.
//
var createDocument = function(params){
    params.documentPreferences = {
        pageWidth   : params.pageWidth+"mm",
        pageHeight  : params.pageHeight+"mm",
           facingPages : false};

    var doc = app.documents.add(params);

    var page = doc.pages.item(0);
    page.marginPreferences.properties = {
        top    : params.marginTop+"mm",
        left   : params.marginLeft+"mm",
        bottom : params.marginBottom+"mm",
        right  : params.marginRight+"mm"};

    return doc;
};

var createTextFrame = function(parent,params){
    return parent.textFrames.add({
        geometricBounds:[
            params.top+"mm",
            params.left+"mm",
            params.bottom+"mm",
            params.right+"mm"] });
};

var currentDir = function(){
    return File($.fileName).parent;
};


// ----
// main
// ----

var pageParams = {
    pageWidth   : 297,
    pageHeight  : 210,
    marginTop   : 10,
    marginLeft  : 10,
    marginBottom: 10,
    marginRight : 10};

var doc = createDocument( pageParams );

var page = doc.pages.item(0);

var textFrameParams = {
    top    : pageParams.marginTop,
    left   : pageParams.marginLeft,
    bottom : (pageParams.pageHeight - pageParams.marginBottom),
    right  : (pageParams.pageWidth  - pageParams.marginRight) };

var textFrame = createTextFrame(page, textFrameParams);
textFrame.contents = 'This is tiger image.';
var insertionPoint = textFrame.insertionPoints[13];
var inlineTextFrame = createTextFrame(insertionPoint,{top:0,left:0,bottom:48,right:48});

inlineTextFrame.contentType = ContentType.graphicType;
inlineTextFrame.place( File( currentDir().fullName + '/links/tiger.eps' ) );
inlineTextFrame.fit(FitOptions.CONTENT_TO_FRAME);
