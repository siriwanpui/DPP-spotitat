// ใช้ $(document).ready เพื่อรอให้หน้าเว็บพร้อมใช้งานก่อนรันคำสั่ง jQuery
$(document).ready(function() {
    
    // ดึง element หลักจากหน้า HTML โดยใช้ jQuery selector
    const $newBtn =$('#new-btn');
    const $ftList =$('#ft_list');

    // โหลดข้อมูลจาก Cookie มาแสดงผลทันทีเมื่อเปิดหน้าเว็บ
    loadTodosFromCookie();

    // 1. เหตุการณ์เมื่อคลิกปุ่ม 'New' (ใช้ .click แทน addEventListener)
    $newBtn.click(function() {
        // เปิดหน้าต่างกรอกข้อความ (prompt)
        let todoText = prompt("กรอกรายการสิ่งที่ต้องทำ (TO DO):");

        // ตรวจสอบว่าผู้ใช้กรอกข้อความมาหรือไม่ และไม่ใช่ค่าว่างเปล่า[cite: 14]
        if (todoText !== null && todoText.trim() !== "") {
            addTodoItem(todoText, true); // สร้างและบันทึกลง Cookie[cite: 14]
        }
    });

    // ฟังก์ชันสร้างและเพิ่ม To-Do เข้าไปในหน้าเว็บ
    function addTodoItem(text, saveToCookieFlag) {
        // สร้าง div element ด้วย jQuery และใส่คลาสพร้อมข้อความ[cite: 14]
        let $todoDiv =$('<div></div>').addClass('todo-item').text(text);

        // 2. เงื่อนไขการคลิกเพื่อลบ (ใช้ .click และ .remove ของ jQuery)[cite: 14]
        $todoDiv.click(function() {
            let isConfirmed = confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?");
            if (isConfirmed) {
                // ลบออกจาก DOM ถาวร[cite: 14]
                $todoDiv.remove();
                // อัปเดตข้อมูลใน Cookie ใหม่[cite: 14]
                saveAllTodosToCookie();
            }
        });

        // นำรายการใหม่ไปวางไว้ 'ด้านบนสุด' ของกล่อง ft_list โดยใช้ .prepend()[cite: 14]
        $ftList.prepend($todoDiv);

        // หากเป็นการสร้างใหม่ ให้สั่งบันทึกข้อมูลลง Cookie ทันที[cite: 14]
        if (saveToCookieFlag) {
            saveAllTodosToCookie();
        }
    }

    // 3. ฟังก์ชันบันทึกรายการทั้งหมดลงใน Cookie
    function saveAllTodosToCookie() {
        let todoValues = [];

        // วนลูปเก็บข้อความจากทุกๆ รายการ โดยใช้ .each() ของ jQuery
        $('.todo-item').each(function() {
            todoValues.push($(this).text());
        });

        // แปลงอาเรย์เป็นข้อความ JSON แล้วเก็บใส่ Cookie (ตั้งอายุไว้ 7 วัน)[cite: 14]
        let encodedData = encodeURIComponent(JSON.stringify(todoValues));
        let expiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `todos=${encodedData}; expires=${expiresDate}; path=/`;
    }

    // 4. ฟังก์ชันโหลดข้อมูลจาก Cookie ขึ้นมาแสดงผลตอนเปิดเว็บ
    function loadTodosFromCookie() {
        let cookies = document.cookie.split(';');
        let todoCookie = "";

        // ค้นหาคุกกี้ที่ชื่อ 'todos'[cite: 14]
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
                // วนลูปสร้างรายการกลับคืนมา (เรียงจากล่างขึ้นบน เพื่อให้ลำดับถูกต้องเมื่อใช้ prepend)[cite: 14]
                for (let i = todoValues.length - 1; i >= 0; i--) {
                    addTodoItem(todoValues[i], false);
                }
            } catch (e) {
                console.error("ไม่สามารถโหลดข้อมูล Cookie ได้[cite: 14]");
            }
        }
    }

});