import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ID } from "../../lib";
import { useUpdateBoardMutation } from "../../redux/slices/api";


export function ColumnForm(props: { boardID: string }) {
  const [ updateBoard ] = useUpdateBoardMutation()
  const { register, handleSubmit } = useForm();
  async function onSubmit(formData: { title: string }) {
    try {
      const result = await updateBoard({
        _id: ID("Board", props.boardID),
        patchStrategies: {
          createColumn: { title: formData.title }
        }
      });
      console.log('result', result)
    } catch(e) {
      console.log('updateBoard err', e)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} css={{ marginTop: 10 }}>
      <TextField
        label="title"
        inputProps={register("title", { required: true })}
      />
      
      <Button fullWidth css={{ marginTop: 15 }} variant="contained" type="submit">Create column</Button>
    </form>
  )
}