import { Button } from '@heroui/react'
import { useDraggable } from '@dnd-kit/core'
import { PropsWithChildren } from 'react'
import { getQuestionTamplate } from './helpers'
import { QUIZ_QUESTION_ENUM } from '../../types'

interface IDraggableProps extends PropsWithChildren {
  type: QUIZ_QUESTION_ENUM
}

function Draggable({ type, children }: IDraggableProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: type,
    data: getQuestionTamplate(type),
  })

  return (
    <Button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {children}
    </Button>
  )
}

export default function BuildingBlocksSidebar() {
  return (
    <div className='flex flex-col gap-2 w-xs mt-6'>
      <Draggable type={QUIZ_QUESTION_ENUM.SINGLE_CHOICE}>
        Single Choise Question
      </Draggable>
      <Draggable type={QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE}>
        Multiple Choise Question
      </Draggable>
      <Draggable type={QUIZ_QUESTION_ENUM.TEXT}>Text Question</Draggable>
    </div>
  )
}
