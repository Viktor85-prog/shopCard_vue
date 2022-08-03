Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div>
        <div class="product">
        <div class="product-image">
            <img v-bind:src="image" alt="">
        </div>
        <div class="product-info">
            <h1>{{title}}</h1>
            <!-- <h v-show="inStock">cool star</h> -->
            <p v-if="inStock">In Stock</p>
            <p v-else-if="!inStock">Allmost sold out</p>
            <!-- <p v-else>Out Stock</p> -->
            <p>Premium: {{premium}}</p>
            <p>shipping: {{shipping}}</p>
            <ul>
                <li v-for="material in details">{{material}}</li>
            </ul>
            <div v-for="(variant, index) in variants" :key="variant.variantColor" class="colors color-box"
                :style="{backgroundColor:variant.variantColor}">
                <p :style="{fontSize:variant.fz}" @mouseover="updateProduct(index)">
                    {{variant.variantColor}}</p>
            </div>
            </div>
        
            </div>
            <button v-on:click="addToCart" :class="{disabled:!inStock}">Add</button>
    </div>
`,
    data() {
        return {
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
            }]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
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
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }
})



var product = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }

})