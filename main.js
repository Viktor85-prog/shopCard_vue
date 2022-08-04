var eventBus= new Vue()


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

            <product-tabs :reviews='reviews'></product-tabs>

           
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
            }],
            reviews: []
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})


Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
            <b>Ошибка</b>
            <ul>
            <li v-for="error in errors">{{error}}</li>
            </ul>
    </p>
    <p>
    <label for="name">Name:</label>
    <textarea id="name" v-model="name"></textarea>
    </p>
    <p>
    <label for="review">Review:</label>
    <textarea id="review" v-model="review"></textarea>
    </p>
    <p>   
    <label for="rating">Rating:</label>
    <select id='rating' v-model.number="rating">
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
    </select>
    </p>
    <p>
      <input type="submit" value="Submit">
    </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null

            } else {

                if (!this.name) this.errors.push('нужно имя')
                if (!this.review) this.errors.push('нужно описание')
                if (!this.rating) this.errors.push('нужен рейтинг')
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            requered: true
        }
    },
    template: `
    <div>
    <h2>Reviews</h2>
    <span class="tab"
    :class="{activeTab:selectedTab === tab}"
    v-for="(tab,index) in tabs" :key="index"
    @click="selectedTab =tab"
    >{{tab}}</span>
    
    <div v-show="selectedTab === 'Reviews'">
    <p v-if="!reviews.length">rew</p>    
    <ul>
    <li v-for="review in reviews">
    <p>{{review.name}}</p>
    <p>Rating: {{review.rating}}</p>
    <p>{{review.review}}</p>
    </li>
    </ul>        
    </div>
    <product-review  v-show="selectedTab === 'Make a Review'"></product-review>

    
    
    
    
    
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
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