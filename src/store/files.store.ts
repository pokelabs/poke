import { useTable } from '@/store/store'
import { PrimaryKeyFillStrategy } from '@/base/types'

export const filesStore = useTable<{ id: number; content: string }, 'id'>(
  'files',
  'id',
  { pkStrategy: PrimaryKeyFillStrategy.AutoIncrement },
)

export default filesStore
