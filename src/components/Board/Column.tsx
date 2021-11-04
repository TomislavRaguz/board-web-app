import { useState } from 'react'
import { MoreVert } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { css } from "@mui/styled-engine";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useOuterClick } from "../../lib";
import { AddCard } from "./AddCard";
import { IColumn, useUpdateBoardMutation } from '../../redux/slices/api';

export function Column(props: { 
    column: IColumn
    boardId: string
  }) {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [updateBoard] = useUpdateBoardMutation();
  const outerClick = useOuterClick(() => {
    if(displayMenu) setDisplayMenu(false)
  })

  async function deleteColumn(columnId: string) {
    try {
      await updateBoard({
        _id:  props.boardId,
        patchStrategies: {
          removeColumn: { columnId }
        }
      });
    } catch(e) {
      console.log('updateBoard err', e)
    }
  }

  const { column } = props;
  return (
    <div 
      css={styles.columnContainer} 
    >

      <div css={styles.columnHeaderContainer}>
        <div css={{ flex: 1 }}>
          <span>{column.title}</span>
        </div>

        <div onClick={() => setDisplayMenu(state => !state)} css={styles.vertContainer}>
          <MoreVert css={styles.vert}/>
          {displayMenu && (
            <Paper 
              ref={outerClick}
              css={styles.vertMenuContainer}>
                <div css={styles.vertMenuHeader}>
                  Column actions
                </div>
                <div css={styles.vertMenuOption}
                  onClick={() => navigator.clipboard.writeText(props.column._id)}
                >
                  <div
                   css={styles.vertMenuOptionInner}>
                    copy column ID
                  </div>
                </div>
                <div css={styles.vertMenuOption}
                  onClick={() => deleteColumn(props.column._id)} 
                >
                  <div
                    css={{ padding: 5 }}>
                    delete column
                  </div>
                </div>
            </Paper>
          )}
        </div>

      </div>
      
      <div 
        css={styles.columnBody}
      >
        <Droppable droppableId={column._id}>
          {provided => (
            <div css={{ minHeight: 22 }} {...provided.droppableProps} ref={provided.innerRef}>
              {column.rows.map((row, i) => (
                <Draggable key={row._id} draggableId={row._id} index={i}>
                  {provided => (
                    <div css={{ 
                        backgroundColor: 'white', 
                        borderRadius: 5,
                        marginTop: 5,
                        padding: 5,
                        boxShadow: '2px 2px gray'
                      }}  
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {row.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <AddCard 
          column={column}
        />
      </div>
    </div>
  )
}

const styles = {
  columnContainer: css({
    margin: 15, 
    width: 180, 
    borderRadius: 5, 
    flexShrink: 0
  }),
  columnHeaderContainer: css({
    padding: 5, 
    display: "flex", 
    borderBottom: '1px solid gray', 
    backgroundColor: "white"
  }),
  vertContainer: css`
    display: flex;
    position: relative;
    justifyContent: center; 
    alignItems: center;
    width: 20px;
  `,
  vert: css`
  cursor: pointer;
  &:hover { 
    color: darkgray
  }`,
  vertMenuContainer: css({ 
    top: 25,  
    width: 200, 
    position: 'absolute', 
    backgroundColor: "white" ,
    zIndex: 200
  }),
  vertMenuHeader: css({
    padding: 5, 
    borderBottom: "1px solid gray", 
    color: "gray"
  }),
  vertMenuOption: css`
  cursor: pointer;
  &:hover { background-color: #ededed; }
  `,
  vertMenuOptionInner: css({ 
    padding: 5, 
    marginLeft: 5, 
    marginRight: 5, 
    borderBottom: "1px solid black" 
  }),
  columnBody: css({
    backgroundColor: 'rgba(255, 255, 255, 0.65)', 
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  })
}