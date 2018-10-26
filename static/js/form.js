document.querySelector('#formSubmit').addEventListener('click', formHandler);

function formHandler() {
	const values = {};
	_(document.forms.good.elements).map(({name, value}) => {
		values[name] = value;
	});

	const good = _(values).pick('name','description');
	good.frame = _(values).pick('material');
	good.frame.size = _(values).pick('width','heigth');

	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/goods");
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify(good));
	console.log(good);
}