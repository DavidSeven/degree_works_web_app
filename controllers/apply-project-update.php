<?php
  require_once ('project-crud.php');

  $identifier = $_POST ['identifier'];
  $name = $_POST ['name'];
  $addedDate = $_POST ['addedDate'];
  $calification = $_POST ['calification'];
  $investigationLine = $_POST ['investigationLine'];
  $adviserIdentifier = $_POST ['advisers'];
  $authors = null;
  $i = 0;

  if ($calification == null)
  {
    $calification = 0;
  }

  updateProject ($identifier, $name, $calification, $addedDate, $adviserIdentifier, $investigationLine);
  deleteIncludesRelation ($identifier);

  foreach ($_POST ['authors'] as $selectedItem)
  {
    $i ++;
    $authors [$i] = $selectedItem;
    createIncludesRelation ($authors [$i], $identifier);
  }
?>
