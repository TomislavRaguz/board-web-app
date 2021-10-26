import { useRouteMatch } from 'react-router';
import { Board } from '../components/Board/Board';

export function BoardPage() {
  const { params } = useRouteMatch<{ boardId: string }>()
  return <Board boardId={params.boardId} />
}
