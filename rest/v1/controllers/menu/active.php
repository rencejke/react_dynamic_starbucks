<?php
require '../../core/header.php';
require '../../core/functions.php';
require '../../models/Menu.php';

$conn = null;
$conn = checkDbConnection();

$menu = new Menu($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);


if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    if (array_key_exists("menuid", $_GET)) {

        checkPayload($data);
        $menu->menu_aid = $_GET['menuid'];
        $menu->menu_is_active = trim($data["isActive"]);
        $menu->menu_datetime = date("Y-m-d H:i:s");
        checkId($menu->menu_aid);
        $query = checkActive($menu);
        http_response_code(200);
        returnSuccess($menu, "menu", $query);
    }
    checkEndpoint();
}

http_response_code(200);
// header('HTTP/1.0 401 Unauthorized');
checkAccess();