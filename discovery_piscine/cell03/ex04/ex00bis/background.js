// 1. ฟังก์ชันสำหรับสุ่มค่าสีในรูปแบบ Hexadecimal[cite: 6]
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    // วนลูป 6 ครั้ง เพื่อสุ่มตัวอักษรหรือตัวเลข 6 หลัก[cite: 6]
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ใช้ $(document).ready เพื่อรอให้โครงสร้าง HTML โหลดเสร็จก่อนรันคำสั่ง jQuery
$(document).ready(function() {
    
    // 2. ใช้ $('#btn') เลือกปุ่ม และใช้ .click() เพื่อดักฟังเหตุการณ์การคลิกแทน addEventListener
    $('#btn').click(function() {
        // สุ่มสีใหม่[cite: 6]
        const newColor = getRandomColor();

        // 3. เปลี่ยนสีพื้นหลังของ <body> โดยใช้คำสั่ง .css() ของ jQuery
        $('body').css('background-color', newColor);
    });

});