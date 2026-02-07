import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Input } from '@heroui/react'
import { TCreateQuiz, QUIZ_QUESTION_ENUM, TQuizQuestion } from '../../types'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import QuestionCard from './QuestionCard'

interface IQuizStructureProps {
  quiz: TCreateQuiz
  setQuiz: Dispatch<SetStateAction<TCreateQuiz>>
}

export default function QuizStructure({ quiz, setQuiz }: IQuizStructureProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'quiz-drop-zone',
    data: {
      accepts: [
        QUIZ_QUESTION_ENUM.SINGLE_CHOICE,
        QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE,
        QUIZ_QUESTION_ENUM.TEXT,
      ],
    },
  })

  const onChangeQuixTitlehandler = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>
  ) => {
    setQuiz((prevState) => ({
      ...prevState,
      title: event.target.value,
    }))
  }

  const handleQuestionUpdate = (
    index: number,
    updatedQuestion: TQuizQuestion
  ) => {
    setQuiz((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((q, i) =>
        i === index ? updatedQuestion : q
      ),
    }))
  }

  const handleQuestionDelete = (index: number) => {
    setQuiz((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Input
        value={quiz.title}
        onChange={onChangeQuixTitlehandler}
        label='Quiz Title'
        labelPlacement='outside'
      />
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-4 min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors ${
          isOver ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
      >
        {quiz.questions.length === 0 ? (
          <div className='text-center text-gray-400 py-8'>
            Drag questions here to build your quiz
          </div>
        ) : (
          <SortableContext
            items={quiz.questions.map((_, index) => `question-${index}`)}
            strategy={verticalListSortingStrategy}
          >
            {quiz.questions.map((question, index) => (
              <QuestionDropZone
                key={`drop-${index}`}
                index={index}
              >
                <QuestionCard
                  question={question}
                  index={index}
                  onUpdate={handleQuestionUpdate}
                  onDelete={handleQuestionDelete}
                />
              </QuestionDropZone>
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  )
}

function QuestionDropZone({
  index,
  children,
}: {
  index: number
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `question-${index}`,
    data: {
      accepts: [
        QUIZ_QUESTION_ENUM.SINGLE_CHOICE,
        QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE,
        QUIZ_QUESTION_ENUM.TEXT,
      ],
    },
  })

  return (
    <div
      ref={setNodeRef}
      className={isOver ? 'ring-2 ring-primary ring-offset-2 rounded-lg' : ''}
    >
      {children}
    </div>
  )
}
