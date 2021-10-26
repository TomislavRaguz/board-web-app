import { Cancel, ControlPoint } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { css } from "@mui/styled-engine";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IColumn, useUpdateColumnMutation } from "../../redux/slices/api";

export function AddCard (props: { column: IColumn }) {
  const { register, handleSubmit } = useForm();
  const [ updateColumn, { isLoading } ] = useUpdateColumnMutation();
  const [displayForm, setDisplayForm] = useState(false)
  if(displayForm) {
    const onSubmit = async (formData: { content: string }) => {
      const nextRows = [...props.column.rows, formData]
      try {
        await updateColumn({ _id: props.column._id, patchStrategies: {
          setRows: { rows: nextRows }
        }})
        setDisplayForm(false)
      } catch(e) {
        console.log(e)
      }
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div css={{ padding: 5, backgroundColor: 'white', marginTop: 10, borderRadius: 5 }}>
          <TextField
            multiline
            placeholder="Enter card content here..."
            variant='standard'
            inputProps={register("content")}
            css={{ marginBottom: 10 }}
          />
          <div css={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained">Save</Button>
            <Cancel 
              css={{ marginLeft: 'auto', marginRight: 5 }}
              fontSize="medium"
              color="error"
              onClick={() => setDisplayForm(false)}
            />
          </div>
        </div>
        
      </form>
    )
  }
  return (
    <div 
    css={css`
      display: flex; 
      margin-top: 10px;
      margin-bottom: 10px;
      padding-left: 5px;
      cursor: pointer;
      transition: color 0.3s;
      &:hover { 
        color: white
      }`}
      onClick={() => setDisplayForm(true)}
    >
      <ControlPoint />
      <span css={{ marginLeft: 5 }}>Add a card</span>
    </div>
  )
}