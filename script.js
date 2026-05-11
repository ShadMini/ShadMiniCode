// عناصر التحكم
const langSelect = document.getElementById('langSelect');
const fontSlider = document.getElementById('fontSlider');
const fontValue = document.getElementById('fontValue');
const statusMsg = document.getElementById('statusMsg');
const newBtn = document.getElementById('newBtn');
const openBtn = document.getElementById('openBtn');
const saveBtn = document.getElementById('saveBtn');

// تهيئة محرر CodeMirror
const textarea = document.getElementById('codeEditor');
let editor = CodeMirror.fromTextArea(textarea, {
  lineNumbers: true,          // أرقام الأسطر
  theme: "material-darker",   // ثيم غامق يشبه VS Code
  mode: "javascript",         // اللغة الافتراضية
  autoCloseBrackets: true,    // إغلاق الأقواس تلقائياً
  matchBrackets: true,        // تمييز الأقواس المتطابقة
  foldGutter: true,           // طي الأكواد
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  extraKeys: {
    "Ctrl-S": function(cm) { saveFile(); },  // حفظ بـ Ctrl+S
    "Cmd-S": function(cm) { saveFile(); }
  }
});

// ضبط حجم الخط في CodeMirror (يؤثر على الكل)
function setEditorFontSize(size) {
  const cmElements = document.querySelectorAll('.CodeMirror');
  cmElements.forEach(el => {
    el.style.fontSize = size + 'px';
  });
}
// ربط شريط التحكم بالخط
fontSlider.addEventListener('input', () => {
  const val = fontSlider.value;
  setEditorFontSize(val);
  fontValue.innerText = val + 'px';
  statusMsg.innerText = `الخط: ${val}px`;
  setTimeout(() => {
    if (statusMsg.innerText.includes('الخط')) statusMsg.innerText = 'جاهز | ShadMini Code';
  }, 1000);
});

// تغيير وضع اللغة في المحرر وفقاً للقائمة المنسدلة
function changeLanguage(mode) {
  let modeValue = 'javascript';
  switch(mode) {
    case 'javascript': modeValue = 'javascript'; break;
    case 'python': modeValue = 'python'; break;
    case 'html': modeValue = 'htmlmixed'; break;
    case 'css': modeValue = 'css'; break;
    default: modeValue = 'javascript';
  }
  editor.setOption('mode', modeValue);
  statusMsg.innerText = `اللغة: ${mode}`;
  setTimeout(() => {
    if (statusMsg.innerText.includes('اللغة')) statusMsg.innerText = 'جاهز | ShadMini Code';
  }, 800);
}

langSelect.addEventListener('change', (e) => {
  changeLanguage(e.target.value);
});

// حفظ الملف
function saveFile() {
  const content = editor.getValue();
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
}
saveBtn.addEventListener('click', saveFile);

// ملف جديد
newBtn.addEventListener('click', () => {
  if (editor.getValue().trim() !== '' && confirm('سيتم مسح المحرر. متأكد؟')) {
    editor.setValue('');
    statusMsg.innerText = 'ملف جديد فارغ';
    setTimeout(() => statusMsg.innerText = 'جاهز | ShadMini Code', 1200);
  } else if (editor.getValue().trim() === '') {
    editor.setValue('');
    statusMsg.innerText = 'ملف جديد';
    setTimeout(() => statusMsg.innerText = 'جاهز | ShadMini Code', 1000);
  }
});

// فتح ملف
openBtn.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.js,.py,.html,.css,.txt,.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      editor.setValue(ev.target.result);
      statusMsg.innerText = `فتح: ${file.name}`;
      // تحديد اللغة حسب الامتداد
      if (file.name.endsWith('.py')) {
        langSelect.value = 'python';
        changeLanguage('python');
      } else if (file.name.endsWith('.html')) {
        langSelect.value = 'html';
        changeLanguage('html');
      } else if (file.name.endsWith('.css')) {
        langSelect.value = 'css';
        changeLanguage('css');
      } else if (file.name.endsWith('.js')) {
        langSelect.value = 'javascript';
        changeLanguage('javascript');
      } else {
        langSelect.value = 'javascript';
        changeLanguage('javascript');
      }
      setTimeout(() => statusMsg.innerText = 'جاهز | ShadMini Code', 1500);
    };
    reader.readAsText(file);
  };
  input.click();
});

// ضبط حجم الخط الابتدائي
setEditorFontSize(fontSlider.value);

console.log('ShadMini Code مع تمييز صيغ كامل (مثل VS Code)');
