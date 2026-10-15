// ใช้ $(document).ready เพื่อรอให้หน้าเว็บพร้อมใช้งานก่อนรันคำสั่ง jQuery
$(document).ready(function() {

    // 1. ฟังก์ชันหลักสำหรับคำนวณเมื่อคลิกปุ่ม (ใช้ $('#btn').click แทน addEventListener)
    $('#btn').click(function() {
        // ดึงค่าจากช่อง input ซ้ายและขวา โดยใช้ .val() ของ jQuery
        let leftInput = $('#left-member').val();
        let rightInput = $('#right-member').val();
        let operator = $('#operator').val();

        // ตรวจสอบว่าเป็นจำนวนเต็มบวกหรือ 0 หรือไม่ (ใช้ RegEx เช็คเลข 0 ถึง 9 เท่านั้น)[cite: 12]
        let pattern = /^[0-9]+$/;

        if (!pattern.test(leftInput) || !pattern.test(rightInput)) {
            alert('Error :(');
            return;
        }

        // แปลงค่าข้อความ (String) ให้กลายเป็นตัวเลข (Number)[cite: 12]
        let num1 = Number(leftInput);
        let num2 = Number(rightInput);
        let result;

        // ตรวจสอบเงื่อนไขการหารหรือ modulo ด้วย 0[cite: 12]
        if ((operator === '/' || operator === '%') && num2 === 0) {
            alert("It’s over 9000!");
            console.log("It’s over 9000!");
            return;
        }

        // คำนวณตามเครื่องหมายที่เลือก[cite: 12]
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
            case '%':
                result = num1 % num2;
                break;
            default:
                return;
        }

        // แสดงผลลัพธ์ผ่าน alert และ console.log[cite: 12]
        alert(result);
        console.log(result);
    });

    // 2. เงื่อนไข: ทุกๆ 30 วินาที จะมี alert เด้งขึ้นมาว่า 'Please, use me...'[cite: 12]
    setInterval(function() {
        alert('Please, use me...');
    }, 30000); // 30000 มิลลิวินาที เท่ากับ 30 วินาที[cite: 12]

});