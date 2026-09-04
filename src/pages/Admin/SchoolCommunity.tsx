import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  GraduationCap,
  MessagesSquare,
  BookOpen,
  Users,
  Search,
  Plus,
  Pin,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  SchoolCourse,
  MOCK_SCHOOL_COURSES,
  CommunityTopic,
  MOCK_COMMUNITY_TOPICS,
} from './mockData'

export default function AdminSchoolCommunity() {
  const [courses, setCourses] = useState<SchoolCourse[]>(MOCK_SCHOOL_COURSES)
  const [topics, setTopics] = useState<CommunityTopic[]>(MOCK_COMMUNITY_TOPICS)
  const [activeTab, setActiveTab] = useState<'escola' | 'comunidade'>('escola')
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleTogglePin = (topicId: string) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? {
              ...t,
              status: t.status === 'fixado' ? 'aberto' : 'fixado',
            }
          : t,
      ),
    )
    toast({
      title: 'Status do Tópico Alterado!',
      description: 'A moderação da comunidade foi atualizada com sucesso.',
    })
  }

  const handleApproveCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              status: 'ativo',
            }
          : c,
      ),
    )
    toast({
      title: 'Conteúdo Publicado na Escola MWS!',
      description:
        'O módulo de capacitação já está disponível para todos os ortodontistas credenciados.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Escola MWS & Moderação da Comunidade
          </h1>
          <p className="text-slate-500 mt-1">
            Gestão dos conteúdos de certificação obrigatória, imersões presenciais e moderação do
            fórum clínico de ortodontistas.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <Button
            variant={activeTab === 'escola' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('escola')}
            className={
              activeTab === 'escola' ? 'bg-slate-900 text-xs shadow-sm' : 'text-xs text-slate-600'
            }
          >
            <GraduationCap className="w-3.5 h-3.5 mr-1.5" /> Escola MWS ({courses.length})
          </Button>
          <Button
            variant={activeTab === 'comunidade' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('comunidade')}
            className={
              activeTab === 'comunidade'
                ? 'bg-slate-900 text-xs shadow-sm'
                : 'text-xs text-slate-600'
            }
          >
            <MessagesSquare className="w-3.5 h-3.5 mr-1.5" /> Fórum & Comunidade ({topics.length})
          </Button>
        </div>
      </div>

      {activeTab === 'escola' && (
        <div className="space-y-6">
          {/* Métricas da Escola */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-slate-500">
                  Ortodontistas em Treinamento Obrigatório
                </span>
                <p className="text-2xl font-bold text-slate-900 mt-2">182 Licenciados</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Treinamento preparatório p/ novos credenciados
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-emerald-800">
                  Taxa Média de Conclusão
                </span>
                <p className="text-2xl font-bold text-emerald-900 mt-2">89.6%</p>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Excelente retenção e engajamento EAD
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50/40">
              <CardContent className="p-4">
                <span className="text-xs font-medium text-purple-800">
                  Imersões Presenciais Agendadas
                </span>
                <p className="text-2xl font-bold text-purple-900 mt-2">4 Turmas (SP)</p>
                <p className="text-[11px] text-purple-700 mt-1">
                  Hands-on de colagem robótica lingual
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Cursos */}
          <div className="grid gap-4">
            {courses.map((c) => (
              <Card
                key={c.id}
                className="border-slate-200 shadow-sm hover:border-slate-300 transition-all"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {c.id}
                        </span>
                        <h4 className="font-bold text-base text-slate-900">{c.title}</h4>
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                          {c.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>Instrutor:</strong> {c.instructor} • <strong>Carga:</strong>{' '}
                        {c.duration} ({c.modulesCount} módulos)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-slate-50">
                        {c.enrolledDentists} inscritos ({c.completionRate}% concluído)
                      </Badge>
                      {c.status === 'ativo' ? (
                        <Badge className="bg-emerald-600 text-white text-xs">Ativo EAD</Badge>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                          onClick={() => handleApproveCourse(c.id)}
                        >
                          Publicar Curso
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Barra de Progresso Médio da Rede */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Progresso da Turma</span>
                      <span className="font-bold text-slate-800">{c.completionRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${c.completionRate}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'comunidade' && (
        <div className="space-y-4">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MessagesSquare className="w-4 h-4 text-emerald-600" /> Moderação da Comunidade &
                Fórum Clínico
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Acompanhamento e mediação das discussões técnicas entre ortodontistas credenciados e
                mentores MWS
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 divide-y divide-slate-100">
              {topics.map((t) => (
                <div
                  key={t.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {t.status === 'fixado' && (
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-[10px] flex items-center gap-1">
                          <Pin className="w-3 h-3" /> Fixado pela ADM
                        </Badge>
                      )}
                      <h4 className="font-semibold text-slate-900 text-sm">{t.title}</h4>
                      <Badge variant="outline" className="text-[10px] bg-slate-50">
                        {t.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Por <strong>{t.authorName}</strong> ({t.authorRole}) • Última resposta:{' '}
                      {t.lastActivity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-xs text-slate-500">
                      <span className="font-bold text-slate-800">{t.repliesCount}</span> respostas •{' '}
                      <span className="font-bold text-slate-800">{t.likesCount}</span> apoios
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-8 border-slate-300"
                      onClick={() => handleTogglePin(t.id)}
                    >
                      <Pin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      {t.status === 'fixado' ? 'Desafixar' : 'Fixar no Topo'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
