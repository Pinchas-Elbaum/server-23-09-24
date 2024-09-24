import fs from 'fs';

const filePath = "C:\\Users\\1\\Desktop\\Kodkode\\fullStack\\Node\\23_09_24\\1\\users.json";

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // מחזיר true אם המייל תקין
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password); // מחזיר true אם הסיסמה תקינה
};

export const readUsersFromFile = () => {
    const data = fs.readFileSync(filePath, 'utf-8'); // קריאת קובץ
    return JSON.parse(data).users; // המרה מ-JSON למערך
};
// פונקציה לכתיבת נתוני המשתמשים חזרה לקובץ JSON
export const writeUsersToFile = (users) => {
    const data = JSON.stringify({ users }, null, 2); // המרה ממערך ל-JSON
    fs.writeFileSync(filePath, data, 'utf-8'); // כתיבה חזרה לקובץ
};
