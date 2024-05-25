<?php
$conn = null;
$conn = checkDbConnection();
$menu = new Menu($conn);
$error = [];
$returnData = [];
if (array_key_exists("menuid", $_GET)) {
    checkPayload($data);
    $menu->menu_aid = $_GET['menuid'];
    $menu->menu_name = checkIndex($data, "menu_name");
    $menu->menu_image = checkIndex($data, "menu_image");
    $menu->menu_category_id = checkIndex($data, "menu_category_id");
    $menu->menu_price = checkIndex($data, "menu_price");
    $menu->menu_datetime = date("Y-m-d H:i:s");
    
    checkId($menu->menu_aid);
    // $menu_name_old = checkIndex($data, "menu_name_old");
    // compareName($menu, $menu_name_old, $menu->menu_name);
    $query = checkUpdate($menu);
    returnSuccess($menu, "menu", $query);
}

checkEndpoint();