const loadCat = () => {
	fetch("https://fakestoreapi.com/products/categories")
	.then((res) => res.json())
	.then((data) => dispalyCat(data));
}

const loadProduct = (products) => {
    const mainCardDiv = document.getElementById("product-card-wrapper");
    mainCardDiv.innerHTML = ''; // Clear container **once** before the loop

    products.forEach(product => {
        console.log(product);

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
                            <button class="swift-btn btn-details w-100 d-flex align-items-center justify-content-center gap-1 py-2">
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
		console.log(url);
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

	// All button
	const allBtn = document.createElement("button");
	allBtn.innerText = "All";
	allBtn.addEventListener("click", () => {
		loadProductCat();
	});
	productCatsContainer.append(allBtn);

	// Category buttons
	for (let cat of cats) {
		const catDiv = document.createElement("button");
		catDiv.innerText = cat;
		catDiv.addEventListener("click", () => {
			loadProductCat(cat);
		});
		productCatsContainer.append(catDiv);
	}
}
loadProductCat();
loadCat();
