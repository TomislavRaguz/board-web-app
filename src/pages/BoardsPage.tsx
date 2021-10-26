import React from 'react';
import { Container } from '@mui/material';
import { useBoardsQuery } from '../redux/slices/api';
import { Link } from 'react-router-dom';
//import { boardsSelectors, getBoards } from '../redux/adapters/boardSlice';
import { useSelector } from 'react-redux';
import { reduxStore } from '../redux/store';

export function BoardsPage() {
  const { data: boards, isLoading, error } = useBoardsQuery()
  if(isLoading) return <p>Loading</p>
  if(error || !boards) return <p>Error</p>

  return (
    <Container>
      <h1>Boards</h1>
      {boards.map(board => (
        <Link to={`/boards/${board._id}`} key={board.ID}>
          <div>
            {board.ID} {board.title}
          </div>
        </Link>
      ))}
    </Container>
  )
}