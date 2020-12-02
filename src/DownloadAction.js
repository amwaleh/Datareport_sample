import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const DownloadAction = (id) => {
  const input = document.getElementById(id)

  html2canvas(input, {scale: 2}).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg')
    const pdf = new jsPDF()
    const imgProps= pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, 'JPEG', 5, 5, pdfWidth - 10, pdfHeight - 20)
    // pdf.save("delivery-report.pdf");
   pdf.autoPrint()
    //pdf.output('dataurlnewwindow')
  })
}

export default DownloadAction
