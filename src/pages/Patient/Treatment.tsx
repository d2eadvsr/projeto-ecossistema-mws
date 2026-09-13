import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Activity,
  CheckCircle2,
  Clock,
  FlaskConical,
  Sparkles,
  Info,
  Calendar,
  Layers,
  FileCheck2,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Smile,
  AlertCircle,
  HelpCircle,
  FileText,
  Camera,
  Download,
  Eye,
  FileSignature,
  ClipboardList,
  ExternalLink,
  CircleDashed,
  FolderOpen,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

export interface AttachedDocument {
  id: string
  name: string
  fileType: 'pdf' | 'image' | 'stl' | 'doc'
  date: string
  size: string
  uploader: 'paciente' | 'ortodontista' | 'laboratorio'
}

export interface PatientPhoto {
  id: string
  title: string
  category:
    | 'Frontal em repouso'
    | 'Sorriso anterior'
    | 'Oclusal superior'
    | 'Oclusal inferior'
    | 'Perfil direito'
    | 'Perfil esquerdo'
    | 'Intraoral lingual'
  date: string
  imageUrl: string
  notes?: string
}

export interface AcceptedConsentTerm {
  id: string
  title: string
  version: string
  acceptedAt: string
  hash: string
  description: string
}

export interface MaintenanceSessionRecord {
  id: string
  order: number
  key:
    | 'instalacao'
    | 'manutencao-1'
    | 'manutencao-2'
    | 'manutencao-3'
    | 'manutencao-4'
    | 'manutencao-5'
    | 'manutencao-6'
    | 'conclusao'
  title: string
  subtitle: string
  date?: string
  status: 'completed' | 'scheduled' | 'pending'
  phaseReference: string
  wireActive: string
  clinicalNotes: string
  orthodontistActions: string[]
  patientFeedback?: string
  documents: AttachedDocument[]
  photos: PatientPhoto[]
  acceptedTerms: AcceptedConsentTerm[]
}

