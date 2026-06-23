<?php
define('ADMIN_PASSWORD', 'diigiure2024');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok'=>false,'msg'=>'Method not allowed']); exit; }

$body = file_get_contents('php://input');
$req  = json_decode($body, true);
if (!$req) { http_response_code(400); echo json_encode(['ok'=>false,'msg'=>'Invalid JSON']); exit; }
if (empty($req['password']) || $req['password'] !== ADMIN_PASSWORD) { http_response_code(401); echo json_encode(['ok'=>false,'msg'=>'Unauthorized']); exit; }
if (empty($req['data'])) { http_response_code(400); echo json_encode(['ok'=>false,'msg'=>'No data']); exit; }

$data = $req['data'];
if (!isset($data['store'], $data['categories'], $data['products'])) { http_response_code(400); echo json_encode(['ok'=>false,'msg'=>'Invalid structure']); exit; }

$json        = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
$fileContent = "const DATA = " . $json . ";\n";
$filePath    = __DIR__ . '/../data.js';

if (file_exists($filePath)) copy($filePath, __DIR__ . '/data.backup.js');

$result = file_put_contents($filePath, $fileContent, LOCK_EX);
if ($result === false) { http_response_code(500); echo json_encode(['ok'=>false,'msg'=>'Cannot write file — check folder permissions']); exit; }

echo json_encode(['ok'=>true,'msg'=>'تم الحفظ بنجاح','bytes'=>$result]);
