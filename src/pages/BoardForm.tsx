import { Button, Container, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { MaterialCheckbox } from "../components/Inputs/MaterialCheckbox";
import { showLoadingOverlay } from "../components/LoadingOverlay";
import { useCreateBoardMutation } from "../redux/slices/api";
import { useAppDispatch } from "../redux/store";

export function BoardForm () {
  const [ createBoard, { isLoading } ] = useCreateBoardMutation()
  const { register, handleSubmit } = useForm();
  const history = useHistory()
  const onSubmit = async (data: any) => {
    try {
      const result = await createBoard(data);
      if("data" in result) {
        history.push(`/boards/${result.data._id}`)
      }
    } catch(e) {
      console.log(e)
    }
  }
  const onError = (errors: any) => console.log(errors);
  return (
    <Container>
      <h1>Create board</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          label="Board title"
          InputProps={register("title")}
          variant="standard"
        />
        <div css={{ marginTop: 15 }}>
          <MaterialCheckbox 
            label="Public read"
            checkboxProps={register("publicRead")}
          />
        </div>
        <div>
          <MaterialCheckbox 
            label="Public write"
            checkboxProps={register("publicWrite")}
          />
        </div>
        <Button css={{ marginTop: 15 }} type="submit" variant="contained">Create board</Button>
        
      </form>
    </Container>
  )
}