var product = new Vue({
    el: '#app',
    data: {
        product: "Star",
        image: './assets/star.jpg',
        inventory: 8,
        inStock:false,
        details:["60% gold", '40% metal', 'gender - female'],
        variants: [{
            variantId:999,
            variantColor: 'gold'
        }, {
            variantId:555,
            variantColor: 'yellow'
        }]
    }
})