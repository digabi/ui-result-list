export interface ResultListProps {
  resultList: ResultListGroup[]
}

export interface ResultListGroup {
  groupDescriptionFinnish: string
  groupDescriptionSwedish: string
  groupName: string
  sortIndex: number
  students: Student[]
}

export interface Student {
  name: {
    lastname: string
    firstname: string
  }
  certificateExaminationCode: string
  hasStatementOrDyslexia: boolean
  examination: Examination
  noCompensation: null
  options: {
    ytlKoodi: string
    descriptionFinnish: string
    descriptionSwedish: string
  }[]
  examinationOptions: {
    ytlKoodi: string
    descriptionFinnish: string
    descriptionSwedish: string
  }[]
  ssn: string
  studentUuid?: string
  studiesComplete: boolean
  gradePoints: number
  graduationExaminationCode: string
  technicalErrors?: { technicalErrorPoints: number; gradingExamId: number; examUuid: string; examinationcode: string }[]
  isLaw2022Student: boolean
  languageCounterbalance: boolean
  exams: Exam[]
  includedExams?: IncludedExam[]
  birthday: string
}

export interface Examination {
  firstExam: string
  lastMandatoryExam: string
  studentExaminationsId: number
  studyTypeCode: string
  studyTypeDescFinnish: string
  studyTypeDescSwedish: string
  typeCode: string
}

export interface Exam {
  aborted: boolean
  compensationInfo: { compensated: boolean; requiredCompensationPoints: number } | null
  examResultEquivalency: string
  examUuid: string
  examinationcode: string
  finalGradeScore: number
  gradePoints: number
  gradeRaised: boolean
  gradeSortIndex: number
  gradecodeCode: string
  invalidated: boolean
  isBestGrade: boolean
  isInvalidated: boolean
  isOfficialCompensableGrade: boolean
  latestExamination: boolean
  mandatory: boolean
  maxScore: number
  nameFinnish: string
  nameSwedish: string
  questionScores: { topicnumber: number; weightedScore: number }[][]
  sectionScores: number[]
  examCode: string
}

export interface IncludedExam {
  examDetailsYtlRegCode: string
  details: {
    lastPeriod: string
    grade: string
    gradePoints: number
  }[]
  examUuid: string
  nameFinnish: string
  nameSwedish: string
}

export interface TechnicalError {
  technicalErrorPoints: number
  gradingExamId: number
  examUuid: string
  examinationcode: string
}
