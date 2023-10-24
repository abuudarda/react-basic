import React from "react";
import {
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left"
  },
  resultTable: {
    marginTop: theme.spacing(2)
  },
  backButton: {
    marginTop: theme.spacing(5)
  },
  downloadButton: {
    marginTop: theme.spacing(5)
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
    gap: theme.spacing(2)
  }
}));

const ResultPage = ({ formData }) => {
  const classes = useStyles();

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Result Page", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center"
    });
    doc.setFontSize(12);
    doc.text(
      `Project Name: ${formData.projectName}`,
      10,
      30,
      { align: "left" }
    );
    doc.text(
      `Project Description: ${formData.projectDesc}`,
      10,
      40,
      { align: "left" }
    );
    doc.text(
      `Client: ${formData.projectClient}`,
      10,
      50,
      { align: "left" }
    );
    doc.text(
      `Contractor: ${formData.projectContractor}`,
      10,
      60,
      { align: "left" }
    );

    const tableData = [
      ["X", formData.minX, formData.maxX],
      ["Y", formData.minY, formData.maxY],
      ["Z", formData.minZ, formData.maxZ]
    ];

    doc.autoTable({
      head: [["", "Minimum", "Maximum"]],
      body: tableData,
      startY: 70,
      theme: "grid",
      styles: {
        fontSize: 12,
        textColor: [1, 1, 1],
        headStyles: { fillColor: [100, 100, 100] }
      }
    });

    doc.save("Result.pdf");
  };

  return (
    <Container className={classes.resultContainer} >
      <Typography variant="h4" className={classes.header} align="center">
          Result Page
        </Typography>
      <div className={classes.inputGroup}>
      <Typography variant="h6">
          Project Name: {formData.projectName}
        </Typography>
        <Typography variant="h6" >
          Project Description: {formData.projectDesc}
        </Typography>
        <Typography variant="h6" >
          Client: {formData.projectClient}
        </Typography>
        <Typography variant="h6">
          Contractor: {formData.projectContractor}
        </Typography>
        
      </div>
      <TableContainer className={classes.resultTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Minimum</TableCell>
              <TableCell>Maximum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>X</TableCell>
              <TableCell>{formData.minX}</TableCell>
              <TableCell>{formData.maxX}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Y</TableCell>
              <TableCell>{formData.minY}</TableCell>
              <TableCell>{formData.maxY}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Z</TableCell>
              <TableCell>{formData.minZ}</TableCell>
              <TableCell>{formData.maxZ}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classes.buttonGroup}>
        <Button
          variant="contained"
          color="primary"
          onClick={generatePdf}
          className={classes.downloadButton}
        >
          Download PDF
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            window.location.href = "/";
          }}
          className={classes.backButton}
        >
          Go Back to Home
        </Button>
      </div>
    </Container>
  );
};

export default ResultPage;
