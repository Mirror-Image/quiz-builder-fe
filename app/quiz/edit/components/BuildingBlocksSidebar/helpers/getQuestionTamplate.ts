import { QUIZ_QUESTION_ENUM } from '../../../types'

export const getQuestionTamplate = (type: QUIZ_QUESTION_ENUM) => {
  switch (type) {
    case QUIZ_QUESTION_ENUM.SINGLE_CHOICE:
      return {
        type: QUIZ_QUESTION_ENUM.SINGLE_CHOICE,
        question: '',
        options: [],
        isRequired: false,
      }
    case QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE:
      return {
        type: QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE,
        question: '',
        options: [],
        isRequired: false,
      }
    case QUIZ_QUESTION_ENUM.TEXT:
      return {
        type: QUIZ_QUESTION_ENUM.TEXT,
        question: '',
        isLongAnswer: false,
        isRequired: false,
      }
  }
}
