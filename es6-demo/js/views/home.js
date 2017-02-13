import dom from '../dom';


var tpl  = `
	<div>yupeng</div>
`;

export default function render(params){
	alert(params.id1);
	alert(params.id2);
	dom('#page').innerHTML = tpl;
}