const MOCK_TREATMENT_DATA = {
  caseCode: 'CAS-2026-084-MWS',
  protocol: 'Magic Wire Protocolo Lingual Customizado',
  startDate: '12 de Janeiro de 2026',
  estimatedCompletion: 'Novembro de 2026',
  totalPhases: 5,
  currentPhaseIndex: 3, // Fase 4 (Manutenções)
  currentPhaseName: 'Manutenções',
  currentConsultationOrder: 3, // 3ª Manutenção agendada
  overallProgress: 38, // 3 de 8 pós-aquisição realizadas (37.5% ~ 38%)
  orthodontist: {
    name: 'Dra. Aline Costa',
    cro: 'CRO-SP 104.892',
    specialty: 'Ortodontista & Especialista MWS',
    clinic: 'Clínica OrthoDesign Jardins',
    phone: '(11) 98765-4321',
    avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
  },
  labTechnician: {
    name: 'TechLab Precision MWS',
    specialist: 'Henrique Vasconcelos',
    role: 'Técnico Sênior de Dispositivos Linguais MWS',
    certificate: 'Certificação MWS Master Lab #4412',
  },
  wireStatus: {
    upperArc: {
      installed: true,
      type: 'Fio Lingual MWS Customizado Termoativado',
      caliber: '0.014" NiTi Copper Especial',
      installedDate: '10/02/2026',
      status: 'Ativo e em conformação',
      nextAdjustment: '18/07/2026',
    },
    lowerArc: {
      installed: true,
      type: 'Fio Lingual MWS Customizado com Dobras de 1ª Ordem',
      caliber: '0.014" NiTi Flex',
      installedDate: '10/02/2026',
      status: 'Ativo e em conformação',
      nextAdjustment: '18/07/2026',
    },
  },
  maintenanceSessions: [
    {
      id: 'ms-inst',
      order: 1,
      key: 'instalacao',
      title: 'Instalação dos Fios Linguais',
      subtitle: 'Colagem de precisão e inserção dos arcos de 3ª geração',
      date: '15/01/2026',
      status: 'completed',
      phaseReference: 'Fase 2 • Instalação Inicial',
      wireActive: 'Fio Lingual MWS Termoativado 0.012" NiTi Superelástico',
      clinicalNotes:
        'Instalação dos fios linguais superior e inferior realizada com guias de transferência customizados. Excelente passividade e adaptação interna lingual sem interferência na oclusão ou fonética imediata. Orientações de higiene lingual entregues.',
      orthodontistActions: [
        'Profilaxia e condicionamento ácido lingual',
        'Colagem indireta com resina de alta retenção',
        'Inserção e trava de segurança dos fios linguais',
        'Entrega do kit de escovação interdental e passa-fio',
      ],
      patientFeedback: 'Adaptação tranquila, discreta sensibilidade leve nos dois primeiros dias.',
      documents: [
        {
          id: 'doc-inst-1',
          name: 'Comprovante_Instalacao_Protocolo_MWS.pdf',
          fileType: 'pdf',
          date: '15/01/2026',
          size: '412 KB',
          uploader: 'ortodontista',
        },
        {
          id: 'doc-inst-2',
          name: 'Guia_Higienizacao_Lingual_Paciente.pdf',
          fileType: 'pdf',
          date: '15/01/2026',
          size: '1.2 MB',
          uploader: 'ortodontista',
        },
        {
          id: 'doc-inst-3',
          name: 'Certificado_Garantia_Fios_Robóticos.pdf',
          fileType: 'pdf',
          date: '15/01/2026',
          size: '280 KB',
          uploader: 'laboratorio',
        },
      ],
      photos: [
        {
          id: 'ph-inst-1',
          title: 'Arco Superior Lingual Pós-Instalação',
          category: 'Oclusal superior',
          date: '15/01/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=dental+smile+upper',
          notes: 'Fio lingual assentado com stops precisos.',
        },
        {
          id: 'ph-inst-2',
          title: 'Arco Inferior Lingual Pós-Instalação',
          category: 'Oclusal inferior',
          date: '15/01/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=dental+teeth+lower',
          notes: 'Alinhamento inicial das cúspides lingual.',
        },
        {
          id: 'ph-inst-3',
          title: 'Sorriso Frontal Discreto (100% Invisível)',
          category: 'Sorriso anterior',
          date: '15/01/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=happy+smile+teeth',
          notes: 'Foto enviada pela paciente mostrando discrição absoluta frontal.',
        },
      ],
      acceptedTerms: [
        {
          id: 'trm-inst-1',
          title: 'Termo de Consentimento Informado para Ortodontia Lingual Magic Wire',
          version: 'v3.2 - MWS',
          acceptedAt: '15/01/2026 às 09:14',
          hash: 'MWS-TCLE-840192-A',
          description:
            'Consentimento para instalação de dispositivos linguais nos dentes e plano de acompanhamento periódico.',
        },
        {
          id: 'trm-inst-2',
          title: 'Termo de Aceite do Plano de Cuidado e Higiene Domiciliar',
          version: 'v2.0',
          acceptedAt: '15/01/2026 às 09:16',
          hash: 'MWS-CARE-992318-C',
          description:
            'Compromisso de higienização com escova interdental e retorno pontual nas manutenções.',
        },
      ],
    },
    {
      id: 'ms-man-1',
      order: 2,
      key: 'manutencao-1',
      title: '1ª Manutenção',
      subtitle: 'Checagem de desrotacionamento inicial e reativação leve',
      date: '20/02/2026',
      status: 'completed',
      phaseReference: 'Fase 3 • Alinhamento e Nivelamento',
      wireActive: 'Fio Lingual MWS Customizado 0.014" NiTi Copper',
      clinicalNotes:
        'Excelente cooperação da paciente. Ausência de inflamação gengival lingual. Incisivos laterais superiores (12 e 22) já iniciaram desrotacionamento favorável. Ativação termoativada mantida com sucesso.',
      orthodontistActions: [
        'Inspeção da adesão de todos os stops linguais',
        'Troca de ligaduras elásticas linguais de precisão',
        'Reforço da ancoragem no molar direito',
        'Registro fotográfico de evolução clínica',
      ],
      patientFeedback: 'Super acostumada com os fios, sem nenhum incômodo ao falar.',
      documents: [
        {
          id: 'doc-m1-1',
          name: 'Relatorio_Clinico_1a_Manutencao.pdf',
          fileType: 'pdf',
          date: '20/02/2026',
          size: '340 KB',
          uploader: 'ortodontista',
        },
        {
          id: 'doc-m1-2',
          name: 'Comprovante_Presenca_Manutencao_01.pdf',
          fileType: 'pdf',
          date: '20/02/2026',
          size: '185 KB',
          uploader: 'ortodontista',
        },
      ],
      photos: [
        {
          id: 'ph-m1-1',
          title: 'Evolução Frontal Mês 1 - Paciente',
          category: 'Sorriso anterior',
          date: '18/02/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=smiling+woman+teeth',
          notes: 'Foto de acompanhamento enviada pela paciente antes da consulta.',
        },
        {
          id: 'ph-m1-2',
          title: 'Vista Lingual Superior - Dentes 12 e 22',
          category: 'Intraoral lingual',
          date: '20/02/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=dental+appliance+clean',
          notes: 'Início da rotação lingual conforme modelo robótico MWS.',
        },
      ],
      acceptedTerms: [
        {
          id: 'trm-m1-1',
          title: 'Confirmação de Ciência de Evolução de Tratamento',
          version: 'v1.4',
          acceptedAt: '20/02/2026 às 14:35',
          hash: 'MWS-ACK-110294-M1',
          description:
            'Ciência da progressão de força e estabilidade dos dispositivos linguais ativos.',
        },
      ],
    },
    {
      id: 'ms-man-2',
      order: 3,
      key: 'manutencao-2',
      title: '2ª Manutenção',
      subtitle: 'Nivelamento e coordenação transversal dos arcos linguais',
      date: '28/03/2026',
      status: 'completed',
      phaseReference: 'Fase 3 • Alinhamento e Nivelamento',
      wireActive: 'Fio Lingual MWS Customizado 0.014" NiTi Copper',
      clinicalNotes:
        'Desrotacionamento dos incisivos superiores com 75% da meta da fase concluída. Mordida bem balanceada sem contatos prematuros linguais. Curva de Spee inferior em nivelamento progressivo.',
      orthodontistActions: [
        'Aferição milimétrica das distâncias intercaninos',
        'Ajuste fino de dobras de compensação no arco inferior',
        'Profilaxia lingual com jato de bicarbonato suave',
        'Upload de fotos e envio do status ao laboratório central',
      ],
      patientFeedback: 'Amigos e colegas não perceberam nada nos dentes!',
      documents: [
        {
          id: 'doc-m2-1',
          name: 'Evolucao_Clinica_Ortodontica_2a_Manutencao.pdf',
          fileType: 'pdf',
          date: '28/03/2026',
          size: '390 KB',
          uploader: 'ortodontista',
        },
        {
          id: 'doc-m2-2',
          name: 'Fotos_AutoAcompanhamento_Paciente.pdf',
          fileType: 'pdf',
          date: '25/03/2026',
          size: '1.4 MB',
          uploader: 'paciente',
        },
      ],
      photos: [
        {
          id: 'ph-m2-1',
          title: 'Sorriso Aberto - 2º Mês',
          category: 'Sorriso anterior',
          date: '25/03/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=smile+teeth+close',
          notes: 'Enviada pela paciente pelo app.',
        },
        {
          id: 'ph-m2-2',
          title: 'Arco Superior Lingual - Mês 2',
          category: 'Oclusal superior',
          date: '28/03/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=teeth+mouth+interior',
          notes: 'Registro intraoral capturado na clínica.',
        },
        {
          id: 'ph-m2-3',
          title: 'Perfil Lateral em Repouso',
          category: 'Perfil direito',
          date: '28/03/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=face+profile+woman',
          notes: 'Harmonia labial mantida sem projeção indesejada.',
        },
      ],
      acceptedTerms: [
        {
          id: 'trm-m2-1',
          title: 'Autorização para Uso de Imagem Técnica em Registro Clínico Interno',
          version: 'v2.1',
          acceptedAt: '28/03/2026 às 11:10',
          hash: 'MWS-IMG-559021-M2',
          description:
            'Autorização de armazenamento seguro das fotografias intraorais na plataforma MWS.',
        },
      ],
    },
    {
      id: 'ms-man-3',
      order: 4,
      key: 'manutencao-3',
      title: '3ª Manutenção',
      subtitle: 'Conclusão de nivelamento e preparação para arcos retangulares',
      date: '18/07/2026',
      status: 'scheduled',
      phaseReference: 'Fase 3 • Alinhamento e Nivelamento (Atual)',
      wireActive: 'Fio Lingual MWS Customizado 0.014" NiTi Copper (planejada checagem)',
      clinicalNotes:
        'Sessão agendada: checagem do alinhamento final da Fase 3 e avaliação de troca para os arcos de aço retangular de fechamento de espaços.',
      orthodontistActions: [
        'Revisão geral dos contatos interproximais',
        'Checagem da resposta biológica radicular',
        'Planejamento da transição para Fase 4',
      ],
      patientFeedback: 'Consulta agendada para 18 de Julho de 2026 às 14:00.',
      documents: [
        {
          id: 'doc-m3-1',
          name: 'Instrucoes_Pre_Consulta_Manutencao_03.pdf',
          fileType: 'pdf',
          date: '01/07/2026',
          size: '220 KB',
          uploader: 'ortodontista',
        },
      ],
      photos: [
        {
          id: 'ph-m3-1',
          title: 'Foto Pré-Manutenção Enviada pela Paciente',
          category: 'Sorriso anterior',
          date: '02/07/2026',
          imageUrl: 'https://img.usecurling.com/p/400/300?q=portrait+smile+woman',
          notes: 'Paciente enviou pelo app para conferência do alinhamento antes da visita.',
        },
      ],
      acceptedTerms: [
        {
          id: 'trm-m3-1',
          title: 'Confirmação Digital de Agendamento da 3ª Manutenção',
          version: 'v1.0',
          acceptedAt: '01/07/2026 às 17:02',
          hash: 'MWS-APT-882190-M3',
          description:
            'Confirmação de presença e ciência das recomendações de higiene pré-consulta.',
        },
      ],
    },
    {
      id: 'ms-man-4',
      order: 5,
      key: 'manutencao-4',
      title: '4ª Manutenção',
      subtitle: 'Transição para Fios de Aço Retangulares e Controle de Torque',
      date: 'Previsão: Agosto/2026',
      status: 'pending',
      phaseReference: 'Fase 4 • Fechamento de Espaços e Torque',
      wireActive: 'Fio Lingual MWS de Aço Nobre Retangular 0.016" x 0.022"',
      clinicalNotes:
        'Planejada a inserção dos arcos de aço braided retangulares confeccionados pelo laboratório robotizado MWS para finalização de espaços.',
      orthodontistActions: [
        'Instalação dos fios linguais retangulares',
        'Controle de torque radicular',
        'Fechamento de diastemas residuais',
      ],
      documents: [
        {
          id: 'doc-m4-1',
          name: 'Planejamento_Arcos_Retangulares_Lab_MWS.pdf',
          fileType: 'pdf',
          date: '05/06/2026',
          size: '510 KB',
          uploader: 'laboratorio',
        },
      ],
      photos: [],
      acceptedTerms: [],
    },
    {
      id: 'ms-man-5',
      order: 6,
      key: 'manutencao-5',
      title: '5ª Manutenção',
      subtitle: 'Fechamento de microespaços e intercuspidação lingual',
      date: 'Previsão: Setembro/2026',
      status: 'pending',
      phaseReference: 'Fase 4 • Fechamento de Espaços e Torque',
      wireActive: 'Fio Lingual MWS de Aço Nobre Retangular com dobras de finalização',
      clinicalNotes:
        'Etapa focada na intercuspidação posterior e assentamento milimétrico das cúspides oclusais.',
      orthodontistActions: [
        'Ajuste oclusal fisiológico',
        'Verificação de guias caninas e de desoclusão',
      ],
      documents: [],
      photos: [],
      acceptedTerms: [],
    },
    {
      id: 'ms-man-6',
      order: 7,
      key: 'manutencao-6',
      title: '6ª Manutenção',
      subtitle: 'Detalhamento estético final e escaneamento para contenção',
      date: 'Previsão: Outubro/2026',
      status: 'pending',
      phaseReference: 'Fase 4 • Finalização de Arcos',
      wireActive: 'Fio Lingual MWS de Detalhamento Estético Oclusal',
      clinicalNotes:
        'Última manutenção ativa antes da remoção e contenção. Escaneamento 3D final para impressão da contenção fixa lingual definitiva.',
      orthodontistActions: [
        'Novo escaneamento intraoral 3D de alta definição',
        'Envio dos modelos ao laboratório para confecção do Retainer MWS',
        'Check-up estético fotográfico',
      ],
      documents: [],
      photos: [],
      acceptedTerms: [],
    },
    {
      id: 'ms-conc',
      order: 8,
      key: 'conclusao',
      title: 'Conclusão & Contenção Fixa',
      subtitle: 'Remoção dos fios de trabalho e instalação da contenção lingual perene',
      date: 'Previsão: Novembro/2026',
      status: 'pending',
      phaseReference: 'Fase 5 • Finalização e Contenção Lingual Fixa',
      wireActive: 'Contenção Fina Lingual MWS Retainer 0.0155" Twist Multi-fio',
      clinicalNotes:
        'Conclusão oficial do tratamento! Remoção delicada dos dispositivos ativos, profilaxia de acabamento lingual e colagem da contenção invisível por trás dos dentes.',
      orthodontistActions: [
        'Remoção dos stops e polimento das faces linguais',
        'Instalação da contenção lingual fixa customizada',
        'Entrega do relatório de alta e protocolo de manutenção semestral',
      ],
      documents: [
        {
          id: 'doc-cnc-1',
          name: 'Manual_Cuidados_Contencao_Lingual_MWS.pdf',
          fileType: 'pdf',
          date: 'Previsão',
          size: '890 KB',
          uploader: 'ortodontista',
        },
      ],
      photos: [],
      acceptedTerms: [
        {
          id: 'trm-cnc-1',
          title: 'Termo de Entrega de Alta e Garantia da Contenção Lingual MWS',
          version: 'v1.0',
          acceptedAt: 'Pendente de finalização',
          hash: 'MWS-ALTA-PENDING',
          description:
            'Termo formal de conclusão do tratamento ortodôntico lingual e orientações perpétuas.',
        },
      ],
    },
  ] as MaintenanceSessionRecord[],
  phases: [
    {
      id: 1,
      name: 'Fase 1',
      title: 'Diagnóstico 3D e Planejamento Virtual',
      arc: 'Arcada Superior e Inferior',
      status: 'completed' as const,
      wireType: 'Pré-instalação (Modelagem Digital)',
      wireCaliber: 'Setup Digital 3D',
      startDate: '12/01/2026',
      completedDate: '26/01/2026',
      estimatedDuration: '2 semanas',
      orthodontistNote:
        'Escaneamento intraoral de alta precisão realizado. Documentação fotográfica e telerradiografia analisadas em conjunto com a central MWS.',
      labNote:
        'Biometria virtual finalizada com sucesso. Diagramação dos fios linguais customizados e fabricação dos dispositivos robóticos concluída.',
      objectives: [
        'Escaneamento intraoral 3D das arcadas',
        'Estudo cefalométrico computadorizado',
        'Confecção robótica dos fios linguais sob medida',
      ],
      careTips: [
        'Manter excelente higienização pré-procedimento',
        'Realizar profilaxia clínica recomendada',
      ],
    },
    {
      id: 2,
      name: 'Fase 2',
      title: 'Colagem dos Dispositivos Linguais & Instalação do Fio Inicial',
      arc: 'Arcada Superior e Inferior',
      status: 'completed' as const,
      wireType: 'Fio Lingual MWS Termoativado',
      wireCaliber: '0.012" NiTi Superelástico',
      startDate: '27/01/2026',
      completedDate: '09/02/2026',
      estimatedDuration: '2 semanas',
      orthodontistNote:
        'Colagem indireta lingual realizada com guia de precisão. Instalação do primeiro arco por trás dos dentes com adaptação imediata excelente.',
      labNote:
        'Guia de transferência customizado entregue e validado. Força biológica leve e contínua calibrada para o início do movimento.',
      objectives: [
        'Fixação dos stops linguais internos',
        'Inserção do fio MWS 0.012 por trás dos dentes',
        'Adaptação fonética e instruções de conforto',
      ],
      careTips: [
        'Utilizar cera de proteção lingual se houver atrito leve com a língua',
        'Usar escova interdental para limpar ao redor dos fios internos',
      ],
    },
    {
      id: 3,
      name: 'Fase 3',
      title: 'Alinhamento, Nivelamento & Rotações (Fase Atual)',
      arc: 'Arcada Superior e Inferior',
      status: 'in_progress' as const,
      wireType: 'Fio Lingual MWS Customizado Termoativado',
      wireCaliber: '0.014" NiTi Copper',
      startDate: '10/02/2026',
      estimatedDuration: '3 meses',
      orthodontistNote:
        'Evolução muito positiva! O fio lingual está promovendo o alinhamento das cúspides anteriores com discrição 100% invisível. Excelente resposta tecidual.',
      labNote:
        'A geometria pré-programada no fio interno está atuando na correção da rotação dos dentes 12 e 22 conforme o planejamento digital.',
      objectives: [
        'Desrotacionamento dos incisivos laterais',
        'Nivelamento da curva de Spee',
        'Fechamento gradual de pequenos espaçamentos',
      ],
      careTips: [
        'Evitar mastigar alimentos excessivamente duros com os dentes anteriores',
        'Utilizar o passa-fio ortodôntico diariamente atrás do fio lingual',
        'Higienizar a face interna dos dentes com movimentos circulares suaves',
      ],
    },
    {
      id: 4,
      name: 'Fase 4',
      title: 'Fechamento de Espaços & Coordenação de Torque',
      arc: 'Arcada Superior e Inferior',
      status: 'upcoming' as const,
      wireType: 'Fio Lingual MWS de Aço Nobre Retangular',
      wireCaliber: '0.016" x 0.022" Aço Braided',
      startDate: 'Previsão: Junho/2026',
      estimatedDuration: '3 meses',
      orthodontistNote:
        'Nesta fase substituiremos o arco de NiTi pelo fio lingual rígido de aço para controle milimétrico de torque e consolidação dos arcos.',
      labNote:
        'Fios retangulares com curvas de ancoragem já produzidos e armazenados no kit estéril do paciente na clínica.',
      objectives: [
        'Consolidação das distâncias intermolares',
        'Ajuste fino de torque radicular',
        'Engrenamento das cúspides funcionais',
      ],
      careTips: [
        'Manter assiduidade rigorosa nas consultas mensais de ativação',
        'Avisar a clínica imediatamente se sentir qualquer folga no fio',
      ],
    },
    {
      id: 5,
      name: 'Fase 5',
      title: 'Finalização Estética Oclusal & Contenção Lingual Fixa',
      arc: 'Arcada Superior e Inferior',
      status: 'upcoming' as const,
      wireType: 'Contenção Fina Lingual MWS Retainer',
      wireCaliber: '0.0155" Twist Multi-fio',
      startDate: 'Previsão: Outubro/2026',
      estimatedDuration: '1 mês',
      orthodontistNote:
        'Remoção dos dispositivos de trabalho e instalação da contenção fixa lingual interna de alta durabilidade para estabilidade perpétua do sorriso.',
      labNote:
        'Contenção lingual customizada conformada sobre o modelo digital do resultado ideal final.',
      objectives: [
        'Refinamento de contatos oclusais',
        'Polimento das superfícies linguais',
        'Instalação da contenção definitiva invisível',
      ],
      careTips: [
        'Revisões semestrais de controle e profilaxia',
        'Sorrir livremente com o alinhamento definitivo conquistado',
      ],
    },
  ],
}

