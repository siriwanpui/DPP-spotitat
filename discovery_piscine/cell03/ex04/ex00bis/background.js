// 1. ฟังก์ชันสำหรับสุ่มค่าสีในรูปแบบ Hexadecimal (เช่น #FF5733)
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    // วนลูป 6 ครั้ง เพื่อสุ่มตัวอักษรหรือตัวเลข 6 หลัก
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 2. ดึง element ของปุ่มมาจาก HTML โดยอ้างอิงจาก id="btn"
const button = document.getElementById('btn');

// 3. เพิ่ม Event Listener เพื่อรอฟังเหตุการณ์การคลิกที่ปุ่ม
button.addEventListener('click', function() {
    // สุ่มสีใหม่
    const newColor = getRandomColor();

    // เปลี่ยนสีพื้นหลังของ <body> ตามสีที่สุ่มได้
    document.body.style.backgroundColor = newColor;
});