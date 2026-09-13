import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Star, Sparkles, MessageSquareHeart, CheckCircle2 } from 'lucide-react'
import { PatientConsultationSurvey, PatientSurveyResponse } from './surveyData'

interface SurveyModalProps {
  survey: PatientConsultationSurvey | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (surveyId: string, response: PatientSurveyResponse) => void
}

export function SurveyModal({ survey, isOpen, onClose, onSubmit }: SurveyModalProps) {
  const [rating, setRating] = useState<number>(5)
  const [comfortRating, setComfortRating] = useState<number>(5)
  const [npsScore, setNpsScore] = useState<number>(10)
  const [comments, setComments] = useState<string>('')

  if (!survey) return null

  const isViewOnly = survey.isAnswered

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(
      now.getMonth() + 1,
    ).padStart(2, '0')}/${now.getFullYear()}`

    onSubmit(survey.id, {
      rating,
      comfortRating,
      npsScore,
      comments: comments.trim() || undefined,
      answeredAt: formattedDate,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-emerald-700">
            <MessageSquareHeart className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {isViewOnly ? 'Pesquisa de Satisfação Respondida' : 'Avaliação da Consulta'}
            </span>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900">
            {survey.consultationTitle}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-600">
            {isViewOnly
              ? `Pesquisa respondida em ${survey.response?.answeredAt}. Confira abaixo a sua avaliação:`
              : 'Sua opinião é fundamental para aprimorarmos o atendimento e a evolução do seu tratamento Magic Wire.'}
          </DialogDescription>
        </DialogHeader>

        {isViewOnly && survey.response ? (
          <div className="space-y-4 py-2">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-950">
                  Atendimento da Ortodontista
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= survey.response!.rating
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-emerald-900 ml-1">
                    {survey.response.rating}/5
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60">
                <span className="text-xs font-semibold text-emerald-950">
                  Conforto do Fio Lingual
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= survey.response!.comfortRating
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-emerald-900 ml-1">
                    {survey.response.comfortRating}/5
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60">
                <span className="text-xs font-semibold text-emerald-950">
                  Recomendação do Tratamento (NPS)
                </span>
                <span className="text-xs font-bold bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800">
                  {survey.response.npsScore}/10
                </span>
              </div>
            </div>

            {survey.response.comments && (
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-600 uppercase">
                  Seu Comentário Registrado:
                </span>
                <p className="text-xs text-slate-800 italic leading-relaxed">
                  &ldquo;{survey.response.comments}&rdquo;
                </p>
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Fechar
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Avaliação do Atendimento da Ortodontista */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Como você avalia o atendimento da sua ortodontista nesta consulta?</span>
                <span className="text-emerald-700 font-semibold">{rating} de 5</span>
              </Label>
              <div className="flex items-center justify-center gap-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-slate-300 hover:text-amber-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Conforto do Fio Lingual */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Nível de conforto e adaptação com o fio lingual</span>
                <span className="text-emerald-700 font-semibold">{comfortRating} de 5</span>
              </Label>
              <div className="flex items-center justify-center gap-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setComfortRating(star)}
                    className="p-1 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= comfortRating
                          ? 'fill-emerald-500 text-emerald-600'
                          : 'text-slate-300 hover:text-emerald-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Recomendação NPS (0 a 10) */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>
                  Em uma escala de 0 a 10, recomendaria o Magic Wire a amigos ou familiares?
                </span>
                <span className="text-emerald-700 font-semibold">{npsScore} / 10</span>
              </Label>
              <div className="grid grid-cols-11 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setNpsScore(score)}
                    className={`py-1.5 rounded text-xs font-bold transition-all border ${
                      npsScore === score
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                <span>Pouco provável</span>
                <span>Muito provável</span>
              </div>
            </div>

            {/* Comentários adicionais */}
            <div className="space-y-1.5">
              <Label htmlFor="survey-comment" className="text-xs font-bold text-slate-800">
                Comentários ou impressões sobre a consulta (opcional)
              </Label>
              <Textarea
                id="survey-comment"
                rows={3}
                placeholder="Conte-nos como foi a experiência, pontualidade, esclarecimento das dúvidas..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="text-xs"
              />
            </div>

            <DialogFooter className="pt-2 gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={onClose} className="text-xs">
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-xs text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> Enviar Pesquisa
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
