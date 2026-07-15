import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, MapPin, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const mockDentists = [
  { name: 'Dr. Aline Costa', spec: 'Ortodontia', dist: '1.2 km', nps: 92 },
  { name: 'Dr. Bruno Souza', spec: 'Ortodontia', dist: '3.4 km', nps: 88 },
]

export default function PatientSearch() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Encontre um Especialista</h1>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input placeholder="Buscar por CEP, Bairro ou Nome..." className="pl-10 h-12 text-base" />
        </div>
        <Button className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700">Buscar</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockDentists.map((d, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200">
                    <img
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=${i % 2 === 0 ? 'female' : 'male'}&seed=${i}`}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{d.name}</h3>
                    <p className="text-sm text-slate-500">{d.spec}</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-emerald-800" /> {d.nps} NPS
                </Badge>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {d.dist}
                </span>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
