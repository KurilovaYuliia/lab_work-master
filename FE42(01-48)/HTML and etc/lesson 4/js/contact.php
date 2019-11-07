<?php
        $name = $_POST["name"];
        $phone = $_POST["phone"];
	$email = $_POST["email"];
        $company = $_POST["company"];
	$textarea = $_POST["textarea"];
		
	$from = 'kurilova.yuliya8@gmail.com';
        $to = 'kurilova.yuliya8@gmail.com';
        $sub = "Форма обратной связи Контакты";
        $message = "Имя: $name\nТелефон: $phone\nEmail: $email\nКомпания: $company\nСообщение: $textarea";
        mail ($to,$sub,$message,"Content-type:text/plain; charset = UTF-8\r\nFrom:$from");			            
?>