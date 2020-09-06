function sort(tbody, compareFunction) {
	var rows = tbody.children;
	if(!rows || !rows[0] || rows.length == 1) return;
	var size = rows.length;
	var arr = [];
	for(var i = 0; i < size; i++) arr.push(rows[i]);
	arr.sort(compareFunction);
	for(var i = size - 1; i > 0; i--) tbody.insertBefore(arr[i-1], arr[i]);
}
function numConvert(s) {
	return s == Number(s) ? Number(s) : s;
}
function asc(idx) {
	return function(a, b) {
		var a_ = numConvert(a.children[idx].innerText);
		var b_ = numConvert(b.children[idx].innerText);
		return a_ > b_ ? 1 : -1;
	};
}
function desc(idx) {
	return function(a, b) {
		var a_ = numConvert(a.children[idx].innerText);
		var b_ = numConvert(b.children[idx].innerText);
		return a_ < b_ ? 1 : -1;
	};
}
function sortEvent(tbody, idx) {
	var mode = true;
	return function(e) {
		if(mode) sort(tbody,  asc(idx));
		else     sort(tbody, desc(idx));
		mode = !mode;
	};
}

const ts = document.getElementsByTagName('table');
for(let i = ts.length; i--; ) {
	const ths = ts[i].tHead.getElementsByTagName('th');
	for(let j = ths.length; j--; )
		ths[j].addEventListener("click", sortEvent(ts[i].tBodies[0], j));
}

function toggle_bad() {
	Array.prototype.slice.call(document.querySelectorAll(".bad")).forEach(it => it.style.display == "none" ? it.style.display = "block" : it.style.display = "none")
	Array.prototype.slice.call(document.querySelectorAll(".bad_button")).forEach(it => {
		let isBad = document.querySelector('.bad').style.display == 'block';
		it.value = isBad ? "ネガティブな点を見る状態です" : "ネガティブな点を見ない状態です";
		if(isBad) 	{ it.classList.add(`btn-primary`); it.classList.remove(`btn-default`); }
		else		{ it.classList.remove(`btn-primary`); it.classList.add(`btn-default`); }
	});
}

function toggle_impression(id) {
	Array.prototype.slice.call(document.querySelectorAll(`.impression-${id}`)).forEach(it => it.style.display == "none" ? it.style.display = "block" : it.style.display = "none")
	const button = document.querySelector(`.impression_button-${id}`);
	const isShow = document.querySelector(`.impression-${id}`).style.display == 'block';
	button.value = isShow ? "感想を見る状態です" : "感想を見ない状態です";
	if(isShow)  { button.classList.add(`btn-primary`); button.classList.remove(`btn-default`); }
	else		{ button.classList.remove(`btn-primary`); button.classList.add(`btn-default`); }
}

Array.prototype.slice.call(document.querySelectorAll(".bad_button")).forEach(it => {
	it.onclick = toggle_bad;
	it.classList.add(`btn`);
	it.style = `font-size:15px;`;
});

const impression = "感想";
for (let idx = 0; idx < 100; ++idx) {
	const button = document.querySelector(`.impression_button-${idx}`);
	if (button == null) {
		continue;
	}

	button.onclick = function() { toggle_impression(idx); };
	toggle_impression(idx);
}

toggle_bad();
toggle_bad();