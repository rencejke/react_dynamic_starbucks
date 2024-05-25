<?php
$conn = null;
$conn = checkDbConnection();
$menu = new Menu($conn);
$error = [];
$returnData = [];


if (array_key_exists("menuid", $_GET)) {
    $menu->menu_aid = $_GET['menuid'];

    checkId($menu->menu_aid);

    $query = checkReadById($menu);
    http_response_code(200);
    getQueriedData($query);
}


if (empty($_GET)) {
    $query = checkReadAll($menu);
    http_response_code(200);
    getQueriedData($query);
}

checkEndpoint();