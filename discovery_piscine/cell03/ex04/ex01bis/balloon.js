
// ใช้ $(document).ready เพื่อรอให้โครงสร้าง HTML โหลดเสร็จก่อน
$(document).ready(function() {

    // 1. ดึง element ของลูกโป่งด้วย jQuery selector $('#balloon')[cite: 9]
    const $balloon = $('#balloon');

    // ตัวแปรเก็บสถานะขนาดปัจจุบัน (เริ่มต้น 200px)[cite: 9]
    let currentSize = 200;

    // ลำดับสี: 0 = แดง, 1 = เขียว, 2 = น้ำเงิน[cite: 9]
    let colorIndex = 0;
    const colors = ['red', 'green', 'blue'];

    // 2. ฟังก์ชันเมื่อคลิกที่ลูกโป่ง (เปลี่ยนจาก addEventListener เป็น .click())[cite: 9]
    $balloon.click(function() {
        currentSize += 10;

        // ถ้าขนาดเกิน 420px ให้รีเซ็ตกลับเป็น 200px (ระเบิด)[cite: 9]
        if (currentSize > 420) {
            currentSize = 200;
        }

        // เลื่อนลำดับสีไปข้างหน้า (วนลูป 0 -> 1 -> 2 -> 0)[cite: 9]
        colorIndex = (colorIndex + 1) % 3;

        // นำค่าไปอัปเดตแสดงผลบนหน้าเว็บ
        updateBalloon();
    });

    // 3. ฟังก์ชันเมื่อเอาเมาส์ออกจากลูกโป่ง (เปลี่ยนเป็น .mouseleave())[cite: 9]
    $balloon.mouseleave(function() {
        if (currentSize > 200) {
            currentSize -= 5;
            if (currentSize < 200) {
                currentSize = 200;
            }
        }

        // ถอยหลังลำดับสี (วนลูปย้อนกลับ)[cite: 9]
        colorIndex = (colorIndex - 1 + 3) % 3;

        // นำค่าไปอัปเดตแสดงผลบนหน้าเว็บ
        updateBalloon();
    });

    // ฟังก์ชันกลางสำหรับอัปเดตขนาดและสี โดยใช้ .css() ของ jQuery แบบหลายคุณสมบัติพร้อมกัน
    function updateBalloon() {
        $balloon.css({
            'width': currentSize + 'px',
            'height': currentSize + 'px',
            'background-color': colors[colorIndex]
        });
    }

});