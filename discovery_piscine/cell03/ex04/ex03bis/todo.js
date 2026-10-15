// ดึง element หลักจากหน้า HTML
const newBtn = document.getElementById('new-btn');
const ftList = document.getElementById('ft_list');

// โหลดข้อมูลจาก Cookie มาแสดงผลทันทีเมื่อเปิดหน้าเว็บ
window.onload = function() {
    loadTodosFromCookie();
};

// 1. เหตุการณ์เมื่อคลิกปุ่ม 'New'
newBtn.addEventListener('click', function() {
    // เปิดหน้าต่างกรอกข้อความ (prompt)
    let todoText = prompt("กรอกรายการสิ่งที่ต้องทำ (TO DO):");

    // ตรวจสอบว่าผู้ใช้กรอกข้อความมาหรือไม่ และไม่ใช่ค่าว่างเปล่า
    if (todoText !== null && todoText.trim() !== "") {
        addTodoItem(todoText, true); // สร้างและบันทึกลง Cookie
    }
});

// ฟังก์ชันสร้างและเพิ่ม To-Do เข้าไปในหน้าเว็บ
function addTodoItem(text, saveToCookieFlag) {
    // สร้าง div element สำหรับรายการใหม่
    let todoDiv = document.createElement('div');
    todoDiv.className = 'todo-item';
    todoDiv.textContent = text;

    // 2. เงื่อนไขการคลิกเพื่อลบ (โจทย์บังคับ: คลิกที่ To-Do เพื่อลบ พร้อมหน้าต่างยืนยัน)
    todoDiv.addEventListener('click', function() {
        let isConfirmed = confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?");
        if (isConfirmed) {
            // ลบออกจาก DOM ถาวร
            ftList.removeChild(todoDiv);
            // อัปเดตข้อมูลใน Cookie ใหม่
            saveAllTodosToCookie();
        }
    });

    // นำรายการใหม่ไปวางไว้ 'ด้านบนสุด' ของกล่อง ft_list ตามที่โจทย์กำหนด
    if (ftList.firstChild) {
        ftList.insertBefore(todoDiv, ftList.firstChild);
    } else {
        ftList.appendChild(todoDiv);
    }

    // หากเป็นการสร้างใหม่ ให้สั่งบันทึกข้อมูลลง Cookie ทันที
    if (saveToCookieFlag) {
        saveAllTodosToCookie();
    }
}

// 3. ฟังก์ชันบันทึกรายการทั้งหมดลงใน Cookie
function saveAllTodosToCookie() {
    let items = ftList.getElementsByClassName('todo-item');
    let todoValues = [];

    // วนลูปเก็บข้อความจากทุกๆ รายการ
    for (let i = 0; i < items.length; i++) {
        todoValues.push(items[i].textContent);
    }

    // แปลงอาเรย์เป็นข้อความ JSON แล้วเก็บใส่ Cookie (ตั้งอายุไว้ 7 วัน)
    let encodedData = encodeURIComponent(JSON.stringify(todoValues));
    let expiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `todos=${encodedData}; expires=${expiresDate}; path=/`;
}

// 4. ฟังก์ชันโหลดข้อมูลจาก Cookie ขึ้นมาแสดงผลตอนเปิดเว็บ
function loadTodosFromCookie() {
    let cookies = document.cookie.split(';');
    let todoCookie = "";

    // ค้นหาคุกกี้ที่ชื่อ 'todos'
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("todos=")) {
            todoCookie = decodeURIComponent(cookie.substring(6));
            break;
        }
    }

    if (todoCookie) {
        try {
            let todoValues = JSON.parse(todoCookie);
            // วนลูปสร้างรายการกลับคืนมา (เรียงจากล่างขึ้นบน เพื่อให้ลำดับถูกต้องเมื่อใช้ insertBefore)
            for (let i = todoValues.length - 1; i >= 0; i--) {
                addTodoItem(todoValues[i], false);
            }
        } catch (e) {
            console.error("ไม่สามารถโหลดข้อมูล Cookie ได้");
        }
    }
}