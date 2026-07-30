import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { CalendarClock, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const mockAppointments = [
  { time: '09:00', patient: 'Maria Silva', type: 'Acompanhamento' },
  { time: '10:30', patient: 'João Santos', type: 'Instalação de Alinhador' },
  { time: '14:00', patient: 'Ana Costa', type: 'Consulta Final' },
  { time: '15:30', patient: 'Pedro Lima', type: 'Manutenção' },
  { time: '16:45', patient: 'Carla Souza', type: 'Avaliação' },
]

export default function DentistAgenda() {
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Agenda de Hoje</h1>
          <p className="text-slate-500">Suas consultas e compromissos do dia.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" /> Novo Agendamento
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Consultas Hoje</CardTitle>
          <CalendarClock className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-900">{mockAppointments.length}</div>
          <p className="text-xs text-slate-500 mt-1">Agendadas para hoje</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compromissos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAppointments.map((apt, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-emerald-100">
                  <span className="text-sm font-bold text-emerald-700">
                    {apt.time.split(':')[0]}
                  </span>
                  <span className="text-xs text-emerald-600">{apt.time.split(':')[1]}</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{apt.patient}</p>
                  <p className="text-sm text-slate-500">{apt.type}</p>
                </div>
              </div>
              <Link
                to="/dentist/patients"
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Detalhes
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
