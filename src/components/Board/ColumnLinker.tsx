import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ID } from "../../lib";
import { useUpdateBoardMutation } from "../../redux/slices/api";

export function ColumnLinker(props: { boardID: string }) {
  const [ updateBoard ] = useUpdateBoardMutation()
  const { register, handleSubmit } = useForm();
  async function onSubmit(formData: { columnId: string }) {
    try {
      const result = await updateBoard({
        _id: ID("Board", props.boardID),
        patchStrategies: {
          linkColumn: { columnId: formData.columnId }
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
        label="columnId"
        inputProps={register("columnId", { required: true })}
      />
      
      <Button fullWidth css={{ marginTop: 15 }} variant="contained" type="submit">Link column</Button>
    </form>
  )
}