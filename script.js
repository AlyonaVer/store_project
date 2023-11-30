// add cart

var cart = [];

var Item = function(name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};

function addItemToCart(name, price, count) {
    var item = new Item (name, price, count);
    cart.push(item);

}
// add date
