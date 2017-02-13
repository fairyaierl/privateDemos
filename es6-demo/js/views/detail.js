import dom from '../dom';


let _data = [

	{name:'xxxxx'},

	{name:'xxxxx4'},

	{name:'xxxxxe'},

	{name:'xxxxx2'},

	{name:'xxxxx1'},

	{name:'xxxxx1'}
]

function event(){

}

export default function render(){
	dom('#page').innerHTML = 
	
	`${
		_data.map((item) => {

			return `
			
				<div> name: ${item.name} </div>

			`
		
		}).join('')
	}`

	event();
}
