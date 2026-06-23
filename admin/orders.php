<?php
/**
 * orders.php — إدارة الطلبات
 * GET  → إرجاع جميع الطلبات
 * POST → حفظ طلب جديد أو تحديث حالة طلب
 */

define('ADMIN_PASSWORD', 'diigiure2024');
define('ORDERS_FILE', __DIR__ . '/orders.json');

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

// ── Read orders file ───────────────────────────────────────────
function readOrders() {
    if (!file_exists(ORDERS_FILE)) return [];
    $json = file_get_contents(ORDERS_FILE);
    return json_decode($json, true) ?: [];
}

// ── Write orders file ──────────────────────────────────────────
function writeOrders($orders) {
    return file_put_contents(ORDERS_FILE, json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

// ── GET: return all orders ──────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $orders = readOrders();
    // Sort by creation time descending
    usort($orders, fn($a, $b) => ($b['createdAt'] ?? 0) - ($a['createdAt'] ?? 0));
    echo json_encode(['ok' => true, 'orders' => $orders]);
    exit;
}

// ── POST ────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $req  = json_decode($body, true);

    if (!$req || empty($req['action'])) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'msg' => 'Invalid request']);
        exit;
    }

    $orders = readOrders();

    // ── Place new order (no auth needed — customer action) ──────
    if ($req['action'] === 'place') {
        if (empty($req['items']) || !is_array($req['items'])) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'msg' => 'No items']);
            exit;
        }

        // Generate order number
        $maxNum = 1000;
        foreach ($orders as $o) {
            if (isset($o['number']) && $o['number'] > $maxNum) $maxNum = $o['number'];
        }
        $orderNum = $maxNum + 1;

        $order = [
            'id'        => uniqid('ord_', true),
            'number'    => $orderNum,
            'items'     => $req['items'],
            'total'     => $req['total'] ?? 0,
            'notes'     => $req['notes'] ?? '',
            'table'     => $req['table'] ?? '',
            'status'    => 'new',   // new | preparing | ready | delivered
            'createdAt' => time(),
            'updatedAt' => time(),
        ];

        $orders[] = $order;
        writeOrders($orders);

        echo json_encode(['ok' => true, 'order' => $order]);
        exit;
    }

    // ── Update order status (admin only) ────────────────────────
    if ($req['action'] === 'update_status') {
        if (empty($req['password']) || $req['password'] !== ADMIN_PASSWORD) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'msg' => 'Unauthorized']);
            exit;
        }
        $validStatuses = ['new', 'preparing', 'ready', 'delivered'];
        if (empty($req['id']) || empty($req['status']) || !in_array($req['status'], $validStatuses)) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'msg' => 'Invalid status or id']);
            exit;
        }
        $found = false;
        foreach ($orders as &$o) {
            if ($o['id'] === $req['id']) {
                $o['status']    = $req['status'];
                $o['updatedAt'] = time();
                $found = true;
                break;
            }
        }
        if (!$found) { http_response_code(404); echo json_encode(['ok'=>false,'msg'=>'Order not found']); exit; }
        writeOrders($orders);
        echo json_encode(['ok' => true]);
        exit;
    }

    // ── Delete order (admin only) ────────────────────────────────
    if ($req['action'] === 'delete') {
        if (empty($req['password']) || $req['password'] !== ADMIN_PASSWORD) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'msg' => 'Unauthorized']);
            exit;
        }
        $orders = array_values(array_filter($orders, fn($o) => $o['id'] !== $req['id']));
        writeOrders($orders);
        echo json_encode(['ok' => true]);
        exit;
    }

    // ── Track order by number (customer) ────────────────────────
    if ($req['action'] === 'track') {
        $num = intval($req['number'] ?? 0);
        foreach ($orders as $o) {
            if ($o['number'] === $num) {
                echo json_encode(['ok' => true, 'order' => $o]);
                exit;
            }
        }
        echo json_encode(['ok' => false, 'msg' => 'Order not found']);
        exit;
    }

    http_response_code(400);
    echo json_encode(['ok' => false, 'msg' => 'Unknown action']);
}
