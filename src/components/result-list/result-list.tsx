import React, { useEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { ResultListGroup, Student } from './types'
import { StudentResults } from './student-result'
import { TabNavigation } from './tab-navigation'
import i18next from './locale/i18n'

function useArrayRef() {
  const refs: Array<HTMLDivElement> = []
  return [refs, (element: HTMLDivElement | null) => element && refs.push(element)] as const
}

interface StudentResultListProps {
  language: string
  resultList: ResultListGroup[]
  studentBaseUrl?: string
}

export const ResultList = (props: StudentResultListProps) => (
  <I18nextProvider i18n={i18next}>
    <ResultListContent language={props.language} resultList={props.resultList} studentBaseUrl={props.studentBaseUrl} />
  </I18nextProvider>
)

const ResultListContent = (props: StudentResultListProps) => {
  const { t, i18n } = useTranslation()
  const [sectionRefs, setSectionRef] = useArrayRef()
  const { resultList, language, studentBaseUrl } = props

  useEffect(() => {
    void i18n.changeLanguage(language)
  }, [i18n, language])

  return (
    <div className="result-list-component-container">
      <TabNavigation resultList={resultList} sectionRefs={sectionRefs} />
      {resultList.map(resultListGroup => (
        <div key={resultListGroup.groupName}>
          <h1 id={resultListGroup.groupName} ref={setSectionRef}>
            {t(`results.groups.${resultListGroup.groupName}.title`)} ({resultListGroup.students.length})
          </h1>
          <div className="description">{t(`results.groups.${resultListGroup.groupName}.description`)}</div>
          {resultListGroup.students.map((student: Student) => (
            <StudentResults
              key={`${student.studentUuid || student.birthday}${resultListGroup.groupName}`}
              student={student}
              language="fi"
              studentBaseUrl={studentBaseUrl}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
