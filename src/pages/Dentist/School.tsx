import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  GraduationCap,
  PlayCircle,
  CheckCircle2,
  Lock,
  Award,
  BookOpen,
  Clock,
  Video,
  FileCheck,
  Star,
  Download,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface CourseModule {
  id: string
  title: string
  duration: string
  status: 'concluido' | 'em_andamento' | 'bloqueado'
  lessonsCount: number
}

interface Course {
  id: string
  title: string
  category: 'Obrigatório' | 'Especialização' | 'Masterclass'
  instructor: string
  description: string
  progress: number
  totalHours: string
  badgeText: string
  modules: CourseModule[]
}

const MOCK_COURSES: Course[] = [
  {
    id: 'crs-1',
    title: 'Credenciamento Oficial & Biomecânica Magic Wire',
    category: 'Obrigatório',
    instructor: 'Dr. Leonardo Vasconcelos (PhD em Ortodontia)',
    description:
      'Fundamentos essenciais do protocolo Magic Wire, biomecânica lingual e planejamento 3D.',
    progress: 80,
    totalHours: '12 horas',
    badgeText: 'Certificação Obrigatória',
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: Princípios Biomecânicos e Elasticidade dos Polímeros',
        duration: '2h 30m',
        status: 'concluido',
        lessonsCount: 6,
      },
      {
        id: 'm2',
        title: 'Módulo 2: Protocolo de Escaneamento e Tomografia 3D',
        duration: '3h 15m',
        status: 'concluido',
        lessonsCount: 8,
      },
      {
        id: 'm3',
        title: 'Módulo 3: Colagem de Attachments e Guia de IPR',
        duration: '3h 00m',
        status: 'em_andamento',
        lessonsCount: 5,
      },
      {
        id: 'm4',
        title: 'Módulo 4: Gestão de Refinamentos e Finalização Oclusal',
        duration: '3h 15m',
        status: 'bloqueado',
        lessonsCount: 7,
      },
    ],
  },
  {
    id: 'crs-2',
    title: 'Tratamento Avançado de Classe II e Casos Cirúrgicos',
    category: 'Especialização',
    instructor: 'Dra. Patricia Medeiros',
    description:
      'Protocolos clínicos de distalização sequencial e ancoragem esquelética com mini-implantes.',
    progress: 35,
    totalHours: '8 horas',
    badgeText: 'Avançado',
    modules: [
      {
        id: 'm5',
        title: 'Módulo 1: Distalização Sequencial Superior',
        duration: '2h 00m',
        status: 'concluido',
        lessonsCount: 4,
      },
      {
        id: 'm6',
        title: 'Módulo 2: Mini-implantes Extra-alveolares associados ao Magic Wire',
        duration: '3h 00m',
        status: 'em_andamento',
        lessonsCount: 6,
      },
      {
        id: 'm7',
        title: 'Módulo 3: Casos Limítrofes Cirúrgicos',
        duration: '3h 00m',
        status: 'bloqueado',
        lessonsCount: 5,
      },
    ],
  },
  {
    id: 'crs-3',
    title: 'Ortodontia Digital Teens & Magic Wire em Crianças',
    category: 'Masterclass',
    instructor: 'Dr. Fernando Prado',
    description:
      'Manejo de dentição mista, guias de erupção e expansão maxilar com o protocolo Magic Wire.',
    progress: 0,
    totalHours: '6 horas',
    badgeText: 'Novo Curso',
    modules: [
      {
        id: 'm8',
        title: 'Módulo 1: Dentição Mista e Guia de Erupção',
        duration: '2h 00m',
        status: 'bloqueado',
        lessonsCount: 4,
      },
      {
        id: 'm9',
        title: 'Módulo 2: Adesão e Motivação do Paciente Jovem',
        duration: '2h 00m',
        status: 'bloqueado',
        lessonsCount: 3,
      },
      {
        id: 'm10',
        title: 'Módulo 3: Casos Clínicos Infantis Comentados',
        duration: '2h 00m',
        status: 'bloqueado',
        lessonsCount: 5,
      },
    ],
  },
]

