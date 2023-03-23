import React, { useEffect, useState } from 'react'
import { ExaminationResults } from './examination-results'
import { Exam, Student } from './types'
import { IncludedExamResults } from './included-exam-result'
import { useTranslation } from 'react-i18next'

interface StudentResultsProps {
  student: Student
  language: string
}

interface ExamsByExamination {
  [key: string]: Exam[]
}

export const StudentResults = ({ student, language }: StudentResultsProps) => {
  const [exams, setExams] = useState<ExamsByExamination>({})
  const [totalGradePoints, setTotalGradePoints] = useState<number>()

  useEffect(() => {
    const addIncludedExamPoints = (gradePoints: number) =>
      student.includedExams.reduce((total, exam) => exam.details[0].gradePoints + total, gradePoints)

    const calculatedGradePoints = student.exams.reduce((total, exam) => {
      if (exam.isBestGrade) {
        return exam.gradePoints + total
      }

      return total
    }, 0)

    setTotalGradePoints(addIncludedExamPoints(calculatedGradePoints))
    setExams(groupExams(student.exams))
  }, [student])

  return (
    <div className="student-results">
      <h2 className="header">
        <span>
          <strong>{student.name.lastname}</strong> {student.name.firstname}
        </span>
        {student.ssn && <span className="ssn">{student.ssn}</span>}
        <span className={student.ssn ? 'birthday' : 'birthday no-ssn'}>{student.birthday}</span>
        <span className="statements">
          <em>{getStatements(student)}</em>
        </span>
        <span className="total-grade-points">{totalGradePoints}</span>
      </h2>

      {Object.keys(exams).map(examinationcode => (
        <ExaminationResults
          key={examinationcode}
          exams={exams[examinationcode]}
          examinationcode={examinationcode}
          language={language}
          isLaw2022Student={student.isLaw2022Student}
        />
      ))}
      {student.includedExams.length ? (
        <IncludedExamResults includedExams={student.includedExams} language={language} />
      ) : null}
    </div>
  )
}

const getStatements = (student: Student) => {
  const t = (translateStr: string) => translateStr
  const statements = []

  if (student.dyslexias.length > 0) {
    statements.push(t('results.dyslexia'))
  }
  if (student.statements.length > 0) {
    statements.push(t('results.statement'))
  }
  if (student.technicalErrors.length > 0) {
    statements.push(t('results.technical_error'))
  }

  return statements.map((Statement, index) =>
    index === statements.length - 1 ? <span key={index}>{Statement}</span> : <span key={index}>{Statement}, </span>
  )
}

const groupExams = (exams: Exam[]) => {
  exams.sort((a, b) => b.examinationcode.localeCompare(a.examinationcode))

  const groupedExams = exams.reduce((result: ExamsByExamination, exam) => {
    if (result[exam.examinationcode]) {
      result[exam.examinationcode].push(exam)
    } else {
      result[exam.examinationcode] = [exam]
    }

    return result
  }, {})

  Object.keys(groupedExams).forEach(examinationcode => {
    groupedExams[examinationcode].sort((a, b) => {
      if (Boolean(a.questionScores) === Boolean(b.questionScores)) {
        return a.nameFinnish.localeCompare(b.nameFinnish, 'fi')
      }

      return a.questionScores ? -1 : 1
    })
  })

  return groupedExams
}
