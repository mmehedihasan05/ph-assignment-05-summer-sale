const allProducts = document.querySelectorAll(".product");

const couponApplyBtn = document.querySelector("button#coupon_apply_btn");

const emptyAlertElem = document.querySelector("#empty_cart");
const cartList = document.querySelector("ol#cart_products");

const total_price = document.querySelector("#total_price");
const discount = document.querySelector("#discount");
const total = document.querySelector("#total");
const makePurchaseBtn = document.querySelector("button#make_purchase");

const scrollToBottom = document.querySelector("#scroll-to-bottom");
const resetAll = document.querySelector("#reset_all");
const pageBottom = document.querySelector("section.cart");
//
let subTotal = 0;
let isDiscountApplied = false;

allProducts.forEach((product) => {
    product.addEventListener("click", (event) => {
        const clicked_Element = event.target;
        let productParent =
            clicked_Element !== product ? clicked_Element.closest(".product") : event.target;

        addToCart(productParent);
    });
});

couponApplyBtn.addEventListener("click", () => {
    let couponCode = document.getElementById("coupon_code").value;

    if (subTotal >= 200 && couponCode === "SELL200") {
        isDiscountApplied = true;

        cartPriceUpdate();
    }
});

scrollToBottom.addEventListener("click", () => pageBottom.scrollIntoView());

resetAll.addEventListener("click", () => {
    subTotal = 0;
    emptyAlertElem.classList.remove("hidden");
    cartList.innerHTML = "";

    cartPriceUpdate();

    btnDisable(couponApplyBtn);
    btnDisable(makePurchaseBtn);

    document.getElementById("coupon_code").value = "";
});

const addToCart = (productParent) => {
    const productName = productParent.querySelector("#product_title").innerText;
    let productPrice = productParent.querySelector("#product_price").innerText;
    productPrice = parseFloat(productPrice);

    subTotal += productPrice;

    cartProductUpdate(productName);
    cartPriceUpdate();
};

const cartProductUpdate = (productName) => {
    // Remove 'empty cart alert text' and append new selected product

    emptyAlertElem.classList.add("hidden");

    let listElement = document.createElement("li");
    listElement.innerText = productName;

    cartList.appendChild(listElement);
};

// Add selected price to total price
const cartPriceUpdate = () => {
    let discountAmount = discountCalc(subTotal);

    total_price.innerText = formatAmount(subTotal);

    discount.innerText = formatAmount(discountAmount);

    total.innerText = formatAmount(subTotal - discountAmount);

    btnEnable(199, couponApplyBtn);
    btnEnable(0, makePurchaseBtn);
};

const discountCalc = (subTotal) => {
    if (subTotal >= 200 && isDiscountApplied) {
        return (subTotal / 100) * 20;
    }
    return 0;
};

const formatAmount = (amount) => amount.toFixed(2) + " Tk";

const btnEnable = (conditionalAmount, targetBtn) => {
    if (subTotal > conditionalAmount && targetBtn.hasAttribute("disabled")) {
        targetBtn.removeAttribute("disabled");
    }
};

const btnDisable = (targetBtn) => targetBtn.setAttribute("disabled", "disabled");
