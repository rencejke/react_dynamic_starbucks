<?php

Class Menu {
    public $menu_aid;
    public $menu_name;
    public $menu_image;
    public $menu_category_id;
    public $menu_price;
    public $menu_is_active;
    public $menu_datetime;
    public $menu_created;

    public $menu_search;

    public $connection;
    public $lastInsertedId;
    public $tblMenu;
    public $tblCategory;
    

    public function __construct($db) {
        $this->connection = $db;
        $this->tblMenu = "menu";
        $this->tblCategory = "category";
    }

    public function create() {
        try {
            $sql = "insert into {$this->tblMenu} ";
            $sql .= "( menu_name, ";
            $sql .= "menu_category_id, ";
            $sql .= "menu_image, ";
            $sql .= "menu_is_active, ";
            $sql .= "menu_price, ";
            $sql .= "menu_created, ";
            $sql .= "menu_datetime ) values ( ";
            $sql .= ":menu_name, ";
            $sql .= ":menu_category_id, ";
            $sql .= ":menu_image, ";
            $sql .= ":menu_is_active, ";
            $sql .= ":menu_price, ";
            $sql .= ":menu_created, ";
            $sql .= ":menu_datetime ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "menu_name" => $this->menu_name,
                "menu_category_id" => $this->menu_category_id,
                "menu_image" => $this->menu_image,
                "menu_is_active" => $this->menu_is_active,
                "menu_price" => $this->menu_price,
                "menu_created" => $this->menu_created,
                "menu_datetime" => $this->menu_datetime,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }


   
    public function readAll()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblMenu} as menu, ";
            $sql .= "{$this->tblCategory} as category ";
            $sql .= "where menu.menu_category_id = category.category_aid ";
            $sql .= "order by menu.menu_is_active desc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readById()
    {
        try {
            $sql = "select * ";
            $sql .= "from {$this->tblMenu} ";
            $sql .= "where menu_aid = :menu_aid ";
            $sql .= "order by menu_aid asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "menu_aid" => $this->menu_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    

    public function delete()
    {
        try {
            $sql = "delete from {$this->tblMenu} ";
            $sql .= "where menu_aid = :menu_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "menu_aid" => $this->menu_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblMenu} set ";
            $sql .= "menu_name = :menu_name, ";
            $sql .= "menu_image = :menu_image, ";
            $sql .= "menu_category_id = :menu_category_id, ";
            $sql .= "menu_price = :menu_price, ";
            $sql .= "menu_datetime = :menu_datetime ";
            $sql .= "where menu_aid  = :menu_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "menu_name" => $this->menu_name,
                "menu_image" => $this->menu_image,
                "menu_category_id" => $this->menu_category_id,
                "menu_price" => $this->menu_price,
                "menu_datetime" => $this->menu_datetime,
                "menu_aid" => $this->menu_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblMenu} set ";
            $sql .= "menu_is_active = :menu_is_active, ";
            $sql .= "menu_datetime = :menu_datetime ";
            $sql .= "where menu_aid  = :menu_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "menu_is_active" => $this->menu_is_active,
                "menu_datetime" => $this->menu_datetime,
                "menu_aid" => $this->menu_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    //new
    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblMenu} ";
            $sql .= "where menu_name like :menu_name ";
            $sql .= "order by menu_is_active desc, ";
            $sql .= "menu_name asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "menu_name" => "%{$this->menu_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}