
import handler from './handler';

dispatch.on("/home",handler.home);

dispatch.on("/detail",handler.detail);

dispatch.on("/result", handler.result);

dispatch.on("/join", handler.join);

dispatch.on("/default",handler.detail);

dispatch.before = [login];

function login(cb){
	alert('login');
	cb && cb();
}

dispatch.run();

