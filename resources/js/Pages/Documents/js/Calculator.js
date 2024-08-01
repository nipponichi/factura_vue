
export var Calculator = function () {

    function calculateGross(product) {
        return product.quantity * product.price;
    }

    function calculateTax(product) {
        product.priceTax = parseFloat((product.taxes / 100) * parseFloat(product.subTotal));
        return product.priceTax;
    }


    function calculateTotal(product) {
        let taxAmount = this.calculateTax(product)
        product.total = taxAmount + parseFloat(product.subTotal)
        return product.total.toFixed(2)
    }

    function calculateSubtotal(product) {
        let subtotalWithoutDiscount =  (parseFloat(product.quantity) * parseFloat(product.price))
        product.subTotal = subtotalWithoutDiscount - ((product.discount/100) * subtotalWithoutDiscount);
        return product.subTotal
    }

    return {
        calculateGross,
        calculateTax,
        calculateTotal,
        calculateSubtotal
    };

}(window);