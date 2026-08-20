import { useEffect, useState } from 'react'
import { getCases } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  analyzing: { label: 'Em Análise', variant: 'secondary' },
  in_production: { label: 'Em Produção', variant: 'default' },
  delivered: { label: 'Entregue', variant: 'outline' },
}

interface GeneralCase {
  id: string
  dentistName: string
  patientName: string
  status: 'analyzing' | 'in_production' | 'delivered'
  sla_deadline: string
  notes: string
}

const MOCK_GENERAL_CASES: GeneralCase[] = [
  {
    id: 'CAS-2026-001',
    dentistName: 'Dr. Roberto Fernandes',
    patientName: 'Maria Silva',
    status: 'in_production',
    sla_deadline: '2026-02-28',
    notes: 'Prioridade no fechamento de diastema superior.',
  },
  {
    id: 'CAS-2026-002',
    dentistName: 'Dr. Roberto Fernandes',
    patientName: 'João Santos',
    status: 'analyzing',
    sla_deadline: '2026-03-01',
    notes: 'Avaliar desgastes IPR recomendados nos dentes 31-41.',
  },
  {
    id: 'CAS-2026-003',
    dentistName: 'Dr. Roberto Fernandes',
    patientName: 'Ana Costa',
    status: 'delivered',
    sla_deadline: '2026-02-24',
    notes: 'Inclui kit de attachments e gabarito.',
  },
  {
    id: 'CAS-2026-004',
    dentistName: 'Dra. Juliana Mendes',
    patientName: 'Pedro Lima',
    status: 'analyzing',
    sla_deadline: '2026-03-03',
    notes: 'Paciente em fase final de dentição mista.',
  },
  {
    id: 'CAS-2026-005',
    dentistName: 'Dr. Carlos Eduardo',
    patientName: 'Carla Souza',
    status: 'in_production',
    sla_deadline: '2026-03-05',
    notes: 'Fotos extras anexadas no prontuário.',
  },
]

export default function Cases() {
  const [cases] = useState<GeneralCase[]>(MOCK_GENERAL_CASES)
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Casos Clínicos</h2>
        {user?.role === 'dentist' && (
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Novo Caso
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Solicitações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prazo SLA</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id.substring(0, 8)}</TableCell>
                  <TableCell>
                    <Badge variant={statusMap[c.status]?.variant || 'default'}>
                      {statusMap[c.status]?.label || c.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(c.sla_deadline).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {c.notes}
                  </TableCell>
                </TableRow>
              ))}
              {cases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    Nenhum caso encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
