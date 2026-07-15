import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const profiles = [
  { role: 'Paciente', desc: 'App do Paciente', access: 'L' },
  { role: 'Dentista', desc: 'App do Dentista + Portal', access: 'C/E' },
  { role: 'Assistente', desc: 'Apoio operacional', access: 'C/E' },
  { role: 'Gestor', desc: 'Visão executiva', access: 'L' },
  { role: 'Financeiro', desc: 'Cobranças, MRR', access: 'C/E' },
  { role: 'Suporte', desc: 'Console RBAC, Tickets', access: 'C/E/D' },
  { role: 'Laboratório', desc: 'Módulo lab', access: 'C/E/D' },
  { role: 'Fintech', desc: 'API', access: 'API' },
  { role: 'Jurídico', desc: 'Contratos CLM', access: 'L' },
]

export default function AdminRBAC() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Console RBAC</h1>
        <p className="text-slate-500 mt-1">Gestão de perfis e acessos (RNF-044).</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Matriz de Perfis Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Perfil</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Nível de Acesso Base</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((p) => (
                <TableRow key={p.role}>
                  <TableCell className="font-medium">{p.role}</TableCell>
                  <TableCell>{p.desc}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50">
                      {p.access}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-emerald-100 text-emerald-800">Ativo</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
