import React from 'react'
import { IncludedExam } from './types'
import { useTranslation } from 'react-i18next'

interface IncludedExamResultsProps {
  includedExams: IncludedExam[]
  language: string
}

export const IncludedExamResults = ({ includedExams, language }: IncludedExamResultsProps) => {
  const { t } = useTranslation()
  const getExamDetailElements = (exam: IncludedExam) => {
    const examDetails = exam.details[0]

    return (
      <span key={examDetails.grade}>
        <b>{examDetails.grade}</b>
      </span>
    )
  }

  return (
    <div className="examination-results">
      <table>
        <thead>
          <tr>
            <th colSpan={5}>{t('results.included_exams')}</th>
          </tr>
        </thead>
        <tbody>
          {includedExams.map(exam => (
            <tr key={exam.examUuid}>
              <td className="exam-code">{exam.examDetailsYtlRegCode}</td>
              <td className="exam-name">{language === 'sv' ? exam.nameSwedish : exam.nameFinnish}</td>
              <td className="exam-required"></td>
              <td className="exam-gradecode">{getExamDetailElements(exam)}</td>
              <td className="exam-score"></td>
              <td>
                <span className="exam-status"></span>
                <span className="exam-grade-points">{exam.details[0].gradePoints}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
