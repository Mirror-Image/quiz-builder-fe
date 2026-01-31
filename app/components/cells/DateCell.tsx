interface IDateCellProps {
    data: string
  }

export default function DateCell({ data }: IDateCellProps) {
    return new Date(data).toLocaleString()
}