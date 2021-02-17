// @ts-ignore
import * as React from "react"
// @ts-ignore
import {useDispatch, useSelector} from 'react-redux'
// @ts-ignore
import {Button, Container, CssBaseline, Dialog, makeStyles, Theme, Typography} from "@material-ui/core";
import IndexPage from "../components/indexPage";
import AppBar from "../components/appBar";
// @ts-ignore
import Axios from 'axios'

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function App() {
    const classes = useStyles();
    const [upload, setUpload] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [fileName, setFileName] = React.useState('');

  return (<React.Fragment>
        <AppBar/>
        <Container maxWidth={"xl"} component={"main"}>
          <CssBaseline />
          <IndexPage setUpload={setUpload}/>
        </Container>

          <Dialog onClose={() => setUpload(false)} open={upload} maxWidth={"sm"} fullWidth>
              <div className={classes.paper}>
                  <Typography variant="h6" color="inherit" noWrap className={classes.submit}>
                      {fileName}
                  </Typography>
                  <Button
                      variant="contained"
                      component="label"
                      color={"primary"}
                  >
                      Upload File
                      <input
                          // @ts-ignore
                          type="file"
                          hidden
                          onChange={({target}) => {
                              if (target.files !== null) {
                                  setFileName(target.files[0].name)
                                  // @ts-ignore
                                  setFile(target.files[0])
                              }
                          }}
                      />
                  </Button>
                  <Button
                      disabled={file === null}
                      className={classes.submit}
                      color={"primary"}
                      variant={"outlined"}
                      onClick={() => {
                          setUpload(false)
                          let form = new FormData();
                          if (file !== null) {
                              // @ts-ignore
                              form.append('file', file);
                          }
                          // @ts-ignore
                          Axios.post("http://127.0.0.1:8000/upload", form, {headers: {
                                  'Content-Type': 'multipart/form-data',
                              }}).then((r: any) => console.log(r))
                      }}
                  >
                      Загрузить
                  </Button>
              </div>
          </Dialog>
    </React.Fragment>
  )
}
