
window.onload = function(){
	
	const shopCart = document.querySelector('.shopCart');
	const cartCloseBtn = document.querySelector('.fa-close');
	const cartBox = document.querySelector('.cartBox');
	shopCart.addEventListener("click",function(){
		cartBox.classList.add('active');
	});
	cartCloseBtn.addEventListener("click",function(){
		cartBox.classList.remove('active');
	});


	const xaddToCartBtn = document.getElementsByClassName('xaddToCart');
	let items = [];
	for(let i=0; i<xaddToCartBtn.length; i++){
		xaddToCartBtn[i].addEventListener("click",function(e){
			if(typeof(Storage) !== 'undefined'){
				let item = {
						id:i+1,
						name:e.target.parentElement.children[0].textContent,
						price:e.target.parentElement.children[1].children[0].textContent,
						no:1
					};
				if(JSON.parse(localStorage.getItem('items')) === null){
					items.push(item);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
				}else{
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data=>{
						if(item.id == data.id){
							item.no = data.no + 1;
						}else{
							items.push(data);
						}
					});
					items.push(item);
					localStorage.setItem('items',JSON.stringify(items));
					window.location.reload();
				}
			}else{
				alert('local storage is not working on your browser');
			}
		});
	}
 
	const shopCartP = document.querySelector('.shopCart p');
	let no = 0;
	JSON.parse(localStorage.getItem('items')).map(data=>{
		no = no+data.no
;	});
	shopCartP.innerHTML = no;


	const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>Item No.</th><th>Item Name</th><th>Quantity</th><th>Item Price</th><th></th></tr>';
	
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="6">No items found</td></tr>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><button onclick=Delete(this);>Delete</button></th></tr>';
		});
	}
	cardBoxTable.innerHTML = tableData;
}

function Delete(e){
			let items = [];
			JSON.parse(localStorage.getItem('items')).map(data=>{
				if(data.id != e.parentElement.parentElement.children[0].textContent){
					items.push(data);
				}
			});
			localStorage.setItem('items',JSON.stringify(items));
			window.location.reload();
		};


