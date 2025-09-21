<?php
session_start();

// Set JSON response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? $_POST['action'] ?? $_GET['action'] ?? '';

// Initialize wishlist from session or cookie
if (!isset($_SESSION['wishlist'])) {
    $_SESSION['wishlist'] = isset($_COOKIE['wishlist']) ? 
        json_decode($_COOKIE['wishlist'], true) : [];
}

$wishlist = &$_SESSION['wishlist'];

try {
    switch ($action) {
        case 'add':
            $productId = $input['product_id'] ?? $_POST['product_id'] ?? '';
            
            if (empty($productId)) {
                throw new Exception('Product ID is required');
            }

            // Add to wishlist if not already present
            if (!in_array($productId, $wishlist)) {
                $wishlist[] = $productId;
                
                // Update cookie for persistence
                setcookie('wishlist', json_encode($wishlist), time() + (86400 * 30), '/'); // 30 days
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Product added to wishlist',
                    'action' => 'added',
                    'count' => count($wishlist)
                ]);
            } else {
                echo json_encode([
                    'success' => true,
                    'message' => 'Product already in wishlist',
                    'action' => 'exists',
                    'count' => count($wishlist)
                ]);
            }
            break;

        case 'remove':
            $productIds = $input['product_ids'] ?? $_POST['product_ids'] ?? [];
            
            if (!is_array($productIds)) {
                $productIds = [$productIds];
            }

            if (empty($productIds)) {
                throw new Exception('Product IDs are required');
            }

            // Remove products from wishlist
            $originalCount = count($wishlist);
            $wishlist = array_values(array_diff($wishlist, $productIds));
            $removedCount = $originalCount - count($wishlist);
            
            // Update cookie
            setcookie('wishlist', json_encode($wishlist), time() + (86400 * 30), '/');
            
            echo json_encode([
                'success' => true,
                'message' => $removedCount . ' item(s) removed from wishlist',
                'action' => 'removed',
                'count' => count($wishlist),
                'removed_count' => $removedCount
            ]);
            break;

        case 'toggle':
            $productId = $input['product_id'] ?? $_POST['product_id'] ?? '';
            
            if (empty($productId)) {
                throw new Exception('Product ID is required');
            }

            if (in_array($productId, $wishlist)) {
                // Remove from wishlist
                $wishlist = array_values(array_diff($wishlist, [$productId]));
                $action_performed = 'removed';
                $message = 'Product removed from wishlist';
            } else {
                // Add to wishlist
                $wishlist[] = $productId;
                $action_performed = 'added';
                $message = 'Product added to wishlist';
            }
            
            // Update cookie
            setcookie('wishlist', json_encode($wishlist), time() + (86400 * 30), '/');
            
            echo json_encode([
                'success' => true,
                'message' => $message,
                'action' => $action_performed,
                'count' => count($wishlist),
                'in_wishlist' => $action_performed === 'added'
            ]);
            break;

        case 'clear':
            $wishlist = [];
            
            // Clear cookie
            setcookie('wishlist', '', time() - 3600, '/');
            
            echo json_encode([
                'success' => true,
                'message' => 'Wishlist cleared',
                'action' => 'cleared',
                'count' => 0
            ]);
            break;

        case 'get':
            echo json_encode([
                'success' => true,
                'wishlist' => $wishlist,
                'count' => count($wishlist)
            ]);
            break;

        case 'check':
            $productId = $input['product_id'] ?? $_POST['product_id'] ?? $_GET['product_id'] ?? '';
            
            if (empty($productId)) {
                throw new Exception('Product ID is required');
            }

            echo json_encode([
                'success' => true,
                'in_wishlist' => in_array($productId, $wishlist),
                'count' => count($wishlist)
            ]);
            break;

        case 'count':
            echo json_encode([
                'success' => true,
                'count' => count($wishlist)
            ]);
            break;

        default:
            throw new Exception('Invalid action');
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>