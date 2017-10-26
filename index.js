$('document').ready(function() {
    MathYlem.staticRenderAll();
    $('#xml_btn').on('click', function() {
        createText('xml');
    });
    $('#text_btn').on('click', function() {
        createText('text');
    });
    $('#latex_btn').on('click', function() {
        createText('latex');
    });
    $('#clear_btn').on('click', function() {
        $('#stuff')[0].innerHTML = '';
    });

    MathYlem.initialize(["build/symbols.json"]);
    var g1 = new MathYlem("mathylem1", {
	"events":{
	    //'debug':10,
            'right_end': function() {},
            'left_end': function() {},
            'done': function() { createText('text'); },
            'completion': completion,
	},
	"options":
	{
            //'blank_caret': "[?]",
	    //'autoreplace':true,
            'emptyContent': "\\gray{\\text{Click here to start typing a mathematical expression}}"
	}
    });
});

function flash_help(){
    $("#help_card").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function completion(target, data) {
    $('#stuff')[0].innerHTML = "INFO: <br />"+data.candidates.join(", ");
}

function createText(texttype) {
    //clear screen
    $('#stuff')[0].innerHTML = texttype.toUpperCase() + ": ";
    //display text
    $('#stuff')[0].appendChild(document.createElement('br'));
    $('#stuff')[0].appendChild(document.createTextNode(MathYlem.instances['mathylem1'].backend.getContent(texttype)));
}