export default function DentistSchool() {
  const [courses] = useState<Course[]>(MOCK_COURSES)
  const [selectedCourseId, setSelectedCourseId] = useState<string>('crs-1')
  const { toast } = useToast()

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0]

  const handleStartLesson = (moduleTitle: string) => {
    toast({
      title: 'Iniciando Videoaula',
      description: `Abrindo reprodutor de vídeo para: ${moduleTitle}`,
    })
  }

  const handleDownloadCert = () => {
    toast({
      title: 'Certificado Gerado',
      description: 'O certificado digital oficial MWS com QR Code foi baixado.',
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto animate-fade-in-up">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Escola MWS de Ortodontia Digital
            </h1>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              Educação Continuada
            </Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Treinamentos obrigatórios de credenciamento, protocolos biomecânicos e certificações da
            rede.
          </p>
        </div>

        <Button onClick={handleDownloadCert} variant="outline" className="border-slate-300">
          <Award className="w-4 h-4 mr-2 text-purple-600" /> Meus Certificados
        </Button>
      </div>

      {/* Hero Card de Destaque */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white shadow-md">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
                Treinamento Obrigatório
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">
                Credenciamento Oficial Magic Wire System (Nível Master)
              </h2>
              <p className="text-purple-100 text-sm leading-relaxed">
                Complete todos os módulos obrigatórios para manter o selo de Ortodontista
                Credenciado Master e receber indicações diretas de pacientes da plataforma.
              </p>
              <div className="flex items-center gap-4 text-xs text-purple-200 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 12 horas totais
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> 4 Módulos
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Avaliação 4.9/5
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur p-4 rounded-xl border border-white/20 text-center w-full md:w-56 flex-shrink-0">
              <p className="text-xs text-purple-200 font-medium">Seu Progresso</p>
              <p className="text-3xl font-bold text-white my-1">80%</p>
              <Progress value={80} className="h-2 bg-white/20" />
              <p className="text-[11px] text-purple-200 mt-2">Faltam 2 aulas para a prova final</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Cursos e Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Catálogo de Cursos */}
        <div className="md:col-span-5 space-y-3">
          <h3 className="text-base font-bold text-slate-900">Trilhas de Aprendizado</h3>
          <div className="space-y-3">
            {courses.map((c) => {
              const isSelected = c.id === selectedCourseId
              return (
                <Card
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/40 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          c.category === 'Obrigatório'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }
                      >
                        {c.badgeText}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">{c.totalHours}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>

                    <div className="pt-2">
                      <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                        <span>Concluído</span>
                        <span>{c.progress}%</span>
                      </div>
                      <Progress value={c.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Detalhe do Curso Selecionado e Aulas */}
        <div className="md:col-span-7 space-y-4">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="bg-purple-100 text-purple-800 mb-2">
                    {selectedCourse.category}
                  </Badge>
                  <CardTitle className="text-lg font-bold text-slate-900">
                    {selectedCourse.title}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Instrutor:{' '}
                    <strong className="text-slate-700">{selectedCourse.instructor}</strong>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              <h4 className="text-sm font-bold text-slate-900">Módulos e Aulas Práticas</h4>

              <div className="space-y-3">
                {selectedCourse.modules.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4 hover:border-purple-300 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {m.status === 'concluido' && (
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        {m.status === 'em_andamento' && (
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                            <PlayCircle className="w-4 h-4" />
                          </div>
                        )}
                        {m.status === 'bloqueado' && (
                          <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                            <Lock className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{m.title}</h5>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {m.lessonsCount} aulas • {m.duration}
                        </p>
                      </div>
                    </div>

                    <div>
                      {m.status !== 'bloqueado' ? (
                        <Button
                          size="sm"
                          onClick={() => handleStartLesson(m.title)}
                          className={
                            m.status === 'concluido'
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs'
                              : 'bg-purple-600 hover:bg-purple-700 text-white text-xs'
                          }
                        >
                          {m.status === 'concluido' ? 'Rever' : 'Assistir Aula'}
                        </Button>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">Bloqueado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