export default function PatientTreatment() {
  const [activeTab, setActiveTab] = useState<'manutencoes' | 'fases' | 'status-fios' | 'equipe'>(
    'manutencoes',
  )
  const [selectedSessionId, setSelectedSessionId] = useState<string>('ms-man-2')
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(3)
  const [previewPhoto, setPreviewPhoto] = useState<PatientPhoto | null>(null)
  const { toast } = useToast()

  const selectedPhase =
    MOCK_TREATMENT_DATA.phases.find((p) => p.id === selectedPhaseId) ||
    MOCK_TREATMENT_DATA.phases[2]

  const selectedSession =
    MOCK_TREATMENT_DATA.maintenanceSessions.find((s) => s.id === selectedSessionId) ||
    MOCK_TREATMENT_DATA.maintenanceSessions[1]

  const totalSessionsCount = MOCK_TREATMENT_DATA.maintenanceSessions.length
  const completedSessionsCount = MOCK_TREATMENT_DATA.maintenanceSessions.filter(
    (s) => s.status === 'completed',
  ).length

  const handleDownloadDoc = (docName: string) => {
    toast({
      title: 'Download iniciado',
      description: `O arquivo ${docName} está sendo baixado em formato seguro criptografado.`,
    })
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Cabeçalho Principal com Referência Clínica */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Meu Tratamento Magic Wire
            </h1>
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
              Fase Ativa • Manutenções
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Histórico completo por manutenção: documentos anexados, fotos enviadas pelo paciente,
            termos aceitos e notas clínicas da ortodontista.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-slate-300 bg-white text-slate-700 font-mono text-xs px-3 py-1.5 shadow-sm"
          >
            Ref. Caso:{' '}
            <strong className="text-slate-900 ml-1">{MOCK_TREATMENT_DATA.caseCode}</strong>
          </Badge>
          <Link to="/patient/appointments">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Calendar className="w-4 h-4 mr-2" /> Agendar Manutenção
            </Button>
          </Link>
        </div>
      </div>

      {/* Cartão de Destaque: O Que é o Magic Wire */}
      <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white shadow-sm overflow-hidden">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Tecnologia Lingual 100% Invisível
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 text-[11px]"
                  >
                    Sem brackets externos
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  O sistema <strong>Magic Wire</strong> é instalado exclusivamente na face{' '}
                  <strong>interna dos dentes</strong> (lado lingual). Os fios customizados atuam de
                  forma contínua e discreta, sem necessidade de troca diária de peças móveis.
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-lg p-3 border border-emerald-100 shrink-0 w-full md:w-auto text-left md:text-right">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Status do Tratamento
              </span>
              <p className="text-sm font-bold text-emerald-700">
                Fase 4 • Manutenções ({completedSessionsCount} de {totalSessionsCount} sessões
                realizadas)
              </p>
              <p className="text-xs text-slate-500">Início: {MOCK_TREATMENT_DATA.startDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navegação por Abas Principais: Manutenções (Consolidado), Fases Clínicas, Status dos Fios, Equipe */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as typeof activeTab)}
        className="w-full space-y-6"
      >
        <div className="border-b border-slate-200 pb-1 overflow-x-auto">
          <TabsList className="bg-slate-100/80 p-1 flex w-fit sm:w-auto justify-start gap-1">
            <TabsTrigger
              value="manutencoes"
              className="gap-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs font-semibold"
            >
              <FolderOpen className="w-4 h-4" />
              Consolidado por Manutenção
              <Badge className="ml-1 bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0 hover:bg-emerald-100">
                {totalSessionsCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="fases"
              className="gap-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs"
            >
              <Activity className="w-4 h-4" />
              Fases do Protocolo
            </TabsTrigger>
            <TabsTrigger
              value="status-fios"
              className="gap-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs"
            >
              <Layers className="w-4 h-4" />
              Status Atual dos Fios
            </TabsTrigger>
            <TabsTrigger
              value="equipe"
              className="gap-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-xs"
            >
              <Stethoscope className="w-4 h-4" />
              Ortodontista & Lab
            </TabsTrigger>
          </TabsList>
        </div>

        {/* TAB 1: CONSOLIDADO POR MANUTENÇÃO (Item 2 do requisito) */}
        <TabsContent value="manutencoes" className="space-y-6 m-0 focus-visible:outline-none">
          {/* Seletor horizontal das 8 sessões pós-aquisição (Instalação + 1ª a 6ª Manutenções + Conclusão) */}
          <Card className="border-slate-200 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-emerald-600" />
                    Histórico & Consolidação das Manutenções
                  </CardTitle>
                  <CardDescription>
                    Selecione uma manutenção para consultar todos os documentos anexados, fotos
                    enviadas, termos aceitos e notas da ortodontista daquela sessão.
                  </CardDescription>
                </div>
                <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
                  {completedSessionsCount} de {totalSessionsCount} sessões concluídas
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {MOCK_TREATMENT_DATA.maintenanceSessions.map((session) => {
                  const isSelected = selectedSessionId === session.id
                  const isCompleted = session.status === 'completed'
                  const isScheduled = session.status === 'scheduled'
                  return (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => setSelectedSessionId(session.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between relative group ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-2 ring-emerald-400/30'
                          : isScheduled
                            ? 'border-blue-300 bg-blue-50/40 hover:bg-blue-50/70'
                            : isCompleted
                              ? 'border-slate-200 bg-white hover:bg-slate-50'
                              : 'border-slate-200 bg-slate-50/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isScheduled
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {session.order}ª Sessão
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : isScheduled ? (
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <CircleDashed className="w-3.5 h-3.5 text-slate-300" />
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-tight truncate">
                        {session.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 truncate">
                        {session.date || 'Previsão'}
                      </p>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Cartão de Detalhes da Sessão Selecionada */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50/60 p-5 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={
                        selectedSession.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                          : selectedSession.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-200'
                      }
                    >
                      {selectedSession.title} •{' '}
                      {selectedSession.status === 'completed'
                        ? 'Realizada'
                        : selectedSession.status === 'scheduled'
                          ? 'Agendada'
                          : 'Prevista'}
                    </Badge>
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedSession.phaseReference}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {selectedSession.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">{selectedSession.subtitle}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-2xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Data da Sessão
                    </span>
                    <strong className="text-slate-900 text-sm">
                      {selectedSession.date || 'A definir'}
                    </strong>
                  </div>
                  <div className="h-6 w-px bg-slate-200 hidden sm:block" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                      Arco Lingual
                    </span>
                    <span className="text-emerald-700 font-semibold truncate max-w-[200px] block">
                      {selectedSession.wireActive}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 sm:p-6 space-y-6">
              {/* (d) Registros Clínicos / Notas da Ortodontista */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                  Registros Clínicos & Parecer da Ortodontista
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Parecer Clínico */}
                  <div className="md:col-span-2 bg-slate-50/80 rounded-xl p-4 border border-slate-200/80 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={MOCK_TREATMENT_DATA.orthodontist.avatar} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                          AC
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900">
                            {MOCK_TREATMENT_DATA.orthodontist.name}
                          </h4>
                          <Badge
                            variant="outline"
                            className="text-[9px] text-emerald-700 border-emerald-300"
                          >
                            Ortodontista
                          </Badge>
                        </div>
                        <p className="text-[10px] text-slate-500">
                          {MOCK_TREATMENT_DATA.orthodontist.cro} •{' '}
                          {MOCK_TREATMENT_DATA.orthodontist.clinic}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-lg border border-slate-200/60">
                      &ldquo;{selectedSession.clinicalNotes}&rdquo;
                    </p>

                    {selectedSession.patientFeedback && (
                      <p className="text-[11px] text-slate-500">
                        <strong>Relato da paciente na sessão:</strong>{' '}
                        {selectedSession.patientFeedback}
                      </p>
                    )}
                  </div>

                  {/* Procedimentos Realizados */}
                  <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200/80 space-y-2">
                    <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Procedimentos Realizados
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {selectedSession.orthodontistActions.map((action, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* (a) Documentos Anexados desta Manutenção */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    Documentos e Comprovantes Anexados ({selectedSession.documents.length})
                  </div>
                  <span className="text-[11px] text-slate-500">Formato seguro PDF</span>
                </div>

                {selectedSession.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedSession.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex items-start justify-between gap-3 shadow-2xs group"
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 mt-0.5">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 space-y-0.5">
                            <p
                              className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700"
                              title={doc.name}
                            >
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {doc.size} • {doc.date}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-[9px] font-normal uppercase tracking-wider py-0 px-1 border-slate-200 text-slate-600"
                            >
                              Enviado por: {doc.uploader}
                            </Badge>
                          </div>
                        </div>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDownloadDoc(doc.name)}
                          className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-100/60 shrink-0"
                          title="Baixar documento"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center text-xs text-slate-500">
                    Nenhum documento anexado ainda para esta manutenção prevista.
                  </div>
                )}
              </div>

              {/* (b) Fotos Enviadas pelo Paciente desta Manutenção */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Camera className="w-4 h-4 text-emerald-600" />
                    Fotos Enviadas pelo Paciente & Registros Clínicos (
                    {selectedSession.photos.length})
                  </div>
                  <span className="text-[11px] text-slate-500">Clique para ampliar miniatura</span>
                </div>

                {selectedSession.photos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedSession.photos.map((photo) => (
                      <div
                        key={photo.id}
                        onClick={() => setPreviewPhoto(photo)}
                        className="group border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer flex flex-col"
                      >
                        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                            <Eye className="w-4 h-4" /> Ampliar
                          </div>
                          <Badge className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-normal border-none">
                            {photo.category}
                          </Badge>
                        </div>
                        <div className="p-2.5 space-y-1 flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 leading-tight">
                              {photo.title}
                            </p>
                            {photo.notes && (
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {photo.notes}
                              </p>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
                            <span>Data: {photo.date}</span>
                            <span className="text-emerald-600 font-medium">Ver detalhes</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center text-xs text-slate-500">
                    Nenhuma foto enviada para esta manutenção.
                  </div>
                )}
              </div>

              {/* (c) Termos de Consentimento Aceitos */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <FileSignature className="w-4 h-4 text-emerald-600" />
                    Termos de Consentimento Aceitos ({selectedSession.acceptedTerms.length})
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Assinados digitalmente com hash
                  </span>
                </div>

                {selectedSession.acceptedTerms.length > 0 ? (
                  <div className="space-y-2">
                    {selectedSession.acceptedTerms.map((term) => (
                      <div
                        key={term.id}
                        className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                              {term.title}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-[9px] bg-white text-emerald-800 border-emerald-300"
                            >
                              {term.version}
                            </Badge>
                          </div>
                          <p className="text-slate-600 text-[11px]">{term.description}</p>
                          <p className="text-[10px] text-slate-500">
                            Aceite registrado em: <strong>{term.acceptedAt}</strong> • Hash de
                            auditoria:{' '}
                            <code className="bg-white px-1 py-0.5 rounded text-slate-700 font-mono">
                              {term.hash}
                            </code>
                          </p>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: 'Comprovante do Termo',
                              description: `Visualizando comprovante de assinatura digital para ${term.title} (${term.hash}).`,
                            })
                          }}
                          className="shrink-0 text-xs border-emerald-300 text-emerald-800 hover:bg-emerald-100/60 bg-white"
                        >
                          <FileCheck2 className="w-3.5 h-3.5 mr-1" />
                          Comprovante Digital
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center text-xs text-slate-500">
                    Nenhum termo pendente para esta sessão.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: FASES DO PROTOCOLO (Visão Geral de 5 Fases) */}
        <TabsContent value="fases" className="space-y-6 m-0 focus-visible:outline-none">
          {/* Barra de Progresso e Fases Visuais */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    Linha de Evolução das Fases Clínicas
                  </CardTitle>
                  <CardDescription>
                    Clique em uma etapa para visualizar os detalhes técnicos do fio instalado e
                    orientações.
                  </CardDescription>
                </div>
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                  {MOCK_TREATMENT_DATA.overallProgress}% Concluído
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
              <Progress
                value={MOCK_TREATMENT_DATA.overallProgress}
                className="h-2.5 bg-slate-100 [&>div]:bg-emerald-600"
              />

              {/* Steps interativos */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                {MOCK_TREATMENT_DATA.phases.map((phase) => {
                  const isSelected = selectedPhaseId === phase.id
                  const isCompleted = phase.status === 'completed'
                  const isInProgress = phase.status === 'in_progress'

                  return (
                    <button
                      key={phase.id}
                      onClick={() => setSelectedPhaseId(phase.id)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between relative group ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-400/30'
                          : isInProgress
                            ? 'border-emerald-300 bg-white hover:bg-emerald-50/30'
                            : isCompleted
                              ? 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/70'
                              : 'border-slate-200 bg-white opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800'
                              : isInProgress
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {phase.name}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isInProgress ? (
                          <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                          </span>
                        ) : (
                          <Clock className="w-4 h-4 text-slate-300" />
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-tight">
                        {phase.title}
                      </p>

                      <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                        {isCompleted ? 'Concluída' : isInProgress ? 'Fase Atual' : 'Próxima'}
                      </p>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Detalhe da Fase Selecionada */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        selectedPhase.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : selectedPhase.status === 'in_progress'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                      }
                    >
                      {selectedPhase.name} •{' '}
                      {selectedPhase.status === 'completed'
                        ? 'Concluída'
                        : selectedPhase.status === 'in_progress'
                          ? 'Em Andamento'
                          : 'Prevista'}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      Duração estimada: {selectedPhase.estimatedDuration}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900">
                    {selectedPhase.title}
                  </CardTitle>
                </div>

                <div className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg">
                  <p>
                    <strong>Início:</strong> {selectedPhase.startDate}
                  </p>
                  {selectedPhase.completedDate && (
                    <p>
                      <strong>Finalizado em:</strong> {selectedPhase.completedDate}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Fio Utilizado nesta Fase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    Especificação do Fio Lingual nesta Etapa
                  </div>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="text-slate-500">Modelo:</span>{' '}
                      <strong className="text-slate-900">{selectedPhase.wireType}</strong>
                    </p>
                    <p>
                      <span className="text-slate-500">Calibre / Liga:</span>{' '}
                      <strong className="text-slate-900">{selectedPhase.wireCaliber}</strong>
                    </p>
                    <p>
                      <span className="text-slate-500">Posicionamento:</span> Face lingual (interna)
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-950 font-semibold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Objetivos Clínicos Desta Fase
                  </div>
                  <ul className="space-y-1">
                    {selectedPhase.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Anotações da Ortodontista e do Laboratório */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Nota da Ortodontista */}
                <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-200">
                      <AvatarImage src={MOCK_TREATMENT_DATA.orthodontist.avatar} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                        AC
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          {MOCK_TREATMENT_DATA.orthodontist.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className="text-[10px] text-emerald-700 border-emerald-300"
                        >
                          Ortodontista
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {MOCK_TREATMENT_DATA.orthodontist.cro} •{' '}
                        {MOCK_TREATMENT_DATA.orthodontist.clinic}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      &ldquo;{selectedPhase.orthodontistNote}&rdquo;
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Dúvidas clínicas? Envie mensagem ou agende uma revisão na aba{' '}
                    <Link
                      to="/patient/appointments"
                      className="text-emerald-600 hover:underline font-semibold"
                    >
                      Consultas
                    </Link>
                    .
                  </p>
                </div>

                {/* Nota do Laboratório MWS */}
                <div className="border border-blue-100 rounded-xl p-5 space-y-3 bg-blue-50/30 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          {MOCK_TREATMENT_DATA.labTechnician.name}
                        </h4>
                        <Badge className="bg-blue-100 text-blue-800 text-[10px]">
                          Laboratório MWS
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Técnico: {MOCK_TREATMENT_DATA.labTechnician.specialist} •{' '}
                        {MOCK_TREATMENT_DATA.labTechnician.certificate}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-blue-100">
                    <p className="text-xs text-slate-700 leading-relaxed">
                      🔬 <strong>Parecer de Engenharia Lingual:</strong> {selectedPhase.labNote}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Fios confeccionados por conformação robótica computadorizada sob medida para a
                    sua anatomia dental.
                  </p>
                </div>
              </div>

              {/* Dicas de Cuidados Específicos */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-2">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Smile className="w-4 h-4 text-amber-700" /> Recomendações de Conforto e Higiene
                  para esta Etapa
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {selectedPhase.careTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-amber-950 flex items-start gap-2 bg-white/70 p-2.5 rounded-lg border border-amber-200/50"
                    >
                      <span className="font-bold text-amber-700">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status-fios" className="space-y-4 m-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Arcada Superior (Maxila)</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Fio Ativo</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p>
                  <span className="text-slate-500">Tipo de Fio:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.upperArc.type}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Calibre:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.upperArc.caliber}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Data de Instalação:</span>{' '}
                  {MOCK_TREATMENT_DATA.wireStatus.upperArc.installedDate}
                </p>
                <p>
                  <span className="text-slate-500">Próxima Verificação:</span>{' '}
                  <strong className="text-emerald-700">
                    {MOCK_TREATMENT_DATA.wireStatus.upperArc.nextAdjustment}
                  </strong>
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Arcada Inferior (Mandíbula)</span>
                  <Badge className="bg-emerald-100 text-emerald-800">Fio Ativo</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p>
                  <span className="text-slate-500">Tipo de Fio:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.lowerArc.type}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Calibre:</span>{' '}
                  <strong className="text-slate-900">
                    {MOCK_TREATMENT_DATA.wireStatus.lowerArc.caliber}
                  </strong>
                </p>
                <p>
                  <span className="text-slate-500">Data de Instalação:</span>{' '}
                  {MOCK_TREATMENT_DATA.wireStatus.lowerArc.installedDate}
                </p>
                <p>
                  <span className="text-slate-500">Próxima Verificação:</span>{' '}
                  <strong className="text-emerald-700">
                    {MOCK_TREATMENT_DATA.wireStatus.lowerArc.nextAdjustment}
                  </strong>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipe" className="space-y-4 m-0 focus-visible:outline-none">
          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-emerald-600" />
                    Ortodontista Responsável
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-50 space-y-2">
                    <p className="font-bold text-slate-900">
                      {MOCK_TREATMENT_DATA.orthodontist.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      {MOCK_TREATMENT_DATA.orthodontist.specialty}
                    </p>
                    <p className="text-xs text-slate-500">
                      Registro: {MOCK_TREATMENT_DATA.orthodontist.cro} • Consultório:{' '}
                      {MOCK_TREATMENT_DATA.orthodontist.clinic}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-blue-600" />
                    Laboratório Especialista MWS
                  </h4>
                  <div className="p-4 rounded-xl bg-blue-50/50 space-y-2">
                    <p className="font-bold text-slate-900">
                      {MOCK_TREATMENT_DATA.labTechnician.name}
                    </p>
                    <p className="text-xs text-slate-600">
                      Técnico Responsável: {MOCK_TREATMENT_DATA.labTechnician.specialist}
                    </p>
                    <p className="text-xs text-slate-500">
                      {MOCK_TREATMENT_DATA.labTechnician.certificate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Pré-visualização de Foto de Acompanhamento */}
      <Dialog open={!!previewPhoto} onOpenChange={(open) => !open && setPreviewPhoto(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800">{previewPhoto?.category}</Badge>
              <span className="text-xs text-slate-500">Data: {previewPhoto?.date}</span>
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900 mt-1">
              {previewPhoto?.title}
            </DialogTitle>
            {previewPhoto?.notes && (
              <DialogDescription className="text-xs text-slate-600">
                {previewPhoto.notes}
              </DialogDescription>
            )}
          </DialogHeader>

          {previewPhoto && (
            <div className="space-y-3 pt-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center max-h-[420px]">
                <img
                  src={previewPhoto.imageUrl}
                  alt={previewPhoto.title}
                  className="max-h-[400px] w-auto object-contain"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Registro clínico associado ao protocolo Magic Wire Lingual.</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: 'Download de Imagem',
                      description: `Foto "${previewPhoto.title}" baixada em alta resolução.`,
                    })
                  }}
                  className="text-xs border-slate-300"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Baixar Imagem
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
