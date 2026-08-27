import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  Sparkles,
  HelpCircle,
  Award,
  Search,
  Filter,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

interface ForumPost {
  id: string
  author: string
  cro: string
  role: string
  category: 'Caso Clínico' | 'Dúvida Biomecânica' | 'Dica Clínica' | 'Sucesso'
  title: string
  content: string
  likes: number
  repliesCount: number
  isLiked?: boolean
  date: string
  tags: string[]
}

const MOCK_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    author: 'Dra. Juliana Mendes',
    cro: 'CRO-MG 45.120',
    role: 'Ortodontista Credenciada Master',
    category: 'Caso Clínico',
    title: 'Fechamento de mordida aberta anterior com sistema Magic Wire sem cirurgia ortognática',
    content:
      'Compartilho com os colegas o resultado após 14 meses de tratamento. Utilizamos intrusão de molares com apoio de elásticos intermaxilares de classe II associados ao protocolo avançado Magic Wire pelo lado interno dos dentes. O que acharam da estabilidade?',
    likes: 24,
    repliesCount: 8,
    date: 'Há 2 horas',
    tags: ['Mordida Aberta', 'Biomecânica', 'Intrusão Molar'],
  },
  {
    id: 'post-2',
    author: 'Dr. Carlos Eduardo',
    cro: 'CRO-SP 67.890',
    role: 'Ortodontista',
    category: 'Dúvida Biomecânica',
    title:
      'Qual a experiência de vocês com attachments otimizados em caninos com giro severo (>40°)?',
    content:
      'Estou com um caso desafiador onde o canino 23 está bastante girado. Vale a pena dividir a rotação em duas etapas ou manter o attachment retangular convencional desde a placa 01?',
    likes: 12,
    repliesCount: 15,
    date: 'Há 5 horas',
    tags: ['Attachments', 'Giroversão', 'Planejamento 3D'],
  },
  {
    id: 'post-3',
    author: 'Dr. Marcelo Vieira',
    cro: 'CRO-RJ 32.110',
    role: 'Speaker MWS',
    category: 'Dica Clínica',
    title: 'Guia prático para IPR seguro: evitando degraus e preservando ponto de contato',
    content:
      'Colegas, segue uma sequência recomendada: 1. Proteção de papila com matriz metálica; 2. Tira de lixa diamantada inicial; 3. Calibrador de espessura antes de avançar para broca multilaminada fina; 4. Polimento com disco Sof-Lex.',
    likes: 47,
    repliesCount: 19,
    date: 'Ontem',
    tags: ['IPR', 'Dicas Clínicas', 'Acabamento'],
  },
]

