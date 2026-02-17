const loadCat = () => {
	fetch("https://fakestoreapi.com/products/categories")
	.then((res) => res.json())
	.then((data) => dispalyCat(data));
}

const displayProductDetails=(product)=>{
	console.log(product);
	const productsDetailsWrapper = document.getElementById("product-details-wrapper");
	console.log(productsDetailsWrapper);

	productsDetailsWrapper.innerHTML =`
			<div class="card product-card h-100 shadow-sm border-0">
                <div class="img-wrapper d-flex align-items-center justify-content-center">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="card-body d-flex flex-column p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="badge category-badge rounded-pill px-2 py-1">${product.category}</span>
                        <div class="rating-text">
                            <i class="bi bi-star-fill rating-star"></i> ${product.rating?.rate || 'N/A'} (${product.rating?.count || 0})
                        </div>
                    </div>
                    <h6 class="card-title text-truncate fw-semibold mb-3" style="font-size: 0.95rem;">${product.title}</h6>
                    <h5 class="fw-bold mb-3" style="color: #1f2937;">$${product.price}</h5>
                    
                    <div class="mt-auto row g-2">
                        <div class="col">
                            <button class=" btn-add swift-btn w-100 d-flex align-items-center justify-content-center gap-1 py-2">
                                <i class="bi bi-cart3"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
	`

	

}
const productDetails = (id)=>{
	const url = `https://fakestoreapi.com/products/${id}`;
	fetch(url)
	.then((res) => res.json())
	.then((data) => displayProductDetails(data));
	
}

const loadProduct = (products) => {
    const mainCardDiv = document.getElementById("product-card-wrapper");
    mainCardDiv.innerHTML = ''; // Clear container **once** before the loop

    products.forEach(product => {
        const cardElement = document.createElement("div");
        cardElement.className = "col-lg-3";

        cardElement.innerHTML = `
            <div class="card product-card h-100 shadow-sm border-0">
                <div class="img-wrapper d-flex align-items-center justify-content-center">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="card-body d-flex flex-column p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <span class="badge category-badge rounded-pill px-2 py-1">${product.category}</span>
                        <div class="rating-text">
                            <i class="bi bi-star-fill rating-star"></i> ${product.rating?.rate || 'N/A'} (${product.rating?.count || 0})
                        </div>
                    </div>
                    <h6 class="card-title text-truncate fw-semibold mb-3" style="font-size: 0.95rem;">${product.title}</h6>
                    <h5 class="fw-bold mb-3" style="color: #1f2937;">$${product.price}</h5>
                    
                    <div class="mt-auto row g-2">
                        <div class="col-6">
                            <button data-bs-toggle="modal" data-bs-target="#productDetails" onclick="productDetails(${product.id})" class="swift-btn btn-details w-100 d-flex align-items-center justify-content-center gap-1 py-2">
                                <i class="bi bi-eye"></i> Details
                            </button>
                        </div>
                        <div class="col-6">
                            <button class=" btn-add swift-btn w-100 d-flex align-items-center justify-content-center gap-1 py-2">
                                <i class="bi bi-cart3"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        mainCardDiv.append(cardElement);
    });
};


const loadProductCat = (cat) => {

	if(cat){
		const formattedCat = cat.replaceAll(" ", "%20");
		const url = `https://fakestoreapi.com/products/category/${formattedCat}`;
		fetch(`https://fakestoreapi.com/products/category/${formattedCat}`)
		.then(res => res.json())
		.then(data => loadProduct(data));
	}else{
		fetch(`https://fakestoreapi.com/products`)
		.then(res => res.json())
		.then(data => loadProduct(data));
	}
}

const dispalyCat = (cats) => {

	const productCatsContainer = document.getElementById("product-cat-wrapper");
	productCatsContainer.innerHTML = '';

	const setActiveButton = (clickedBtn) => {
        const buttons = productCatsContainer.querySelectorAll("button");
        buttons.forEach(btn => btn.classList.remove("active"));
        clickedBtn.classList.add("active");
    }

	// All button
	const allBtn = document.createElement("button");
	allBtn.innerText = "All";
	allBtn.className="active";
	allBtn.addEventListener("click", () => {
		loadProductCat();
		setActiveButton(allBtn);
	});
	productCatsContainer.append(allBtn);

	// Category buttons
	for (let cat of cats) {
		const catButton = document.createElement("button");
		catButton.innerText = cat;
		catButton.addEventListener("click", () => {
			loadProductCat(cat);
			setActiveButton(catButton);
		});
		productCatsContainer.append(catButton);
	}
}
loadProductCat();
loadCat();



