'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      router.push('/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <Button onClick={handleLogout} variant="outline">
          Cerrar sesión
        </Button>
      </div>
      <div className="grid gap-6">
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Este es el panel principal de tu aplicación.
          </p>
        </div>
      </div>
    </div>
  )
}