'use client'
import { Button } from "@heroui/react";
import Table from "./components/Table/Table";
import {QUIZZES_TABLE_DATA} from "./constants";
import {useGetQuizzesTableConfig} from "./hooks/useGetQuizzesTableConfig";
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from './constants/routes'

export default function QuizList() {
  const router = useRouter();

  const navigateAddNewQuiz = () => {
    router.push(APP_ROUTES.new)
  }

  const { renderCell, headerConfig } = useGetQuizzesTableConfig()

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-6">
        <h2 className="text-4xl font-bold">Quizzes List</h2>
        <Button color='primary' onPress={navigateAddNewQuiz}>Add New Quiz</Button>
      </div>
      <Table
        data={QUIZZES_TABLE_DATA}
        headerConfig={headerConfig}
        renderCell={renderCell}
      />
    </div>
  )
}
