import dom from '../dom';


var tpl  = `
	<div>join</div>
`;

export default function render(id1,id2){
	dom('#page').innerHTML = tpl;
}
