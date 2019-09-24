<?php
$recepient = "andrei.sorokin@hiqo-solutions.com";
$sitename = "Мой тест";
$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$text = trim($_POST["text"]);
$message = "Имя: $name \nТелефон: $phone \nТекст: $text";
$pagetitle = "Новая заявка с сайта \"$sitename\"";
print phpinfo();

if(mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient")) {
  echo 'Email on the way';
}
