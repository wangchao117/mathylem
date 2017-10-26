var covered_functions = {};
var tests = [
    {
	"description":"Ready",
	"content":"none",
	"type":"text",
	"expected":"!ready",
	"run":function(g){}
    },
    {
	"description":"Basic",
	"content":"<m><e>x+1</e></m>",
	"type":"text",
	"expected":"+1",
	"run":function(g){
	    do_keys(['right','backspace']);
	}
    },
    {
	"description":"Basic undo",
	"type":"text",
	"expected":"xy",
	"run":function(g){
	    do_keys(['x','y','z','mod+z']);
	}
    },
    {
	"description":"Basic redo",
	"type":"text",
	"expected":"xyz",
	"run":function(g){
	    do_keys(['x','y','z','mod+z','mod+y']);
	}
    },
    {
	"description":"Sine",
	"type":"text",
	"expected":" sin(x)",
	"run":function(g){
	    do_keys(['s','i','n','x']);
	}
    },
    {
	"description":"Sine undo",
	"type":"text",
	"expected":"sin",
	"run":function(g){
	    do_keys(['s','i','n','mod+z']);
	}
    },
    {
	"description":"Exponent undo",
	"type":"text",
	"expected":"2x",
	"run":function(g){
	    do_keys(['2','x','^','mod+z']);
	}
    },
    {
	"description":"Basic select delete",
	"content":"<m><e>x+1</e></m>",
	"type":"text",
	"expected":"1",
	"run":function(g){
	    do_keys(['shift+right','shift+right','backspace']);
	}
    },
    {
	"description":"Basic select replace",
	"content":"<m><e>x+1</e></m>",
	"type":"text",
	"expected":"a1",
	"run":function(g){
	    do_keys(['shift+right','shift+right','a']);
	}
    },
    {
	"description":"Basic select left",
	"content":"<m><e>x+1</e></m>",
	"type":"text",
	"expected":"a+1",
	"run":function(g){
	    do_keys(['right','shift+left','a']);
	}
    },
    {
	"description":"Basic cut/paste",
	"content":"<m><e>x+1</e></m>",
	"type":"text",
	"expected":"1x+",
	"run":function(g){
	    do_keys(['shift+right','shift+right','mod+x','right','mod+v']);
	}
    },
    {
	"description":"Basic copy/paste",
	"content":"<m><e>x+1</e></m>",
	"type":"text",
	"expected":"x+1x+",
	"run":function(g){
	    do_keys(['shift+right','shift+right','mod+c','right','mod+v']);
	}
    },
    {
	"description":"f-char delete",
	"type":"text",
	"expected":"(2)^(x)",
	"run":function(g){
	    do_keys(['2','^','x','p','i','backspace']);
	}
    },
    {
	"description":"f-char cut/paste",
	"content":'<m><e></e><f><b p="latex">\\sin\\left(<r ref="1"/>\\right)</b><b p="text">sin(<r ref="1"/>)</b><c><e>x</e></c></f><e>+</e><f c="yes"><b p="latex">{\\pi}</b><b p="text"> PI </b></f><e>+</e><f><b p="latex">\\cos\\left(<r ref="1"/>\\right)</b><b p="text">cos(<r ref="1"/>)</b><c><e>x</e></c></f><e></e></m>',
	"type":"text",
	"expected":"sin(x)+cos(x)+ PI ",
	"run":function(g){
	    do_keys(['right','right','right','shift+right','shift+right','mod+x','right','right','right','right','mod+v']);
	}
    },
    {
	"description":"matrix add row",
	"type":"text",
	"expected":"matrix(1;2)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+down','2']);
	}
    },
    {
	"description":"matrix copy row",
	"type":"text",
	"expected":"matrix(1;1)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+shift+down']);
	}
    },
    {
	"description":"matrix add col",
	"type":"text",
	"expected":"matrix(1,2)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+right','2']);
	}
    },
    {
	"description":"matrix copy col",
	"type":"text",
	"expected":"matrix(1,1)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+shift+right']);
	}
    },
    {
	"description":"2x2 matrix",
	"type":"text",
	"expected":"matrix(1,2;(x)^(2),3)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+right','2','mod+down','right','3','left','left','x','^','2']);
	}
    },
    {
	"description":"2x2 matrix delete col",
	"type":"text",
	"expected":"matrix(2;3)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+right','2','mod+down','right','3','left','left','x','^','2','mod+backspace']);
	}
    },
    {
	"description":"2x2 matrix delete row",
	"type":"text",
	"expected":"matrix(1,2)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+right','2','mod+down','right','3','left','left','x','^','2','mod+shift+backspace']);
	}
    },
    {
	"description":"matrix extend up",
	"type":"text",
	"expected":"matrix(2;1)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+up','2']);
	}
    },
    {
	"description":"matrix extend left",
	"type":"text",
	"expected":"matrix(2,1)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+left','2']);
	}
    },
    {
	"description":"matrix copy up",
	"type":"text",
	"expected":"matrix(21;1)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+shift+up','2']);
	}
    },
    {
	"description":"matrix copy up move",
	"type":"text",
	"expected":"matrix(1;21)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+shift+up','down','2']);
	}
    },
    {
	"description":"matrix copy left",
	"type":"text",
	"expected":"matrix(12,1)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+shift+left','2']);
	}
    },
    {
	"description":"matrix copy left undo",
	"type":"text",
	"expected":"matrix(1)",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+shift+left','mod+z']);
	}
    },
    {
	"description":"sel all delete",
	"type":"text",
	"expected":"",
	"run":function(g){
	    do_keys(['m','a','t','1','mod+shift+up','down','x','^','2','+','mod+a','backspace']);
	}
    },
    {
	"description":"spacebar",
	"type":"text",
	"expected":"cos",
	"run":function(g){
	    do_keys(['c','o','space','s']);
	}
    },
    {
	"description":"backslash",
	"type":"text",
	"expected":" $theta ",
	"run":function(g){
	    do_keys(['\\','t','h','e','t','a','enter']);
	}
    },
    {
	"description":"theta",
	"type":"text",
	"expected":"th $eta ",
	"run":function(g){
	    do_keys(['t','h','e','t','a']);
	}
    },
    {
	"description":"completion",
	"type":"text",
	"expected":" cos()",
	"run":function(g){
	    do_keys(['c','o','space','s','tab']);
	}
    },
    {
	"description":"selection squaring",
	"type":"text",
	"expected":"(x+1)^(2)",
	"run":function(g){
	    do_keys(['x','+','1','shift+left','shift+left','shift+left','^','2']);
	}
    },
    {
	"description":"right paren",
	"type":"text",
	"expected":"((x+1))^(2)",
	"run":function(g){
	    do_keys(['(','x','+','1',')','^','2']);
	}
    },
    {
	"description":"paren completion",
	"type":"text",
	"expected":"((x+1))^(2)",
	"run":function(g){
	    do_keys(['(','x','+','1','right','^','2']);
	}
    },
    {
	"description":"definite integral",
	"type":"text",
	"expected":"integrate((x)^(2),x,0,2)",
	"run":function(g){
	    do_keys(['d','e','f','i','1','right','2','down','backspace','0','up','right','x','shift+up','2','right','right','x']);
	}
    },
    {
	"description":"delete",
	"type":"text",
	"expected":"",
	"run":function(g){
	    do_keys(['x','s','i','n','x','home','del','del']);
	}
    },
    {
	"description":"click",
	"type":"text",
	"expected":"x sin(ax)",
	"run":function(g){
	    do_keys(['x','s','i','n','x']);
	    do_mouse_down("m_f1_c1_e1_0", .2, .2);
	    do_mouse_up();
	    do_keys(['a']);
	}
    },
    {
	"description":"click select",
	"type":"text",
	"expected":"x+(x)^(2)",
	"run":function(g){
	    do_keys(['x','s','i','n','x',')','y','x','^','2']);
	    do_mouse_down("m_e1_0", .7, .1);
	    //do_mouse_down("m_e2_0", .7, .1);
	    do_mouse_up();
	    do_mouse_down("m_e2_0", .9, .9, true);
	    do_mouse_up();
	    do_keys(['+']);
	}
    },
    {
	"description":"mouse move",
	"type":"text",
	"expected":"x+y",
	"run":function(g){
	    do_keys(['x','+','s','i','n','y']);
	    do_mouse_move("m_e1_0", .1, .1);
	    do_mouse_down("m_f1_c1_e1_0", .1, .1);
	    do_mouse_up();
	    do_keys(['backspace']);
	}
    },
    {
	"description":"delete exponent",
	"type":"text",
	"expected":"x",
	"run":function(g){
	    do_keys(['x','^','2','backspace','backspace']);
	}
    },
    {
	"description":"problem",
	"type":"text",
	"expected":"!z",
	"run":function(g){
	    test_mathylem.backend.problem("!z");
	}
    },
    {
	"description":"symbol",
	"type":"text",
	"expected":" tan^(2)(x)",
	"run":function(g){
	    test_mathylem.backend.addSymbols("pta",{
		"output":{
		    "latex":"\\tan^{{$1}}({$2})",
		    "text":" tan^({$1})({$2})"
		},
		"group":"test",
		"current":0,
		"type":"ptan",
		"attrs":[{"down":"2"},{"up":"1"}]
	    });
	    do_keys(['p','t','a','2','right','x']);
	}
    },
    {
	"description":"remove symbol",
	"type":"text",
	"expected":"tanx",
	"run":function(g){
	    test_mathylem.backend.removeSymbol("tan");
	    do_keys(['t','a','n','x']);
	}
    },
    {
	"description":"symbol_func",
	"type":"text",
	"expected":" Re(i)",
	"run":function(g){
	    test_mathylem.backend.addFuncSymbol("Re","test");
	    do_keys(['shift+r','e','i']);
	}
    },
    {
	"description":"symbol_raw",
	"type":"text",
	"expected":"ASDA",
	"run":function(g){
	    test_mathylem.backend.addRawSymbol("asda","ASDA","ASDA","test");
	    do_keys(['a','s','d','a']);
	}
    },
    {
	"description":"left_end",
	"content":"<m><e>x</e></m>",
	"type":"text",
	"expected":"!left",
	"run":function(g){
	    do_keys(['left']);
	}
    },
    {
	"description":"right_end",
	"content":"<m><e>x</e></m>",
	"type":"text",
	"expected":"!right",
	"run":function(g){
	    do_keys(['right','right']);
	}
    }
];

