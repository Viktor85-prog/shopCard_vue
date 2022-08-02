var product = new Vue({
    el: '#app',
    data: {
        brand: "XAM",
        product: "Star",
        selectedVariant: 0,
        details: ["60% gold", '40% metal', 'gender - female'],
        variants: [{
            variantId: 999,
            variantColor: 'gold',
            variantImage: './assets/star_gold.jpg',
            fz: '15px',
            variantQuantity: 0
        }, {
            variantId: 555,
            variantColor: 'yellow',
            variantImage: './assets/star_yellow.jpg',
            fz: '10px',
            variantQuantity: 15
        }],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return `${this.brand}  ${this.product}`
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})