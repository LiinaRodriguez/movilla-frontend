import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Nav */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex flex-1 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">Movilla</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/signup">
                <Button>Crear Cuenta</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container pt-24 sm:pt-32">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
            Tu guía de transporte en la ciudad
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Descubre las mejores rutas, conoce los horarios en tiempo real y
            planifica tus viajes de manera eficiente.
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Link href="/signup">
              <Button size="lg" className="w-full min-[400px]:w-auto">
                Comenzar ahora
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full min-[400px]:w-auto"
            >
              Ver rutas disponibles
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container space-y-8 py-24 sm:py-32">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Rutas en tiempo real</h3>
            <p className="text-muted-foreground">
              Monitorea la ubicación de los buses y calcula tiempos de llegada
              precisos
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Planificador de viajes</h3>
            <p className="text-muted-foreground">
              Encuentra la mejor ruta para llegar a tu destino con múltiples
              opciones
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Notificaciones</h3>
            <p className="text-muted-foreground">
              Recibe alertas sobre demoras, cambios de ruta o interrupciones del
              servicio
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
