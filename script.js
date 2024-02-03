fetchData('Men');
function changeTab(sectionNumber) {
    // Reset background color for all tabs
    document.querySelectorAll('.tab').forEach(tab => {
      tab.style.backgroundColor = '#F2F2F2';
      tab.style.color = '#000000';
    });

    // Set background color for the focused tab
    const focusedTab = document.getElementById(`section${sectionNumber}`);
    focusedTab.style.backgroundColor = '#000000';
    focusedTab.style.color = '#ffffff';// Change to your desired color

    fetchData(sectionNumber);
  }
const productContent = document.getElementById('contentWrapper');
function fetchData(productName) {
    fetch(`https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json`)
        .then(response => response.json())
        .then(data => {
            while (productContent.firstChild) {
                productContent.removeChild(productContent.firstChild);
            }
            data.categories.forEach(allProduct => {
                    if (allProduct.category_name === productName) {
                        allProduct.category_products.forEach(product => {
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product');
                        productDiv.innerHTML = `<div class="card">
                          ${ product.badge_text !== null ? `<div class="placeHolder">${product.badge_text}</div> `: "" }
                          <div class="image">
                            <img src="${product.image}" alt="${product.title}">
                          </div>
                          <div class="content">
                          <div class="item_details">
                            <span class="title">${product.title}</span>
                            <span class="dot"></span>
                            <span class="site">${product.vendor}</span>
                            </div> 
                          
                            <div class="price_details">
                              <span class="price">Rs ${product.price}</span> 
                              <span class="comp_price">${product.compare_at_price}</span>
                              <span class="off">50% Off</span>
                            </div>
                            <button class="add_card"> Add To Cart</button>
                          </div>
                        </div>`
                        productContent.appendChild(productDiv);
                        })
                    }
                })
            })
        .catch(error => console.error('Error fetching data:', error));
}