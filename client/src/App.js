import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { phoneBookValidationSchema } from "./validationSchema";
import axios from "axios";
import React from "react";
import { phoneBookFetchAPI } from "./_api";
function App() {
  const [contacts, setContacts] = React.useState();
  const Input = ({ field, form, ...props }) => {
    return <TextField {...field} {...props} />;
  };
  React.useEffect(() => {
    phoneBookFetchAPI().then((response) => {
      const row = response.data.reduce((acc, curr) => {
        acc = [
          ...acc,
          {
            firstname: curr.firstname,
            lastname: curr.lastname,
            phonenumber: curr.phonenumber,
          },
        ];
        return acc;
      }, []);
      setContacts(row);
    });
  }, []);
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Grid
        container
        sx={{ width: "100%", pt: 2 }}
        justifyContent="center"
        alignItems="center"
        rowSpacing={4}
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Phone Book
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justifyContent="center"
        >
          <Formik
            initialValues={{ firstname: "", lastname: "", phonenumber: "" }}
            validationSchema={phoneBookValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              axios({
                baseURL: "http://127.0.0.1:8000/add-phoneNumber",
                method: "post",
                data: {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  phonenumber: values.phonenumber,
                },
              })
                .then((response) => {
                  if (response.status === 200) {
                    phoneBookFetchAPI().then((response) => {
                      setContacts(response.data);
                    });
                  }
                  setSubmitting(false);
                })
                .catch((e) => setSubmitting(false));
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Field
                    name="firstname"
                    label={"First Name"}
                    component={Input}
                  />
                  <ErrorMessage name="firstname">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                  <Field
                    name="lastname"
                    label={"Last Name"}
                    margin="normal"
                    component={Input}
                  />
                  <ErrorMessage name="lastname">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>

                  <Field
                    name="phonenumber"
                    label={"Phone Number"}
                    margin="normal"
                    component={Input}
                  />
                  <ErrorMessage name="phonenumber">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item container justifyContent={"center"}>
          <TableContainer component={Paper} sx={{ width: "unset" }}>
            <Table sx={{ minWidth: 654 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">First Name</TableCell>
                  <TableCell align="right">Last Name</TableCell>
                  <TableCell align="right">Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(contacts) &&
                  contacts.length > 0 &&
                  contacts.map((row) => (
                    <TableRow
                      key={row.phonenumber}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.firstname}</TableCell>
                      <TableCell align="right">{row.lastname}</TableCell>
                      <TableCell align="right">{row.phonenumber}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