export default function DentistCommunity() {
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_POSTS)
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('Caso Clínico')
  const [newContent, setNewContent] = useState('')
  const [newTags, setNewTags] = useState('')
  const { toast } = useToast()

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newContent.trim()) return

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: 'Dr. Roberto Fernandes (Você)',
      cro: 'CRO-SP 98.432',
      role: 'Ortodontista Credenciado',
      category: newCategory,
      title: newTitle,
      content: newContent,
      likes: 1,
      isLiked: true,
      repliesCount: 0,
      date: 'Agora mesmo',
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    }

    setPosts([newPost, ...posts])
    setIsDialogOpen(false)
    setNewTitle('')
    setNewContent('')
    setNewTags('')
    toast({
      title: 'Tópico Publicado na Comunidade!',
      description: 'Outros ortodontistas da rede já podem visualizar e comentar.',
    })
  }

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const isLiked = !p.isLiked
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          }
        }
        return p
      }),
    )
  }

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto animate-fade-in-up">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              Comunidade & Fórum MWS
            </h1>
            <Badge className="bg-emerald-100 text-emerald-800">Rede de Apoio Clínico</Badge>
          </div>
          <p className="text-slate-500 mt-1">
            Troque experiências, tire dúvidas de planejamento 3D e debata casos complexos com outros
            ortodontistas.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" /> Criar Novo Tópico
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[540px]">
            <DialogHeader>
              <DialogTitle>Novo Tópico na Comunidade</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreatePost} className="space-y-4 pt-3">
              <div className="space-y-2">
                <Label htmlFor="post-title">Título do Tópico</Label>
                <Input
                  id="post-title"
                  placeholder="Ex: Como conduzir caso de canino impactado com Magic Wire?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-cat">Categoria</Label>
                <select
                  id="post-cat"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ForumPost['category'])}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <option value="Caso Clínico">Caso Clínico (Estudo / Evolução)</option>
                  <option value="Dúvida Biomecânica">Dúvida Biomecânica / Setup 3D</option>
                  <option value="Dica Clínica">Dica Clínica & Protocolo</option>
                  <option value="Sucesso">Caso de Sucesso & Finalização</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-content">Descrição / Dúvida Completa</Label>
                <textarea
                  id="post-content"
                  rows={4}
                  required
                  placeholder="Detalhe o contexto clínico, diagnóstico e hipóteses..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="post-tags"
                  placeholder="Ex: Classe II, Elásticos, Attachments"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Publicar no Fórum
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por palavra-chave, tema ou tag..."
            className="pl-9 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Button
            variant={categoryFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('all')}
            className={categoryFilter === 'all' ? 'bg-slate-800 text-xs' : 'text-xs'}
          >
            Todos
          </Button>
          <Button
            variant={categoryFilter === 'Caso Clínico' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('Caso Clínico')}
            className={
              categoryFilter === 'Caso Clínico'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-xs'
                : 'text-xs'
            }
          >
            Casos Clínicos
          </Button>
          <Button
            variant={categoryFilter === 'Dúvida Biomecânica' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('Dúvida Biomecânica')}
            className={
              categoryFilter === 'Dúvida Biomecânica'
                ? 'bg-blue-600 hover:bg-blue-700 text-xs'
                : 'text-xs'
            }
          >
            Dúvidas
          </Button>
          <Button
            variant={categoryFilter === 'Dica Clínica' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCategoryFilter('Dica Clínica')}
            className={
              categoryFilter === 'Dica Clínica'
                ? 'bg-purple-600 hover:bg-purple-700 text-xs'
                : 'text-xs'
            }
          >
            Dicas
          </Button>
        </div>
      </div>

      {/* Lista de Postagens */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="border-slate-200 hover:border-slate-300 transition-all shadow-sm"
          >
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200">
                    <AvatarFallback className="bg-emerald-600 text-white font-bold text-xs">
                      {post.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
                      <span className="text-xs text-slate-400 font-mono">{post.cro}</span>
                    </div>
                    <p className="text-xs text-emerald-700 font-medium">{post.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[11px] bg-slate-50 border-slate-200">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-slate-400 hidden sm:inline">{post.date}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 leading-snug">{post.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{post.content}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Ações / Interações */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`text-xs gap-1.5 ${
                      post.isLiked ? 'text-emerald-600 font-bold bg-emerald-50' : 'text-slate-600'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes} Curtidas</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-slate-600 gap-1.5"
                    onClick={() =>
                      toast({
                        title: 'Respostas do Fórum',
                        description: `Abrindo ${post.repliesCount} respostas e debate dos ortodontistas.`,
                      })
                    }
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.repliesCount} Respostas</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-slate-500 hover:text-slate-900"
                  onClick={() =>
                    toast({
                      title: 'Link copiado!',
                      description: 'Link do tópico copiado para a área de transferência.',
                    })
                  }
                >
                  <Share2 className="w-3.5 h-3.5 mr-1" /> Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-base font-semibold text-slate-800">Nenhum tópico encontrado</h4>
            <p className="text-sm text-slate-500 mt-1">
              Seja o primeiro a publicar sobre este assunto na comunidade!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
