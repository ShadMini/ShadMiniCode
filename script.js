// عناصر DOM
const editor = document.getElementById('codeEditor');
const langSelect = document.getElementById('langSelect');
const fontSlider = document.getElementById('fontSlider');
const fontValue = document.getElementById('fontValue');
const statusMsg = document.getElementById('statusMsg');
const newBtn = document.getElementById('newBtn');
const openBtn = document.getElementById('openBtn');
const saveBtn = document.getElementById('saveBtn');

// ضبط حجم الخط
fontSlider.addEventListener('input', () => {
  const val = fontSlider.value;
  editor.style.fontSize = val + 'px';
  fontValue.innerText = val + 'px';
  statusMsg.innerText = `الخط: ${val}px`;
  setTimeout(() => {
    if (statusMsg.innerText.includes('الخط')) statusMsg.innerText = 'جاهز | ShadMini Code';
  }, 1000);
});

// تغيير اللغة (للتوسع مستقبلاً مع تمييز الصيغ)
langSelect.addEventListener('change', () => {
  statusMsg.innerText = `اللغة: ${langSelect.value}`;
  setTimeout(() => {
    if (statusMsg.innerText.includes('اللغة')) statusMsg.innerText = 'جاهز | ShadMini Code';
  }, 800);
});

// ملف جديد
newBtn.addEventListener('click', () => {
  if (editor.value.trim() !== '' && confirm('سيتم مسح المحرر. متأكد؟')) {
    editor.value = '';
    statusMsg.innerText = 'ملف جديد فارغ';
    setTimeout(() => statusMsg.innerText = 'جاهز | ShadMini Code', 1200);
  } else if (editor.value.trim() === '') {
    editor.value = '';
    statusMsg.innerText = 'ملف جديد';
    setTimeout(() => statusMsg.innerText = 'جاهز | ShadMini Code', 1000);
  }
});

// حفظ الملف
saveBtn.addEventListener('click', () => {
  const content = editor.value;
  if (!content.trim()) {
    statusMsg.innerText = 'لا يوجد كود للحفظ!';
    return;
  }
  const ext = langSelect.value;
  const filename = `shadmini_code.${ext}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  statusMsg.innerText = `تم الحفظ ✅ (${filename})`;
  setTimeout(() => statusMsg.innerText = 'جاهز | ShadMini Code', 2000);
});

// فتح ملف من الجهاز
openBtn.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.js,.py,.html,.css,.txt,.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      editor.value = ev.target.result;
      statusMsg.innerText = `فتح: ${file.name}`;
      // تغيير قائمة اللغة حسب الامتداد
      if (file.name.endsWith('.py')) langSelect.value = 'python';
      else if (file.name.endsWith('.html')) langSelect.value = 'html';
      else if (file.name.endsWith('.css')) langSelect.value = 'css';
      else if (file.name.endsWith('.js')) langSelect.value = 'javascript';
      else langSelect.value = 'javascript';
      setTimeout(() => statusMsg.innerText = 'جاهز | ShadMini Code', 1500);
    };
    reader.readAsText(file);
  };
  input.click();
});

// اختصار Ctrl+S للحفظ (عند استخدام لوحة مفاتيح خارجية)
editor.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveBtn.click();
  }
});

// رسالة ترحيب
console.log('ShadMini Code - محرر الهواتف النقالة');
