import { Input, Button, Checkbox } from '@heroui/react'
import { TQuizQuestion, QUIZ_QUESTION_ENUM } from '../../types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash, X, Plus, GripVertical } from 'lucide-react'

interface IQuestionCardProps {
  question: TQuizQuestion
  index: number
  onUpdate?: (index: number, question: TQuizQuestion) => void
  onDelete?: (index: number) => void
}

export default function QuestionCard({
  question,
  index,
  onUpdate,
  onDelete,
}: IQuestionCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `question-${index}`,
      data: question,
    })

  const handleQuestionTextChange = (value: string) => {
    onUpdate?.(index, { ...question, question: value })
  }

  const handleRequiredChange = (isRequired: boolean) => {
    onUpdate?.(index, { ...question, isRequired })
  }

  const handleOptionChange = (optionIndex: number, value: string) => {
    if (
      question.type === QUIZ_QUESTION_ENUM.SINGLE_CHOICE ||
      question.type === QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE
    ) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value

      onUpdate?.(index, { ...question, options: newOptions })
    }
  }

  const handleAddOption = () => {
    if (
      question.type === QUIZ_QUESTION_ENUM.SINGLE_CHOICE ||
      question.type === QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE
    ) {
      onUpdate?.(index, { ...question, options: [...question.options, ''] })
    }
  }

  const handleRemoveOption = (optionIndex: number) => {
    if (
      question.type === QUIZ_QUESTION_ENUM.SINGLE_CHOICE ||
      question.type === QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE
    ) {
      const newOptions = question.options.filter((_, i) => i !== optionIndex)

      onUpdate?.(index, { ...question, options: newOptions })
    }
  }

  const handleLongAnswerChange = (isLongAnswer: boolean) => {
    if (question.type === QUIZ_QUESTION_ENUM.TEXT) {
      onUpdate?.(index, { ...question, isLongAnswer })
    }
  }

  const getQuestionTypeLabel = () => {
    switch (question.type) {
      case QUIZ_QUESTION_ENUM.SINGLE_CHOICE:
        return 'Single Choice Question'
      case QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE:
        return 'Multiple Choice Question'
      case QUIZ_QUESTION_ENUM.TEXT:
        return 'Text Question'
      default:
        return 'Question'
    }
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='p-4 rounded-lg bg-gray-900 shadow-sm'
    >
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <div
            {...listeners}
            {...attributes}
            className='cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600'
          >
            <GripVertical size='16px' />
          </div>
          <span className='text-sm font-semibold text-gray-600'>
            {getQuestionTypeLabel()}
          </span>
        </div>
        <Button
          size='sm'
          color='danger'
          onPress={() => onDelete?.(index)}
          startContent={<Trash size='16px' />}
        >
          Delete
        </Button>
      </div>

      <div className='flex flex-col gap-4'>
        <Input
          value={question.question}
          onChange={(e) => handleQuestionTextChange(e.target.value)}
          placeholder='Enter your question'
          label='Question'
          labelPlacement='outside'
        />

        {question.type === QUIZ_QUESTION_ENUM.SINGLE_CHOICE ||
        question.type === QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE ? (
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Options</label>
            {question.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className='flex gap-2 items-center'
              >
                <Input
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(optionIndex, e.target.value)
                  }
                  placeholder={`Option ${optionIndex + 1}`}
                  className='flex-1'
                />
                {question.options.length > 1 && (
                  <Button
                    isIconOnly
                    size='sm'
                    color='danger'
                    onPress={() => handleRemoveOption(optionIndex)}
                  >
                    <X size='16px' />
                  </Button>
                )}
              </div>
            ))}
            <Button
              size='sm'
              color='primary'
              onPress={handleAddOption}
              className='self-start'
              startContent={<Plus size='16px' />}
            >
              Add Option
            </Button>
          </div>
        ) : question.type === QUIZ_QUESTION_ENUM.TEXT ? (
          <Checkbox
            isSelected={question.isLongAnswer}
            onValueChange={handleLongAnswerChange}
          >
            Long answer
          </Checkbox>
        ) : null}

        <Checkbox
          isSelected={question.isRequired}
          onValueChange={handleRequiredChange}
        >
          Required
        </Checkbox>
      </div>
    </div>
  )
}
