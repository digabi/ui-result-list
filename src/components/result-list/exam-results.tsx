import React, { useEffect, useState } from 'react'
import { Exam } from './types'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

interface ExamResultsProps {
  exam: Exam
  maximumQuestions: number
  lastCompletedExam: boolean
  language: string
  isLaw2022Student: boolean
}

export const ExamResults = (props: ExamResultsProps) => {
  const { exam, maximumQuestions, lastCompletedExam, language, isLaw2022Student } = props

  const [questionScores, setQuestionScores] = useState<Array<number | null>>([])
  const hasScores = maximumQuestions > 0 && exam.questionScores

  useEffect(() => {
    setQuestionScores(exam.questionScores.flatMap(score => score).map(score => score.weightedScore))
  }, [exam])

  return (
    <tr className={getExamResultRowClassName(exam, lastCompletedExam)}>
      <td className="exam-code">{exam.examCode}</td>
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
  if (exam.invalidated) {
    return t('results.invalidated')
  }

  if (exam.aborted) {
    return t('results.aborted')
  }

  if (exam.compensationInfo) {
    return exam.compensationInfo.compensated
      ? `${i18next.t('results.compensated')} (min ${exam.compensationInfo.requiredCompensationPoints}${i18next.t(
          'results.points'
        )})`
      : t('results.not_compensated')
  }

  if (exam.gradeRaised) {
    return t('results.grade_raised')
  }

  return null
}

const getExamScore = (exam: Exam) => {
  if (!exam.maxScore || !exam.questionScores) return '-'
  return `${exam.finalGradeScore || '-'}/${exam.maxScore}`
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
