import dom from '../dom';


var tpl  = `
	<div>result</div>
`;

export default function render(params){
	alert(params.id);
	dom('#page').innerHTML = tpl;
}
