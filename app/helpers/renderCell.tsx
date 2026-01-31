import {IQuiz} from "../types";
import LinkCell from "../components/cells/LinkCell";
import DateCell from "../components/cells/DateCell";
import { APP_ROUTES } from "../constants/routes";
import { generatePath } from "../utilities/routes"

export const renderCell = <K = string>(
  row: IQuiz,
  columnKey: K extends keyof IQuiz ? K : string
) => {
  const cellValue =
    (typeof columnKey === "string" && columnKey in row)
      ? row[columnKey as keyof IQuiz]
      : undefined;

  switch (columnKey) {
    case "edit":
      return (
        <LinkCell href={generatePath(APP_ROUTES.edit, { id: row.id })} label='Edit' />
      )
    case "view":
      return (
        <LinkCell href={generatePath(APP_ROUTES.view, { id: row.id })} label='View' />
    )
    case "updatedAt":
      return (
        <DateCell data={row.updatedAt} />
      )
    default:
      return cellValue;
    }
}
