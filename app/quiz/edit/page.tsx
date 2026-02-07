'use client'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import {
  BuildingBlocksSidebar,
  QuizStructure,
  PropertiesPanal,
} from './components'
import { useState } from 'react'
import { TCreateQuiz, TQuizQuestion } from './types'
import QuestionCard from './components/QuizStructure/QuestionCard'

export default function CreateNewQuiz() {
  const [activeCard, setActiveCard] = useState<TQuizQuestion | null>(null)
  const [quiz, setQuiz] = useState<TCreateQuiz>({
    title: '',
    questions: [],
  })

  function handleDragStart(event: DragStartEvent) {
    setActiveCard(event.active.data.current as TQuizQuestion)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) {
      setActiveCard(null)
      return
    }

    if (
      active.id.toString().startsWith('question-') &&
      over.id.toString().startsWith('question-')
    ) {
      const activeIndex = parseInt(
        active.id.toString().replace('question-', '')
      )
      const overIndex = parseInt(over.id.toString().replace('question-', ''))

      if (activeIndex !== overIndex) {
        setQuiz((prevState) => ({
          ...prevState,
          questions: arrayMove(prevState.questions, activeIndex, overIndex),
        }))
      }
    } else if (over.id === 'quiz-drop-zone' && active?.data?.current) {
      const questionData = active.data.current as TQuizQuestion

      if (over.data.current?.accepts.includes(questionData.type)) {
        setQuiz((prevState) => ({
          ...prevState,
          questions: [...prevState.questions, { ...questionData }],
        }))
      }
    } else if (
      over.id.toString().startsWith('question-') &&
      active?.data?.current
    ) {
      const questionData = active.data.current as TQuizQuestion
      const overIndex = parseInt(over.id.toString().replace('question-', ''))

      setQuiz((prevState) => {
        const newQuestions = [...prevState.questions]
        newQuestions.splice(overIndex, 0, { ...questionData })
        return {
          ...prevState,
          questions: newQuestions,
        }
      })
    }

    setActiveCard(null)
  }

  return (
    <div>
      <h2 className='text-4xl font-bold mb-6'>Create New Quiz</h2>
      <div className='flex gap-8'>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <BuildingBlocksSidebar />
          <QuizStructure
            quiz={quiz}
            setQuiz={setQuiz}
          />
          <PropertiesPanal />
          <DragOverlay dropAnimation={null}>
            {activeCard ? (
              <QuestionCard
                question={activeCard}
                index={0}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  )
}
