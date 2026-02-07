export type TCreateQuiz = {
  title: string
  questions: TQuizQuestion[]
  footer?: string
  isPublished?: boolean
}

export type TQuizQuestion =
  | TSingleChoiceQuestion
  | TMultipleChoiceQuestion
  | TTextQuestion

export type TSingleChoiceQuestion = {
  type: QUIZ_QUESTION_ENUM.SINGLE_CHOICE
  question: string
  options: string[]
  isRequired: boolean
}

export type TMultipleChoiceQuestion = {
  type: QUIZ_QUESTION_ENUM.MULTIPLE_CHOICE
  question: string
  options: string[]
  isRequired: boolean
}

export type TTextQuestion = {
  type: QUIZ_QUESTION_ENUM.TEXT
  question: string
  isLongAnswer: boolean
  isRequired: boolean
}

export enum QUIZ_QUESTION_ENUM {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TEXT = 'TEXT',
}
