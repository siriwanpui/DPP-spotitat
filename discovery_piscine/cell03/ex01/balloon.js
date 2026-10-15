// ดึง element ของลูกโป่งมาจาก HTML
const balloon = document.getElementById('balloon');

// ตัวแปรเก็บสถานะขนาดปัจจุบัน (เริ่มต้น 200px)
let currentSize = 200;

// อายุกรณีลำดับสี: 0 = แดง, 1 = เขียว, 2 = น้ำเงิน
let colorIndex = 0;
const colors = ['red', 'green', 'blue'];

// 1. ฟังก์ชันเมื่อคลิกที่ลูกโป่ง
balloon.addEventListener('click', function() {
    // ขยายขนาดขึ้น 10px
    currentSize += 10;

    // ถ้าขนาดเกิน 420px ให้รีเซ็ตกลับเป็น 200px (ระเบิด)
    if (currentSize > 420) {
        currentSize = 200;
    }

    // เลื่อนลำดับสีไปข้างหน้า (วนลูป 0 -> 1 -> 2 -> 0)
    colorIndex = (colorIndex + 1) % 3;

    // นำค่าไปอัปเดตแสดงผลบนหน้าเว็บ
    updateBalloon();
});

// 2. ฟังก์ชันเมื่อเอาเมาส์ออกจากลูกโป่ง (Mouse leave)
balloon.addEventListener('mouseleave', function() {
    // ลดขนาดลง 5px แต่ต้องไม่ต่ำกว่า 200px
    if (currentSize > 200) {
        currentSize -= 5;
        if (currentSize < 200) {
            currentSize = 200;
        }
    }

    // ถอยหลังลำดับสี (วนลูปย้อนกลับ)
    colorIndex = (colorIndex - 1 + 3) % 3;

    // นำค่าไปอัปเดตแสดงผลบนหน้าเว็บ
    updateBalloon();
});

// ฟังก์ชันกลางสำหรับอัปเดตขนาดและสีลงใน Style ของ HTML
function updateBalloon() {
    balloon.style.width = currentSize + 'px';
    balloon.style.height = currentSize + 'px';
    balloon.style.backgroundColor = colors[colorIndex];
}