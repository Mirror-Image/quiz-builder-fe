type TDataCellValue =
  | string
  | number
  | string[]
  | boolean
  | undefined
  | object
  | null
  | unknown

type KeyType = number | string | symbol

export type DataCell<Key extends KeyType> = {
  [index in Key]?: TDataCellValue
} & { id: string | number }

export type IColumnConfigItem<K> = {
  key: K | string
  title?: string
}
