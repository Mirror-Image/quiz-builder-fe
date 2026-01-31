import {IQuiz} from "../types";
import {renderCell} from "../helpers/renderCell";
import {IColumnConfigItem} from "@/app/components/Table/types";

export const useGetQuizzesTableConfig = () => ({
  headerConfig: [
    {
      title: 'Id',
      key: 'id',
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Updated At',
      key: 'updatedAt',
    },
    {
      key: 'edit',
    },
    {
      key: 'view',
    }
  ] as IColumnConfigItem<keyof IQuiz>[],
  renderCell,
})
