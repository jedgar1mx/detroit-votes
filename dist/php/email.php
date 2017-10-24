<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$to = "info@citizendetroit.org";
$subject = "Email from informdetroit.com";
$body = "Name: " . $name . "\r\nPerson's Email: ". $email. "\r\nMessage: " . $message;
$headers = "From: informdetroit@gmail.com\r\n".
"X-Mailer: php";
if (mail($to, $subject, $body, $headers)) {
echo("success");
}
else {
echo("fail");
}
