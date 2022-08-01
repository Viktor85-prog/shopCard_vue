var product = new Vue({
    el: '#app',
    data: {
        product: "Star",
        image: './assets/star_gold.jpg',
        inventory: 8,
        inStock: false,
        details: ["60% gold", '40% metal', 'gender - female'],
        variants: [{
            variantId: 999,
            variantColor: 'gold',
            variantImage: './assets/star_gold.jpg'
        }, {
            variantId: 555,
            variantColor: 'yellow',
            variantImage: './assets/star_yellow.jpg'
        }],
        cart: 0
    },
    methods: {
        addToCart () {
            this.cart += 1
        },
        updateProduct (variantImage) {
            this.image = variantImage
        }
    }
})