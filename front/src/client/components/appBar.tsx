// @ts-ignore
import * as React from "react"
// @ts-ignore
import {Avatar, makeStyles, Toolbar, Typography, AppBar, Container, Theme, Grid} from "@material-ui/core";
// @ts-ignore
import {useSelector} from "react-redux";
// @ts-ignore
import {Email, Flag, Menu, Notifications} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  flex: {
    flexGrow: 1,
  },
  username: {
    marginRight: 15,
  }
}));

export default function Topper() {
  const classes = useStyles();

  return <AppBar position="relative" style={{backgroundColor: '#0099ff'}}>
    <Container maxWidth={"xl"}>
      <Grid container>
        <Grid item xs={2}>
          <Toolbar style={{backgroundColor: '#0066cc'}}>
          <Typography variant="h6" color="inherit" noWrap>
            ЭТП ГПБ
          </Typography>
          </Toolbar>
        </Grid>
        <Grid item xs={10}>
          <Toolbar>
            <Menu/>
            <div className={classes.flex}/>
            <Email className={classes.username}/>
            <Notifications className={classes.username}/>
            <Flag className={classes.username}/>
            <Avatar className={classes.username}/>
            <Typography variant="h6" color="inherit" noWrap className={classes.username}>
              Иванов Иван
            </Typography>
          </Toolbar>
        </Grid>
      </Grid>
    </Container>
  </AppBar>
}
