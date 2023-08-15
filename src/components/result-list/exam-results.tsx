import React, { useEffect, useState } from 'react'
import { Exam, TechnicalError } from './types'
import { useTranslation } from 'react-i18next'
import '../../../less/result-list.less'

interface ExamResultsProps {
  exam: Exam
  maximumQuestions: number
  lastCompletedExam: boolean
  language: string
  isLaw2022Student: boolean
  examTechnicalError?: TechnicalError
}

export const ExamResults = (props: ExamResultsProps) => {
  const { exam, maximumQuestions, lastCompletedExam, language, isLaw2022Student, examTechnicalError } = props

  const [questionScores, setQuestionScores] = useState<Array<number | null>>([])
  const hasScores = maximumQuestions > 0 && exam.questionScores

  useEffect(() => {
    if (exam && exam.questionScores)
      setQuestionScores(exam.questionScores.flatMap(score => score).map(score => score.weightedScore))
  }, [exam])

  return (
    <tr className={getExamResultRowClassName(exam, lastCompletedExam)}>
      <td className="exam-code">
        <b>{exam.examCode}</b>
      </td>
      <td className="exam-name">{language === 'sv' ? exam.nameSwedish : exam.nameFinnish}</td>
      <td className="exam-required">{getMandatory(exam, isLaw2022Student)}</td>
      <td className="exam-gradecode">{exam.gradecodeCode ? <strong>{exam.gradecodeCode}</strong> : '-'}</td>
      <td className="exam-score">{getExamScore(exam)}</td>
      {hasScores &&
        Array(maximumQuestions)
          .fill(undefined)
          .map((__, index: number) => (
            <td key={index} className="question-score">
              {getQuestionScore(questionScores, index)}
            </td>
          ))}
      <td colSpan={!hasScores ? maximumQuestions + 1 : undefined}>
        <span className="exam-technical-error">{getTechnicalError(examTechnicalError)}</span>
        <span className="exam-status">{getExamStatus(exam)}</span>
        <span className="exam-grade-points">{getExamGradePoints(exam)}</span>
      </td>
    </tr>
  )
}

const getMandatory = (exam: Exam, isLaw2022Student: boolean) => {
  const { t } = useTranslation()
  if (isLaw2022Student) return null
  if (exam.mandatory) return t('results.mandatory_exam_short')
  return t('results.extra_exam_short')
}

const getExamGradePoints = (exam: Exam) => {
  if (exam.compensationInfo) {
    return <strong>{exam.gradePoints}</strong>
  }

  return <strong>{exam.isBestGrade && exam.gradePoints ? exam.gradePoints : '-'}</strong>
}

const getExamStatus = (exam: Exam) => {
  const { t } = useTranslation()
  const statusInfo: string[] = []
  if (exam.invalidated) {
    return t('results.invalidated')
  }

  if (exam.aborted) {
    return t('results.aborted')
  }

  if (exam.compensationInfo) {
    statusInfo.push(
      exam.compensationInfo.compensated
        ? `${t('results.compensated')} (min ${exam.compensationInfo.requiredCompensationPoints}${t('results.points')})`
        : t('results.not_compensated')
    )
  }

  if (exam.gradeRaised) {
    statusInfo.push(t('results.grade_raised'))
  }

  return statusInfo.length > 0 ? `${statusInfo.join(', ')}` : null
}

const getExamScore = (exam: Exam) => {
  if (!exam.maxScore || !exam.questionScores) return '-'
  return `${exam.finalGradeScore || '-'}/${exam.maxScore}`
}

const getTechnicalError = (technicalError?: TechnicalError) => {
  const { t } = useTranslation()
  if (technicalError) {
    return `${t('results.technical_error')} (${technicalError.technicalErrorPoints})`
  }
  return null
}

const getQuestionScore = (questionScores: Array<number | null>, index: number) => {
  if (index >= questionScores.length) return ''
  if (questionScores[index] === null) return '-'
  return questionScores[index]
}

const getExamResultRowClassName = (exam: Exam, lastCompletedExam: boolean) => {
  const isNotBestGradeClassName = !exam.isBestGrade ? 'not-best-result' : undefined

  if (!lastCompletedExam) {
    return isNotBestGradeClassName
  }

  return isNotBestGradeClassName ? `${isNotBestGradeClassName} last-completed-exam` : 'last-completed-exam'
}
