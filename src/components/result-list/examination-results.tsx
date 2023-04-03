import React, { useEffect, useState } from 'react'
import { ExamResults } from './exam-results'
import { Exam } from './types'
import { useTranslation } from 'react-i18next'

interface ExaminationResultsProps {
  exams: Exam[]
  examinationcode: string
  language: string
  isLaw2022Student: boolean
}

export const ExaminationResults = ({ exams, examinationcode, language, isLaw2022Student }: ExaminationResultsProps) => {
  const [maximumQuestions, setMaximumQuestions] = useState<number>(0)
  const [lastCompletedExamIndex, setLastCompletedExamIndex] = useState<number>(0)

  useEffect(() => {
    setMaximumQuestions(
      Math.max(
        ...exams.map(exam => {
          if (exam.questionScores) {
            return exam.questionScores.flatMap(score => score).length
          } else {
            return 0
          }
        })
      )
    )

    const firstIncompleteExam = exams.find(exam => !exam.questionScores)
    const firstIncompleteExamIndex = firstIncompleteExam ? exams.indexOf(firstIncompleteExam) : exams.length
    setLastCompletedExamIndex(firstIncompleteExamIndex - 1)
  }, [exams])

  return (
    <div className="examination-results">
      <table>
        <thead>
          <tr>
            <th colSpan={5}>{getExaminationTitle(examinationcode)}</th>
            {maximumQuestions > 0 &&
              Array(maximumQuestions)
                .fill(undefined)
                .map((_, index) => (
                  <th key={index} className="question-score">
                    {index + 1}
                  </th>
                ))}
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <ExamResults
              exam={exam}
              maximumQuestions={maximumQuestions}
              lastCompletedExam={index === lastCompletedExamIndex}
              language={language}
              isLaw2022Student={isLaw2022Student}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const getExaminationTitle = (examinationcode: string) => {
  const { t } = useTranslation()
  const year = examinationcode.substring(0, 4)
  const season = examinationcode[4] === 'K' ? 'spring' : 'autumn'

  return (
    <>
      {year} {t(season)}
    </>
  )
}
