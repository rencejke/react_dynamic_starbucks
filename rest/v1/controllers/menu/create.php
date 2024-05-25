<?php
$conn = null;
$conn = checkDbConnection();
$menu = new Menu($conn);
if (array_key_exists("menuid", $_GET)) {
    checkEndpoint();
}
checkPayload($data);
$menu->menu_name = checkIndex($data, "menu_name");
$menu->menu_image = checkIndex($data, "menu_image");
$menu->menu_category_id = checkIndex($data, "menu_category_id");
$menu->menu_price = checkIndex($data, "menu_price");
$menu->menu_is_active = 1;
$menu->menu_created = date("Y-m-d H:i:s");
$menu->menu_datetime = date("Y-m-d H:i:s");

// istitleExist($menu, $menu->menu_title);

$query = checkCreate($menu);
returnSuccess($menu, "menu", $query);