<?php
/**
 * save.php — يحفظ data.js على السيرفر
 * يُستدعى من لوحة الإدارة عند الحفظ
 */

// ── حماية بسيطة بكلمة مرور ───────────────────────────────
// غيّر هذه القيمة قبل الرفع على الاستضافة
define('ADMIN_PASSWORD', 'diigiure2024');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: same-origin');

// رفض أي طلب غير POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'msg' => 'Method not allowed']);
    exit;
}

// قراءة الطلب
$body = file_get_contents('php://input');
$req  = json_decode($body, true);

if (!$req) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => 'Invalid JSON']);
    exit;
}

// التحقق من كلمة المرور
if (empty($req['password']) || $req['password'] !== ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'msg' => 'Unauthorized']);
    exit;
}

// التحقق من وجود البيانات
if (empty($req['data'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => 'No data']);
    exit;
}

// بناء محتوى data.js من البيانات المرسلة
$data = $req['data'];

// التحقق من صحة البنية
if (!isset($data['store']) || !isset($data['categories']) || !isset($data['products'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => 'Invalid data structure']);
    exit;
}

// تحويل البيانات إلى JSON منسّق
$json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// بناء محتوى الملف
$fileContent = "const DATA = " . $json . ";\n";

// المسار إلى data.js (نفس مجلد save.php)
$filePath = __DIR__ . '/../data.js';

// نسخة احتياطية قبل الكتابة
$backupPath = __DIR__ . '/data.backup.js';
if (file_exists($filePath)) {
    copy($filePath, $backupPath);
}

// الكتابة إلى الملف
$result = file_put_contents($filePath, $fileContent, LOCK_EX);

if ($result === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'msg' => 'Failed to write file. Check folder permissions.']);
    exit;
}

echo json_encode(['ok' => true, 'msg' => 'تم الحفظ بنجاح', 'bytes' => $result]);
