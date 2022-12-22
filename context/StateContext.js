import React, {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setshowCart] = useState(false);

    const [cartItems, setcartItems] = useState([]);

    const [totalPrice, settotalPrice] = useState(0);

    const [totalQuantities, settotalQuantities] = useState(0);

    const [qty, setqty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {

            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quatity: cartProduct.quantity + quantity
                }
            })

            setcartItems(updatedCartItems);
        }else{
            product.quantity = quantity;

            setcartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart!`);
    }

    const onRemove = (product) =>{
        foundProduct = cartItems.find((item) => item._id === product._id);
        let newCartItems = cartItems.filter((item) => item._id !== product._id);

        settotalPrice((previousTotalPrice) => previousTotalPrice - foundProduct.price * foundProduct.quantity);
        settotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setcartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        let newCartItems = cartItems.filter((item) => item._id !== id);

        if (value === 'inc'){
            setcartItems( prevCartItems => 
                prevCartItems.map( item => {          
                    if (item._id === id){
                        return {...item, quantity: foundProduct.quantity + 1}
                    }
                    return item
                })
            );
            //setcartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
            settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            settotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        }else if( value === 'dec'){
            if (foundProduct.quantity > 1){
                setcartItems( prevCartItems => 
                    prevCartItems.map( item => {          
                        if (item._id === id){
                            return {...item, quantity: foundProduct.quantity - 1}
                        }
                        return item
                    })
                );
                //setcartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                settotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setqty((prevqty) => prevqty + 1);
    }
    const decQty = () => {
        setqty((prevqty) => {
            if (prevqty - 1 < 1) return 1;
            
            return prevqty - 1;
        });
    }

    return(
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            setshowCart,
            toggleCartItemQuantity,
            onRemove,
            setcartItems,
            settotalPrice,
            settotalQuantities
        }}>
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);