function do_keys(chs){
    test_mathylem.activate();
    for(var i = 0; i < chs.length; i++)
	Mousetrap.trigger(chs[i]);
}

function do_mouse_move(path,x_frac,y_frac){
    elts = test_mathylem.editor.getElementsByClassName("mathylem_loc_"+path);
    var rect = elts[1].getBoundingClientRect();
    var x = rect.left + (rect.right - rect.left)*x_frac;
    var y = rect.top + (rect.bottom - rect.top)*y_frac;
    MathYlem.mouseMove({"target":test_mathylem.editor,"clientX":x,"clientY":y,"preventDefault":function(){}});
}

function do_mouse_down(path,x_frac,y_frac, shift){
    elts = test_mathylem.editor.getElementsByClassName("mathylem_loc_"+path);
    var rect = elts[1].getBoundingClientRect();
    var x = rect.left + (rect.right - rect.left)*x_frac;
    var y = rect.top + (rect.bottom - rect.top)*y_frac;
    MathYlem.mouseDown({"target":test_mathylem.editor,"clientX":x,"clientY":y,"preventDefault":function(){},"shiftKey":shift});
}

function do_mouse_up(){
    MathYlem.mouseUp();
}

function append_result(name, result, i){
    var res = document.getElementById("results");
    var d = document.createElement("div");
    d.setAttribute("style","padding:5px;background-color:"+(result == "PASS" ? "#6c0" : "#f30"));
    var rerun = document.createElement("a");
    rerun.appendChild(document.createTextNode(name));
    rerun.setAttribute("href","#");
    rerun.setAttribute("onclick", "run_test("+i+", test_mathylem)");
    d.appendChild(rerun);
    d.appendChild(document.createTextNode(": " + result));
    res.appendChild(d);
}

