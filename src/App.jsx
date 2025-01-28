import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/guitarras"  

function App(){
  const [guitars]= useState(db)
  const [carrito, setCarrito] = useState(recuperaStorage())

  useEffect(guardaStorage, [carrito])

  function guardaStorage(){
    localStorage.setItem('carrito',
        JSON.stringify(carrito)
    )
  }

  function recuperaStorage(){
      const storageData = localStorage.getItem('carrito')
      return  storageData ? JSON.parse(storageData): []
  }

  function agregarCarrito(guitar){
    const carritoActual = [...carrito]
    const idCarrito = carritoActual
    .findIndex(g => g.id === guitar.id)
  if(idCarrito === -1)
    carritoActual.push({...guitar, cantidad:1})
  else
    carritoActual[idCarrito].cantidad++
  setCarrito(carritoActual)
  console.log('Agregado al carrito', guitar.nombre)
  }

  function quitaUno(id){
    const carritoNuevo = [...carrito]
    const idCarrito = carritoNuevo.findIndex(g => g.id === id)
    if(carritoNuevo[idCarrito].cantidad > 1)
      carritoNuevo[idCarrito].cantidad--
    setCarrito(carritoNuevo)
  }

  function quitaGuitarra(id){
    setCarrito(carrito.filter(g => g.id !== id))
  }

  function vaciarCarrito(){
    setCarrito([])
  }

  return (
  <>
    <Header 
    carrito={carrito}
    guitar={guitars[3]}
    agregarCarrito={agregarCarrito}
    quitaUno={quitaUno}
    quitaGuitarra={quitaGuitarra}
    vaciarCarrito={vaciarCarrito}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {guitars.map(g => (<Guitar 
          guitar={g}
          agregarCarrito={agregarCarrito}
          key={g.id}
          />
          ))}
        </div>
    </main>
    <Footer />
  </>
  )
}

export default App
