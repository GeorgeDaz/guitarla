import { useState, useEffect } from 'react'
import { db } from './data/db'
import Header from "./components/Header"
import Guitar from "./components/Guitar"




function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart(cart => [...cart, item])

    }
    // saveLocalStorage()
  }
  function removeFromCart(itemId) {
    setCart(prevcart => prevcart.filter(guitar => guitar.id !== itemId))
  }

  function incrementar(itemId) {
    const updatedCart = cart.map(item => {
      if (item.id === itemId && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      } else {
        return item

      }
    })
    setCart(updatedCart)
  }

  function disminuir(itemId) {
    const updatedCart = cart.map(item => {
      if (item.id === itemId && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      } else return item
    })
    setCart(updatedCart)
  }

  function vaciarCarrito() {
    setCart([])
  }

  // function saveLocalStorage() {
  //   localStorage.setItem('cart', JSON.stringify(cart))
  // }
  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} incrementar={incrementar} disminuir={disminuir} vaciarCarrito={vaciarCarrito} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} setCart={setCart} cart={cart} addToCart={addToCart} />
          )
          )}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
