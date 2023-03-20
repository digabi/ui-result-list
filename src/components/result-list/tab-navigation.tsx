import React, { useEffect, useRef, useState } from 'react'
import { ResultListGroup } from './types'
import { useTranslation } from 'react-i18next'

interface TabNavigationProps {
  resultList: ResultListGroup[]
  sectionRefs: HTMLDivElement[]
}

// Stores the location of previous Y coordinates for observed elements
const previousYArray: { [key: string]: number } = {}
// Stores the location of previous ratios for observed elements
const previousRatioArray: { [key: string]: number } = {}

export const TabNavigation = ({ resultList, sectionRefs }: TabNavigationProps) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>('')
  const activeTabRef = useRef<string>('')
  activeTabRef.current = activeTab

  const [tabOrder, setTabOrder] = useState<string[]>([])
  const tabOrderRef = useRef<string[]>([])
  tabOrderRef.current = tabOrder

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const tabChanges: string[] = []

    entries.forEach((entry: IntersectionObserverEntry) => {
      const currentY = entry.boundingClientRect.y
      const currentRatio = entry.intersectionRatio
      const isIntersecting = entry.isIntersecting

      const targetId = entry.target?.getAttribute('id') || ''
      const targetTabOrder = tabOrderRef.current.indexOf(targetId)

      const previousY = previousYArray[targetId] || 0
      const previousRatio = previousRatioArray[targetId] || 0

      if (currentY < previousY) {
        // scrolling down
        if (currentRatio > previousRatio && isIntersecting) {
          // Target is entering the screen from the bottom
          tabChanges.push(targetId)
        }
      } else if (currentY > previousY) {
        // scrolling up
        if (currentRatio > previousRatio && isIntersecting) {
          // target is entering screen from the top
          tabChanges.push(targetId)
        } else if (activeTabRef.current === targetId) {
          // target is leaving screen from the bottom
          tabChanges.push(tabOrderRef.current[targetTabOrder - 1])
        }
      }

      // Save current components y position and ratio so we can use these the determine the scrolling direction
      previousYArray[targetId] = currentY
      previousRatioArray[targetId] = currentRatio
    })

    // In case of multiple intersections, choose the first one in the array
    if (tabChanges.length > 0) {
      setActiveTab(tabChanges[0])
    }
  }

  useEffect(() => {
    setTabOrder(resultList.map(resultGroup => resultGroup.groupName))
    setActiveTab(resultList[0].groupName)
  }, [resultList])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sectionRefs.forEach(ref => observer.observe(ref))
    return () => observer.disconnect()
  }, [sectionRefs])

  if (!resultList.length) {
    return null
  }

  return (
    <div className="tab-navigation">
      {resultList.map(({ groupName, students }) => (
        <a
          className={activeTab === groupName ? 'active' : undefined}
          onClick={() => scrollTo(groupName)}
          key={groupName}>
          {t(`results.groups.${groupName}.navigation`)} ({students.length})
        </a>
      ))}
    </div>
  )
}

const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  const header = document.querySelector('.tab-navigation')
  if (!element || !header) return

  let scrollPoint = element.getBoundingClientRect().top + window.scrollY - 20
  scrollPoint -= header.getBoundingClientRect().height
  window.scrollTo({ top: scrollPoint, behavior: 'auto' })
}
