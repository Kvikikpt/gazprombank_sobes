// @ts-ignore
import * as React from "react"
import {
  Button,
  Card,
  CardHeader, Checkbox, Chip, FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText, MenuItem,
  Select,
  Typography
  // @ts-ignore
} from "@material-ui/core";
// @ts-ignore
import Axios from 'axios'
import Chart from './chart'

interface propsI  {
  setUpload: any
}

export default function AuthPage(props: propsI) {
  const {setUpload} = props;

  const [dates, setDates] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [balance_left, setBalanceLeft] = React.useState({
    'ЭТП_ГПБ': {'RUB': 0, 'EUR': 0, 'USD': 0},
    'Консалтинг_ГПБ': {'RUB': 0, 'EUR': 0, 'USD': 0},
    'Юр лицо': {'RUB': 0, 'EUR': 0, 'USD': 0}
  });
  const [incomeData, setIncomeData] = React.useState({
    'ЭТП_ГПБ': {'RUB': [], 'EUR': [], 'USD': []},
    'Консалтинг_ГПБ': {'RUB': [], 'EUR': [], 'USD': []},
    'Юр лицо': {'RUB': [], 'EUR': [], 'USD': []}
  });
  const [selectIncome1, setSelectIncome1] = React.useState('RUB');
  const [selectIncome2, setSelectIncome2] = React.useState('RUB');
  const [selectIncome3, setSelectIncome3] = React.useState('RUB');

  React.useEffect(() => {
    // @ts-ignore
    Axios.get("http://127.0.0.1:8000/dates").then((r: any) => {
      setDates(r.data.dates.sort())
      if (r.data.dates.lenght > 0) {
        setSelectedDate(r.data.dates[0])
      }
    })
  }, [])

  React.useEffect(() => {
    if (selectedDate.length > 0) {
      // @ts-ignore
      Axios.post("http://127.0.0.1:8000/balance", {'date': selectedDate}).then((r: any) => {
        setBalanceLeft(r.data.balance_left)
      })
    }
  }, [selectedDate])

  React.useEffect(() => {
    if (startDate.length > 0 && endDate.length > 0) {
      // @ts-ignore
      Axios.post("http://127.0.0.1:8000/income", {startDate, endDate}).then((r: any) => {
        setIncomeData(r.data.income);
      })
    }
  }, [startDate, endDate])

  return <Grid container>
    <Grid item xs={2}>
      <div style={{backgroundColor: '#000066', color: "white"}}>
        <Typography variant="h6" color="inherit" noWrap>
          Панель навигации .....
        </Typography>
      </div>
    </Grid>
    <Grid item xs={10}>
      <div style={{marginTop: 20}}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1}/>
              <Grid item xs={9}>
                <Typography variant="h6" color="inherit" noWrap>
                  Финансовое состояние
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button variant={"contained"} onClick={() => setUpload(true)}>
                  Загрузить данные
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                  title={"Остатки по счетам"}
                  action={
                    <Select
                        value={selectedDate}
                        onChange={(event: any) => {
                          setSelectedDate(event.target.value);
                        }}
                    >
                      {dates.map((item: string, index: number) =>
                        <MenuItem value={item} key={index}>{item}</MenuItem>
                      )}
                    </Select>
                  }
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                  title={"ЭТП_ГПБ"}
              />
              <Grid container>
                <Grid item xs={4}>
                  RUB: <Chip label={balance_left['ЭТП_ГПБ']['RUB']}/>
                </Grid>
                <Grid item xs={4}>
                  EUR: <Chip label={balance_left['ЭТП_ГПБ']['EUR']}/>
                </Grid>
                <Grid item xs={4}>
                  USD: <Chip label={balance_left['ЭТП_ГПБ']['USD']}/>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                  title={"Консалтинг_ГПБ"}
              />
              <Grid container>
                <Grid item xs={4}>
                  RUB: <Chip label={balance_left['Консалтинг_ГПБ']['RUB']}/>
                </Grid>
                <Grid item xs={4}>
                  EUR: <Chip label={balance_left['Консалтинг_ГПБ']['EUR']}/>
                </Grid>
                <Grid item xs={4}>
                  USD: <Chip label={balance_left['Консалтинг_ГПБ']['USD']}/>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                  title={"Юр лицо"}
              />
              <Grid container>
                <Grid item xs={4}>
                  RUB: <Chip label={balance_left['Юр лицо']['RUB']}/>
                </Grid>
                <Grid item xs={4}>
                  EUR: <Chip label={balance_left['Юр лицо']['EUR']}/>
                </Grid>
                <Grid item xs={4}>
                  USD: <Chip label={balance_left['Юр лицо']['USD']}/>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                  title={"Поступления"}
                  action={
                    <div>
                      Дата от
                      <Select
                          value={startDate}
                          onChange={(event: any) => {
                            setStartDate(event.target.value);
                          }}
                      >
                        {dates.map((item: string, index: number) =>
                            <MenuItem value={item} key={index}>{item}</MenuItem>
                        )}
                      </Select>
                      до
                      <Select
                          value={endDate}
                          onChange={(event: any) => {
                            setEndDate(event.target.value);
                          }}
                      >
                        {dates.map((item: string, index: number) =>
                            <MenuItem value={item} key={index}>{item}</MenuItem>
                        )}
                      </Select>

                      <FormControlLabel
                          control={
                            <Checkbox
                                checked={true}
                                name="checkedB"
                                color="primary"
                            />
                          }
                          label="д"
                      />
                      <FormControlLabel
                          control={
                            <Checkbox
                                checked={false}
                                name="checkedB"
                                color="primary"
                            />
                          }
                          label="н"
                      />
                      <FormControlLabel
                          control={
                            <Checkbox
                                checked={false}
                                name="checkedB"
                                color="primary"
                            />
                          }
                          label="м"
                      />
                    </div>
                  }
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                  title={"ЭТП_ГПБ"}
                  action={
                    <Select
                        value={selectIncome1}
                        onChange={(event: any) => {
                          setSelectIncome1(event.target.value);
                        }}
                    >
                      <MenuItem value={'RUB'}>RUB</MenuItem>
                      <MenuItem value={'EUR'}>EUR</MenuItem>
                      <MenuItem value={'USD'}>USD</MenuItem>
                    </Select>
                  }
              />
              <Chart
                  // @ts-ignore
                  data={incomeData['ЭТП_ГПБ'][selectIncome1]}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                  title={"Консалтинг_ГПБ"}
                  action={
                    <Select
                        value={selectIncome2}
                        onChange={(event: any) => {
                          setSelectIncome2(event.target.value);
                        }}
                    >
                      <MenuItem value={'RUB'}>RUB</MenuItem>
                      <MenuItem value={'EUR'}>EUR</MenuItem>
                      <MenuItem value={'USD'}>USD</MenuItem>
                    </Select>
                  }
              />
              <Chart
                  // @ts-ignore
                  data={incomeData['Консалтинг_ГПБ'][selectIncome2]}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader
                  title={"Юр лицо"}
                  action={
                    <Select
                        value={selectIncome3}
                        onChange={(event: any) => {
                          setSelectIncome3(event.target.value);
                        }}
                    >
                      <MenuItem value={'RUB'}>RUB</MenuItem>
                      <MenuItem value={'EUR'}>EUR</MenuItem>
                      <MenuItem value={'USD'}>USD</MenuItem>
                    </Select>
                  }
              />
              <Chart
                  // @ts-ignore
                  data={incomeData['Юр лицо'][selectIncome3]}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </Grid>
  </Grid>
}
