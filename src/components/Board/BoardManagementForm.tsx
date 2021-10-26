import { KeyboardEvent, useState } from 'react'
import { Button, Chip, TextField } from "@mui/material";
import { useSingleBoardAdminQuery, useUpdateBoardMutation } from "../../redux/slices/api";
import { MaterialCheckbox } from "../Inputs/MaterialCheckbox";

export function BoardManagementForm(props: { boardId: string }) {
  const [displayForm, setDisplayForm] = useState(false)
  const { data: board, isLoading, error } = useSingleBoardAdminQuery(props.boardId, { skip: !displayForm })
  const [updateBoard] = useUpdateBoardMutation();
  if(isLoading) return <p>Loading</p>
  if(error) return <p>Error</p>
  
  if(!displayForm || !board) return <Button variant="contained" onClick={() => setDisplayForm(true)}>Display admin form</Button>

  return (
    <div>
      <MaterialCheckbox 
        label="public write"
        checkboxProps={{
          onChange: (e, value) => updateBoard({ _id: props.boardId, patchStrategies: { assign: { publicWrite: value } } }),
          defaultChecked: board.publicWrite
        }}
      />
      <MaterialCheckbox 
        label="public read"
        checkboxProps={{
          onChange: (e, value) => updateBoard({ _id: props.boardId, patchStrategies: { assign: { publicRead: value } } }),
          defaultChecked: board.publicRead
        }}
      />
      <div>
        <span>Admins:</span>
        <div css={{ display: 'flex', alignItems: 'center' }}>
        {board.adminAccessUsers.map((user: any) => <Chip key={user.ID} label={user.email} onDelete={() => {
          updateBoard({ _id: props.boardId, patchStrategies: { removeUser: { userId: user._id }}})
        }}/>)}
        <TextField
          css={{ marginLeft: 5 }}
          variant="outlined"
          label="New admin"
          margin="none"
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if(e.key === "Enter") {
              updateBoard({ _id: props.boardId, patchStrategies: { 
                //@ts-ignore
                addUser: { userEmail: e.target.value, isAdmin: true } 
              }})
            }
          }}
        />
        </div>
        
      </div>
      <div>
        <span>Read only users:</span>
        <div css={{ display: 'flex', alignItems: 'center' }}>
        {board.readAccessUsers.map((user: any) => <Chip key={user.ID} label={user.email} onDelete={() => {
          updateBoard({ _id: props.boardId, patchStrategies: { removeUser: { userId: user._id }}})
        }}/>)}
        <TextField
          css={{ marginLeft: 5 }}
          variant="outlined"
          label="New read only user"
          margin="none"
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if(e.key === "Enter") {
              updateBoard({ _id: props.boardId, patchStrategies: { 
                //@ts-ignore
                addUser: { userEmail: e.target.value, isAdmin: false } 
              }})
            }
          }}
        />
        </div>
        
      </div>
      <Button css={{ marginTop: 15 }} variant="contained" onClick={() => setDisplayForm(false)}>Hide admin form</Button>
    </div>
  )
}