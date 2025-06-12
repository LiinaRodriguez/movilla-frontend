'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  const handleLogout = async () => {
    // Llama al backend para eliminar la cookie 'token' (httpOnly)
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  }

  // Datos de ejemplo - estos vendrían de tu API
  const routes = [
    { id: 'R1', name: 'Ruta 01 Madrid - Super Gas', status: '-' },
    { id: 'R2', name: 'Ruta 02 Hospital - Madrid', status: '5 min retraso' },
    { id: 'R3', name: 'Ruta 03 Covisan - Retiro - La madrid', status: 'En tiempo' },
  ]

  const favorites = [
    { id: 'F1', name: 'Casa - Trabajo', route: 'R1' },
    { id: 'F2', name: 'Casa - Universidad', route: 'R2' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <span className="font-bold ">Movilla</span>
          <Button className='pointer' onClick={handleLogout} variant="ghost">
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Rutas Activas */}
          <Card>
            <CardHeader>
              <CardTitle>Rutas Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent ${selectedRoute === route.id ? 'border-primary' : ''
                      }`}
                    onClick={() => setSelectedRoute(route.id)}
                  >
                    <div>
                      <h3 className="font-medium">{route.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Status: {route.status}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rutas Favoritas */}
          <Card>
            <CardHeader>
              <CardTitle>Mis Rutas Favoritas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {favorites.map((favorite) => (
                  <div
                    key={favorite.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-medium">{favorite.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Ruta:{' '}
                        {routes.find((r) => r.id === favorite.route)?.name}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Iniciar viaje
                    </Button>
                  </div>
                ))}
                <Button className="w-full">
                  Agregar nueva ruta favorita
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mapa o Información Detallada */}
          {selectedRoute && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Detalles de la Ruta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-lg border bg-accent/50 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Aquí iría el mapa o información detallada de la ruta{' '}
                    {selectedRoute}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}