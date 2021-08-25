import React, { Component } from 'react';
import { message ,Button,Input} from 'antd';
class App extends Component {
  constructor() {
    super();
    this.state = {
      products:[
        {
          productId:"serram8",
          productName:"8GB RAM SERVER",
          price:100
        },
        {
          productId:"serram16",
          productName:"16GB RAM SERVER",
          price:1025.50
        },
        {
          productId:"serram32",
          productName:"32GB RAM SERVER",
          price:2549.99
        }
      ],
      promoCodes:[
        {
          code:"PLSD123",
          discountPercentage:10,
          minAmount:5000
        },
        {
          code:"PLSD456",
          discountPercentage:15,
          minAmount:10000
        }
      ],
      cart:[],
      appliedPromoCode:null,
      promoText:'',
      itemTotal:null
    };
  }
  addItemToCart=(product)=>{
    const {cart}=this.state
    const index=cart.findIndex((cartItem)=> cartItem.productId===product.productId)
    var newCart
    if(index!==-1){
      newCart=cart
      newCart[index]={...cart[index],quantity:cart[index].quantity+1}
    }
    else{
      newCart=[...cart,{productId:product.productId,
        productName:product.productName,
        price:product.price,
        quantity:1,
      }]
    }
    this.setState({cart:newCart},()=>{this.calculateTotal()})

  }
  calculateTotal=()=>{
    const {cart}=this.state
    var itemTotal=0
    cart.map((item)=>{
      itemTotal=itemTotal+(item.price*item.quantity)
    })
    this.setState({itemTotal:itemTotal})
  }
  applyPromoCode=()=>{
    const {products,promoCodes,cart,appliedPromoCode,itemTotal,promoText}=this.state
    const enteredPromoCode=promoCodes.find((promoCode)=>promoCode.code.toLowerCase()===promoText.toLowerCase())
    if(enteredPromoCode){
      if(enteredPromoCode.minAmount<=itemTotal){
        this.setState({appliedPromoCode:enteredPromoCode},()=>{
          message.success('Promo code applied successfully');
        })
      }
      else{
        message.info('Add more items to apply this Promo code');
      }
    }
    else
    {
      message.error('Promo code is no valid');
    }

  }
  render() {
    const {products,promoCodes,cart,appliedPromoCode,itemTotal,promoText}=this.state
    return (
      <div className="container">
      <div className="section-container">
        <div className="section-header">Products</div>
      {products.map((product)=>{
          return(
            <div className="product-container">
              <div className="product-details">
                <div>
                  {product.productName}
                </div>
                <div>{product.price}</div>
              </div>
              <Button type="primary" onClick={()=>{
                this.addItemToCart(product)}}>
                Add to Cart
              </Button>
            </div>
          )
      })}
      </div>
      <div className="section-container">
      <div className="section-header">Checkout Cart</div>
        <div style={{display:"flex",gap:"20px",margin:"10px 0"}}>
          <Input value={promoText} onChange={(e)=>{
            this.setState({promoText:e.target.value})
          }} placeholder="Enter a promo code"/>
          <Button type="primary" shape="round" onClick={()=>this.applyPromoCode()}>Apply</Button>
        </div>
        {cart.map((item)=>{
          return(
            <div className="cart-element">
              <div>
                <div>
                  {item.productName}
                </div>
                <div>{item.price}</div>
              </div>
              <div>
                X {item.quantity}
              </div>
              <div>
                {item.price*item.quantity}
                </div>
            </div>
          )
        })}
        <div className="section-header">Total: {appliedPromoCode?itemTotal-(itemTotal*(appliedPromoCode.discountPercentage/100)):itemTotal}</div>
      </div>
    </div>
    );
  }
}

export default App;