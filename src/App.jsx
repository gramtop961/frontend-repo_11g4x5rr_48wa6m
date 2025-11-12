import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])
  const [error, setError] = useState('')

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // try list first
        const res = await fetch(`${BACKEND_URL}/products`)
        if (!res.ok) throw new Error('Need seeding')
        const data = await res.json()
        if (Array.isArray(data) && data.length === 0) {
          // seed sample
          await fetch(`${BACKEND_URL}/seed`, { method: 'POST' })
          const res2 = await fetch(`${BACKEND_URL}/products`)
          const data2 = await res2.json()
          setProducts(data2)
        } else {
          setProducts(data)
        }
      } catch (e) {
        try {
          await fetch(`${BACKEND_URL}/seed`, { method: 'POST' })
          const res3 = await fetch(`${BACKEND_URL}/products`)
          const data3 = await res3.json()
          setProducts(data3)
        } catch (err) {
          setError('Unable to load products. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.product.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const placeOrder = async () => {
    if (cart.length === 0) return
    try {
      const payload = {
        customer_name: 'Walk-in Customer',
        customer_email: 'customer@example.com',
        shipping_address: '123 Packaging Ave, Box City',
        items: cart.map((c) => ({ product_id: c.product.id, quantity: c.quantity })),
      }
      const res = await fetch(`${BACKEND_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Order failed')
      alert(`Order placed! Total: $${data.total}`)
      setCart([])
    } catch (e) {
      alert('Order could not be placed.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Navbar cartCount={cartCount} onOpenCart={placeOrder} />
      <Hero />

      <main id="catalog" className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Popular supplies</h2>
            <p className="text-gray-600">Shop packaging essentials for your business</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Items in cart: <span className="font-semibold">{cartCount}</span></p>
            <p className="text-sm text-gray-900 font-semibold">Total: ${cartTotal.toFixed(2)}</p>
            <button onClick={placeOrder} disabled={cart.length===0} className="mt-2 rounded-md bg-orange-600 text-white px-4 py-2 font-semibold disabled:opacity-40">Checkout</button>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading products...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </main>

      <section id="about" className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900">About HNG PACKAGING SOLUTION</h3>
            <p className="mt-2 text-gray-600">We provide reliable packaging materials for e-commerce, logistics, and manufacturers. From corrugated boxes to cushioning materials, we help protect your products end-to-end.</p>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li>• Fast shipping nationwide</li>
            <li>• Bulk discounts for businesses</li>
            <li>• Eco-friendly options available</li>
          </ul>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} HNG PACKAGING SOLUTION</p>
          <p>Contact: hello@hngpackaging.example</p>
        </div>
      </footer>
    </div>
  )
}