function patch_object_functions(name, obj, is_class, exclude){
    var proto = is_class ? obj : Object.getPrototypeOf(obj);
    var props = Object.getOwnPropertyNames(proto);
    for(var i = 0; i < props.length; i++){
	var fun = obj[props[i]]
	if(typeof fun === 'function' && !exclude[props[i]]){
	    covered_functions[name + "." + props[i]] = {"calls":0,"fun":fun};
	    var nf = function(objname, funname, o, f){
		o[funname] = function(){
		    covered_functions[objname + "." + funname].calls++;
		    return f.apply(o, arguments);
		}
	    };
	    nf(name, props[i], obj, fun);
	}
    }
}

function track_coverage(g){
    // get all functions of a function object
    var function_functions = {};
    var f = function(){};
    var props = Object.getOwnPropertyNames(f);
    for(var i = 0; i < props.length; i++)
	if(typeof f[props[i]] === 'function')
	    function_functions[props[i]] = true;
    // get all functions of the various target objects
    patch_object_functions("mathylem.backend", g.backend, false, function_functions);
    patch_object_functions("mathylem", g, false, function_functions);
    //patch_object_functions("MathYlemBackend", MathYlemBackend, true, function_functions);
    //patch_object_functions("MathYlem", MathYlem, true, function_functions);
    display_coverage();
}

