const { join } = require('path');
const axios = require('axios');
const multer = require('multer');
const excelJS = require("exceljs");


exports.simpleDownloadLocalFile = (req, res) => {
    const filePath = join(__dirname, '../marksheets', '10thmarksheet.jpg');
    return filePath;

}

exports.downloadFromRemoteLocationWithSecurity = async (req, res) => {
    const url = 'https://cdn.pixabay.com/photo/2016/10/26/19/00/domain-names-1772243_960_720.jpg';
    const img = await axios.get(url, { responseType: 'arraybuffer' });
    return img?.data;
}

exports.downloadExcelFromDBOrObject = () => {

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("My Users");

        worksheet.columns = [
            { header: "S no.", key: "s_no", width: 10 },
            { header: "First Name", key: "fname", width: 10 },
            { header: "Last Name", key: "lname", width: 10 },
            { header: "Email Id", key: "email", width: 10 },
            { header: "Gender", key: "gender", width: 10 },
        ];
        const rows = [
            { s_no: 1, fname: 'Abhishek', lname: 'Bhardwaj', email: 'a@a.com', gender: 'Male' },
            { s_no: 2, fname: 'Lalit', lname: 'Sharma', email: 'a@b.com', gender: 'Male' },
            { s_no: 3, fname: 'Sumit', lname: 'Kumar', email: 'a@c.com', gender: 'Male' },
            { s_no: 4, fname: 'Lokender', lname: 'Thakur', email: 'a@d.com', gender: 'Male' },
            { s_no: 5, fname: 'Sippi', lname: 'Varma', email: 'a@e.com', gender: 'Female' },
            { s_no: 6, fname: 'Nisha', lname: 'Gupta', email: 'a@f.com', gender: 'Female' },
            { s_no: 7, fname: 'Kapil', lname: 'Kumar', email: 'a@g.com', gender: 'Male' },
            { s_no: 8, fname: 'Tanu', lname: 'Yadav', email: 'a@h.com', gender: 'Female' },
            { s_no: 9, fname: 'Jatin', lname: 'Dubay', email: 'a@i.com', gender: 'Male' },
            { s_no: 10, fname: 'Veer', lname: 'Jaswal', email: 'a@j.com', gender: 'Male' },
        ];

        rows.forEach((user) => worksheet.addRow(user));
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        return workbook

}


exports.uploadFile = (() => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, join(__dirname, '../public'));
        },
        filename: function (req, file, cb) {
            console.log("file", file);
            const [, ext] = file.mimetype.split('/');
            const fileName = `${file.fieldname + new Date().getTime()}.${ext}`;
            cb(null, fileName);
        }
    });
    return multer({ storage: storage });
})();