<?php
$conn = null;
$conn = checkDbConnection();
$menu = new Menu($conn);

$error = [];
$returnData = [];
if (array_key_exists("menuid", $_GET)) {
    $menu->menu_aid = $_GET['menuid'];
    checkId($menu->menu_aid);

    $query = checkDelete($menu);
    returnSuccess($menu, "menu", $query);
}

checkEndpoint();