function display_coverage(){
    document.getElementById("coverage").innerHTML = "Test coverage: <b><span id='cov'></span></b>";
    var res = document.getElementById("coverage");
    var tot = 0, cov = 0;
    for(var n in covered_functions){
	tot++;
	var calls = covered_functions[n].calls;
	if(calls > 0) cov++;
	//res.appendChild(document.createElement("br"));
	s = document.createElement("div");
	s.setAttribute("style","padding:5px; background-color:" + (calls > 0 ? "#6c0;" : "#f30;"));
	s.appendChild(document.createTextNode(n + ": " + calls));
	res.appendChild(s);
    }
    document.getElementById("cov").innerHTML = (Math.round(10000*cov/tot)/100)+"% (" + cov + " covered, " + (tot-cov) + " not covered).  ";
    var re = document.createElement("a");
    re.setAttribute("onclick","display_coverage()");
    re.setAttribute("href","#");
    re.appendChild(document.createTextNode("Recompute"));
    document.getElementById("cov").appendChild(re);
}

function start_tests(){
    var g = test_mathylem;
    g.activate();
    track_coverage(g);
    var tot = 0, pass = 0;
    for(var i = 0; i < tests.length; i++){
    	if(run_test(i, g)) pass++;
	tot++;
    }
    document.getElementById("pass_rate").innerHTML = (Math.round(10000*pass/tot)/100)+"% pass rate (" + pass + " pass, " + (tot-pass) + " fails)";
    display_coverage();
    g.backend.set_content("<m><e>x</e></m>");
}

function run_test(i, g){
    var t = tests[i];
    test_mathylem.activate();
    if(!t.content) test_mathylem.backend.setContent("<m><e></e></m>");
    else if(t.content != "none") test_mathylem.backend.setContent(t.content);
    test_mathylem.render();
    var observed = ""
    try{
	t.run(test_mathylem);
	test_mathylem.render();
	observed = test_mathylem.backend.getContent(t.type);
    } catch(e) {
	observed = e + "\n" + e.stack;
    }
    test_mathylem.deactivate();
    if(t.expected == observed){
	append_result(t.description,"PASS", i);
	return true;
    }
    else {
	append_result(t.description,"Observed="+observed + ", Expected="+t.expected, i);
	return false;
    }
}
